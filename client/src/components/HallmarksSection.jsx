import { useState, useEffect } from 'react'
import { hallmarksApi } from '../services/api'
import { Dna, Ruler, Layers, Box, Recycle, Activity, Zap, PauseCircle, GitBranch, Radio, Flame, Target, ChevronDown, ChevronUp } from 'lucide-react'

const iconMap = {
  dna: Dna, ruler: Ruler, layers: Layers, box: Box, recycle: Recycle,
  activity: Activity, zap: Zap, 'pause-circle': PauseCircle,
  'git-branch': GitBranch, radio: Radio, flame: Flame, target: Target,
}

const categoryColors = {
  Primary: { bg: 'var(--color-accent-soft)', text: 'var(--color-accent)', border: 'rgba(232, 93, 58, 0.2)' },
  Antagonistic: { bg: 'var(--color-amber-soft)', text: 'var(--color-amber)', border: 'rgba(245, 166, 35, 0.2)' },
  Integrative: { bg: 'var(--color-purple-soft)', text: 'var(--color-purple)', border: 'rgba(167, 139, 250, 0.2)' },
}

const styles = {
  categories: {
    display: 'flex',
    gap: 12,
    marginBottom: 40,
    flexWrap: 'wrap',
  },
  catPill: (active, cat) => ({
    padding: '8px 18px',
    borderRadius: 100,
    fontSize: 13,
    fontWeight: 500,
    cursor: 'pointer',
    transition: 'all 0.2s',
    border: '1px solid',
    borderColor: active ? categoryColors[cat]?.border : 'var(--color-border)',
    background: active ? categoryColors[cat]?.bg : 'transparent',
    color: active ? categoryColors[cat]?.text : 'var(--color-text-secondary)',
  }),
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 340px), 1fr))',
    gap: 20,
  },
  card: (cat) => ({
    background: 'var(--color-bg-card)',
    border: '1px solid var(--color-border)',
    borderRadius: 'var(--radius-lg)',
    padding: '24px',
    cursor: 'pointer',
    transition: 'all 0.25s',
    borderLeft: `3px solid ${categoryColors[cat]?.text || 'var(--color-border)'}`,
  }),
  cardHeader: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 12,
    marginBottom: 8,
  },
  cardTitleRow: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
  },
  iconWrap: (cat) => ({
    width: 36,
    height: 36,
    borderRadius: 'var(--radius-sm)',
    background: categoryColors[cat]?.bg || 'var(--color-surface)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  }),
  cardTitle: {
    fontWeight: 600,
    fontSize: 15,
    color: 'var(--color-text)',
  },
  cardSummary: {
    fontSize: 14,
    color: 'var(--color-text-secondary)',
    lineHeight: 1.6,
  },
  cardDescription: {
    fontSize: 14,
    color: 'var(--color-text-secondary)',
    lineHeight: 1.7,
    marginTop: 16,
    paddingTop: 16,
    borderTop: '1px solid var(--color-border)',
  },
  tag: {
    fontSize: 11,
    fontWeight: 500,
    padding: '3px 10px',
    borderRadius: 100,
    flexShrink: 0,
  },
  loading: {
    textAlign: 'center',
    padding: 60,
    color: 'var(--color-text-tertiary)',
  },
}

function HallmarkCard({ hallmark }) {
  const [expanded, setExpanded] = useState(false)
  const Icon = iconMap[hallmark.iconName] || Target
  const catColor = categoryColors[hallmark.category]

  return (
    <div
      style={styles.card(hallmark.category)}
      onClick={() => setExpanded(!expanded)}
      onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--color-border-hover)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--color-border)'; e.currentTarget.style.transform = 'translateY(0)' }}
    >
      <div style={styles.cardHeader}>
        <div style={styles.cardTitleRow}>
          <div style={styles.iconWrap(hallmark.category)}>
            <Icon size={18} color={catColor?.text} />
          </div>
          <span style={styles.cardTitle}>{hallmark.name}</span>
        </div>
        <span style={{ ...styles.tag, background: catColor?.bg, color: catColor?.text }}>
          {hallmark.category}
        </span>
      </div>
      <p style={styles.cardSummary}>{hallmark.summary}</p>
      {expanded && (
        <p style={styles.cardDescription}>{hallmark.description}</p>
      )}
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: 12, color: 'var(--color-text-tertiary)' }}>
        {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </div>
    </div>
  )
}

// Fallback data in case the API isn't running
const fallbackHallmarks = [
  { id: 1, name: 'Genomic Instability', slug: 'genomic-instability', category: 'Primary', iconName: 'dna', sortOrder: 1, summary: 'Accumulation of DNA damage throughout life that overwhelms repair mechanisms.', description: 'Throughout life, both exogenous and endogenous agents continuously damage DNA. The resulting accumulation of unrepaired genetic lesions drives cellular dysfunction, senescence, and cancer.' },
  { id: 2, name: 'Telomere Attrition', slug: 'telomere-attrition', category: 'Primary', iconName: 'ruler', sortOrder: 2, summary: 'Progressive shortening of chromosome-protecting telomeres with each cell division.', description: 'Telomeres cap chromosome ends, preventing degradation. Most somatic cells lack sufficient telomerase, so telomeres shorten with each division, eventually triggering senescence.' },
  { id: 3, name: 'Epigenetic Alterations', slug: 'epigenetic-alterations', category: 'Primary', iconName: 'layers', sortOrder: 3, summary: 'Changes in DNA methylation and chromatin that disrupt gene expression.', description: 'Epigenetic clocks can predict biological age with remarkable accuracy, suggesting these changes may be causal. Reprogramming factors can reverse epigenetic age.' },
  { id: 4, name: 'Loss of Proteostasis', slug: 'loss-of-proteostasis', category: 'Primary', iconName: 'box', sortOrder: 4, summary: 'Decline in protein quality control, leading to toxic aggregates.', description: 'This is the direct driver of neurodegenerative diseases — amyloid plaques in Alzheimer\'s, alpha-synuclein in Parkinson\'s.' },
  { id: 5, name: 'Disabled Macroautophagy', slug: 'disabled-macroautophagy', category: 'Primary', iconName: 'recycle', sortOrder: 5, summary: 'Declining cellular recycling machinery.', description: 'Autophagic activity declines with age. Enhancement via spermidine or rapamycin extends lifespan in model organisms.' },
  { id: 6, name: 'Deregulated Nutrient Sensing', slug: 'deregulated-nutrient-sensing', category: 'Antagonistic', iconName: 'activity', sortOrder: 6, summary: 'Dysregulation of insulin/IGF-1, mTOR, AMPK, and sirtuin pathways.', description: 'Caloric restriction works by modulating these pathways. Rapamycin and metformin are leading pharmacological candidates.' },
  { id: 7, name: 'Mitochondrial Dysfunction', slug: 'mitochondrial-dysfunction', category: 'Antagonistic', iconName: 'zap', sortOrder: 7, summary: 'Declining mitochondrial function increases oxidative stress.', description: 'NAD+ precursors and urolithin A show promise in restoring mitochondrial function.' },
  { id: 8, name: 'Cellular Senescence', slug: 'cellular-senescence', category: 'Antagonistic', iconName: 'pause-circle', sortOrder: 8, summary: 'Accumulation of permanently arrested cells secreting inflammatory factors.', description: 'Senolytics — drugs that selectively kill senescent cells — have shown dramatic results in preclinical models.' },
  { id: 9, name: 'Stem Cell Exhaustion', slug: 'stem-cell-exhaustion', category: 'Integrative', iconName: 'git-branch', sortOrder: 9, summary: 'Depletion of tissue-resident stem cells.', description: 'Stem cell rejuvenation strategies including parabiosis are active research areas.' },
  { id: 10, name: 'Altered Intercellular Communication', slug: 'altered-intercellular-communication', category: 'Integrative', iconName: 'radio', sortOrder: 10, summary: 'Breakdown in cell-to-cell signaling.', description: 'The most prominent consequence is inflammaging — chronic, low-grade inflammation.' },
  { id: 11, name: 'Chronic Inflammation', slug: 'chronic-inflammation', category: 'Integrative', iconName: 'flame', sortOrder: 11, summary: 'Persistent low-grade inflammation driving tissue destruction.', description: 'Inflammaging is a convergence point where multiple hallmarks manifest as systemic damage.' },
  { id: 12, name: 'Dysbiosis', slug: 'dysbiosis', category: 'Integrative', iconName: 'target', sortOrder: 12, summary: 'Age-related shifts in gut microbiome composition.', description: 'Fecal transplants from young to aged mice have reversed hallmarks of aging in the gut, brain, and eyes.' },
]

export default function HallmarksSection() {
  const [hallmarks, setHallmarks] = useState(fallbackHallmarks)
  const [filter, setFilter] = useState('All')

  useEffect(() => {
    hallmarksApi.getAll()
      .then(data => setHallmarks(data))
      .catch(() => { /* use fallback */ })
  }, [])

  const categories = ['All', 'Primary', 'Antagonistic', 'Integrative']
  const filtered = filter === 'All' ? hallmarks : hallmarks.filter(h => h.category === filter)

  return (
    <section className="section container" id="hallmarks">
      <div className="section-label">The mechanism</div>
      <h2 className="section-title">12 hallmarks. One root cause.</h2>
      <p className="section-subtitle">
        In 2023, López-Otín et al. expanded the original hallmarks framework to 12 interconnected
        biological processes that drive aging. Each is measurable, each is targetable.
      </p>

      <div style={styles.categories}>
        {categories.map(cat => (
          <button
            key={cat}
            style={styles.catPill(filter === cat, cat)}
            onClick={() => setFilter(cat)}
          >
            {cat === 'All' ? 'All hallmarks' : cat}
          </button>
        ))}
      </div>

      <div style={styles.grid}>
        {filtered.map(h => (
          <HallmarkCard key={h.id} hallmark={h} />
        ))}
      </div>
    </section>
  )
}
