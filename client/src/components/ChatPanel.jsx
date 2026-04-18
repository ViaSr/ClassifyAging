import { useState, useRef, useEffect } from 'react'
import { MessageCircle, X, Send, Loader2 } from 'lucide-react'
import { chatApi } from '../services/api'

const styles = {
  fab: {
    position: 'fixed',
    bottom: 24,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: '50%',
    background: 'var(--color-accent)',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 4px 24px rgba(232, 93, 58, 0.3)',
    transition: 'transform 0.2s, box-shadow 0.2s',
    zIndex: 1000,
  },
  panel: {
    position: 'fixed',
    bottom: 24,
    right: 24,
    width: 400,
    maxWidth: 'calc(100vw - 48px)',
    height: 520,
    maxHeight: 'calc(100vh - 120px)',
    background: 'var(--color-bg-elevated)',
    border: '1px solid var(--color-border)',
    borderRadius: 'var(--radius-xl)',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    zIndex: 1000,
    boxShadow: '0 8px 48px rgba(0,0,0,0.4)',
  },
  header: {
    padding: '16px 20px',
    borderBottom: '1px solid var(--color-border)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: {
    fontWeight: 600,
    fontSize: 14,
    color: 'var(--color-text)',
  },
  headerSub: {
    fontSize: 12,
    color: 'var(--color-text-tertiary)',
  },
  closeBtn: {
    background: 'none',
    border: 'none',
    color: 'var(--color-text-tertiary)',
    cursor: 'pointer',
    padding: 4,
    borderRadius: 4,
  },
  messages: {
    flex: 1,
    overflowY: 'auto',
    padding: '16px 20px',
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
  },
  message: (isUser) => ({
    maxWidth: '85%',
    alignSelf: isUser ? 'flex-end' : 'flex-start',
    background: isUser ? 'var(--color-accent)' : 'var(--color-surface)',
    color: isUser ? 'white' : 'var(--color-text)',
    padding: '10px 14px',
    borderRadius: isUser ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
    fontSize: 14,
    lineHeight: 1.6,
    whiteSpace: 'pre-wrap',
  }),
  inputArea: {
    padding: '12px 16px',
    borderTop: '1px solid var(--color-border)',
    display: 'flex',
    gap: 8,
  },
  input: {
    flex: 1,
    background: 'var(--color-surface)',
    border: '1px solid var(--color-border)',
    borderRadius: 'var(--radius-md)',
    padding: '10px 14px',
    color: 'var(--color-text)',
    fontFamily: 'var(--font-body)',
    fontSize: 14,
    outline: 'none',
    resize: 'none',
  },
  sendBtn: {
    width: 40,
    height: 40,
    borderRadius: 'var(--radius-md)',
    background: 'var(--color-accent)',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    transition: 'opacity 0.2s',
  },
  welcome: {
    textAlign: 'center',
    padding: '40px 20px',
    color: 'var(--color-text-secondary)',
  },
  welcomeTitle: {
    fontFamily: 'var(--font-display)',
    fontSize: 18,
    color: 'var(--color-text)',
    marginBottom: 8,
  },
  suggestions: {
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
    marginTop: 20,
  },
  suggestion: {
    padding: '10px 14px',
    background: 'var(--color-surface)',
    border: '1px solid var(--color-border)',
    borderRadius: 'var(--radius-md)',
    fontSize: 13,
    color: 'var(--color-text-secondary)',
    cursor: 'pointer',
    textAlign: 'left',
    transition: 'border-color 0.2s',
    fontFamily: 'var(--font-body)',
  },
}

const SUGGESTIONS = [
  "Why should aging be classified as a disease?",
  "What are senolytics and how do they work?",
  "What is the TAME trial?",
  "What can I do right now to slow my own aging?",
]

export default function ChatPanel() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [enabled, setEnabled] = useState(null) // null = unknown, true/false once resolved
  const messagesEnd = useRef(null)

  useEffect(() => {
    let cancelled = false
    chatApi.status()
      .then(res => { if (!cancelled) setEnabled(Boolean(res?.enabled)) })
      .catch(() => { if (!cancelled) setEnabled(false) })
    return () => { cancelled = true }
  }, [])

  useEffect(() => {
    messagesEnd.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const sendMessage = async (text) => {
    const userMsg = text || input.trim()
    if (!userMsg || loading) return

    const history = messages.map(m => ({
      role: m.role,
      content: m.content,
    }))

    setMessages(prev => [...prev, { role: 'user', content: userMsg }])
    setInput('')
    setLoading(true)

    try {
      const response = await chatApi.send(userMsg, history)
      setMessages(prev => [...prev, { role: 'assistant', content: response.reply }])
    } catch {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: "I'm having trouble connecting right now. Make sure the API is running and your Anthropic API key is configured."
      }])
    } finally {
      setLoading(false)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  if (enabled === null) return null // resolving status — don't flash the FAB

  if (!open) {
    return (
      <button
        style={styles.fab}
        onClick={() => setOpen(true)}
        onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.08)' }}
        onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)' }}
        title={enabled ? 'Ask the AI Research Assistant' : 'AI Research Assistant (offline)'}
      >
        <MessageCircle size={24} />
      </button>
    )
  }

  if (!enabled) {
    return (
      <div style={styles.panel}>
        <div style={styles.header}>
          <div>
            <div style={styles.headerTitle}>Research Assistant</div>
            <div style={styles.headerSub}>Offline for this demo</div>
          </div>
          <button style={styles.closeBtn} onClick={() => setOpen(false)}>
            <X size={18} />
          </button>
        </div>
        <div style={{ ...styles.messages, justifyContent: 'center', textAlign: 'center' }}>
          <div style={styles.welcomeTitle}>AI Assistant is offline</div>
          <p style={{ fontSize: 13, color: 'var(--color-text-secondary)' }}>
            The live AI assistant is disabled on this public demo to control API costs.
          </p>
          <p style={{ fontSize: 13, color: 'var(--color-text-secondary)', marginTop: 12 }}>
            This project is open source — clone the repo and run it locally with your
            own Anthropic API key to try the full experience.
          </p>
          <a
            href="https://github.com/ViaSr/ClassifyingAging"
            target="_blank"
            rel="noreferrer"
            style={{ ...styles.suggestion, marginTop: 20, display: 'inline-block', textDecoration: 'none' }}
          >
            View on GitHub →
          </a>
        </div>
      </div>
    )
  }

  return (
    <div style={styles.panel}>
      <div style={styles.header}>
        <div>
          <div style={styles.headerTitle}>Research Assistant</div>
          <div style={styles.headerSub}>Ask anything about aging science</div>
        </div>
        <button style={styles.closeBtn} onClick={() => setOpen(false)}>
          <X size={18} />
        </button>
      </div>

      <div style={styles.messages}>
        {messages.length === 0 && (
          <div style={styles.welcome}>
            <div style={styles.welcomeTitle}>What would you like to know?</div>
            <p style={{ fontSize: 13 }}>Ask me anything about the science of aging, ongoing research, or why aging should be classified as a disease.</p>
            <div style={styles.suggestions}>
              {SUGGESTIONS.map((s, i) => (
                <button
                  key={i}
                  style={styles.suggestion}
                  onClick={() => sendMessage(s)}
                  onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--color-border-hover)'}
                  onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--color-border)'}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}
        {messages.map((msg, i) => (
          <div key={i} style={styles.message(msg.role === 'user')}>
            {msg.content}
          </div>
        ))}
        {loading && (
          <div style={{ ...styles.message(false), display: 'flex', alignItems: 'center', gap: 8, color: 'var(--color-text-tertiary)' }}>
            <Loader2 size={14} style={{ animation: 'spin 1s linear infinite' }} />
            Researching...
          </div>
        )}
        <div ref={messagesEnd} />
      </div>

      <div style={styles.inputArea}>
        <input
          style={styles.input}
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask about aging research..."
          disabled={loading}
        />
        <button
          style={{ ...styles.sendBtn, opacity: input.trim() && !loading ? 1 : 0.5 }}
          onClick={() => sendMessage()}
          disabled={!input.trim() || loading}
        >
          <Send size={16} />
        </button>
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
    </div>
  )
}
