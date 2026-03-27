import { ArrowDown } from 'lucide-react'

const styles = {
  hero: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden',
    padding: '120px 24px 80px',
  },
  grain: {
    position: 'absolute',
    inset: 0,
    background: 'radial-gradient(ellipse at 30% 20%, rgba(232, 93, 58, 0.06) 0%, transparent 60%), radial-gradient(ellipse at 70% 80%, rgba(45, 212, 168, 0.04) 0%, transparent 50%)',
    pointerEvents: 'none',
  },
  content: {
    maxWidth: 880,
    textAlign: 'center',
    position: 'relative',
    zIndex: 1,
  },
  eyebrow: {
    fontFamily: 'var(--font-body)',
    fontSize: 13,
    fontWeight: 600,
    letterSpacing: '0.2em',
    textTransform: 'uppercase',
    color: 'var(--color-accent)',
    marginBottom: 28,
  },
  title: {
    fontFamily: 'var(--font-display)',
    fontSize: 'clamp(40px, 7vw, 80px)',
    lineHeight: 1.05,
    color: 'var(--color-text)',
    marginBottom: 32,
  },
  titleAccent: {
    color: 'var(--color-accent)',
    fontStyle: 'italic',
  },
  subtitle: {
    fontSize: 'clamp(17px, 2vw, 21px)',
    color: 'var(--color-text-secondary)',
    lineHeight: 1.7,
    maxWidth: 640,
    margin: '0 auto 48px',
  },
  stats: {
    display: 'flex',
    justifyContent: 'center',
    gap: 48,
    flexWrap: 'wrap',
    marginBottom: 56,
  },
  stat: {
    textAlign: 'center',
  },
  statNumber: {
    fontFamily: 'var(--font-display)',
    fontSize: 'clamp(36px, 5vw, 52px)',
    color: 'var(--color-text)',
    lineHeight: 1,
  },
  statLabel: {
    fontSize: 13,
    color: 'var(--color-text-tertiary)',
    marginTop: 8,
    maxWidth: 160,
  },
  cta: {
    display: 'flex',
    gap: 16,
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  scroll: {
    position: 'absolute',
    bottom: 32,
    left: '50%',
    transform: 'translateX(-50%)',
    color: 'var(--color-text-tertiary)',
    animation: 'fadeInUp 1s ease-out 0.8s both',
  },
}

export default function Hero() {
  return (
    <section style={styles.hero}>
      <div style={styles.grain} />
      <div style={styles.content}>
        <p style={styles.eyebrow} className="fade-in-up">
          A case for reclassification
        </p>
        <h1 style={styles.title} className="fade-in-up delay-1">
          Aging kills more people than{' '}
          <span style={styles.titleAccent}>every disease combined.</span>
          <br />It's time we called it what it is.
        </h1>
        <p style={styles.subtitle} className="fade-in-up delay-2">
          Senescence — the biological decay that follows maturity — has identifiable causes,
          measurable biomarkers, and emerging treatments. The only thing missing is the
          classification that would unlock funding, trials, and cures.
        </p>
        <div style={styles.stats} className="fade-in-up delay-3">
          <div style={styles.stat}>
            <div style={styles.statNumber}>100K</div>
            <div style={styles.statLabel}>people die from aging every single day</div>
          </div>
          <div style={styles.stat}>
            <div style={styles.statNumber}>$83T</div>
            <div style={styles.statLabel}>economic value of slowing aging by just 2.2 years</div>
          </div>
          <div style={styles.stat}>
            <div style={styles.statNumber}>12</div>
            <div style={styles.statLabel}>identified biological hallmarks of aging</div>
          </div>
        </div>
        <div style={styles.cta} className="fade-in-up delay-4">
          <a href="#data" className="btn btn-primary">See the evidence</a>
          <a href="#hallmarks" className="btn btn-secondary">Explore the hallmarks</a>
        </div>
      </div>
      <div style={styles.scroll}>
        <ArrowDown size={20} />
      </div>
    </section>
  )
}
