import { useState, useEffect } from 'react'
import { Search, ExternalLink, BookOpen, FlaskConical, Building2, Video, Newspaper, Library } from 'lucide-react'
import { resourcesApi } from '../services/api'

const typeIcons = {
  Paper: FlaskConical, Book: BookOpen, Organization: Building2,
  Video: Video, ClinicalTrial: Library, News: Newspaper,
}
const typeColors = {
  Paper: 'var(--color-teal)', Book: 'var(--color-purple)',
  Organization: 'var(--color-amber)', ClinicalTrial: 'var(--color-accent)',
  Video: 'var(--color-teal)', News: 'var(--color-text-secondary)',
}

const styles = {
  page: { paddingTop: 100, minHeight: '100vh' },
  controls: {
    display: 'flex', gap: 12, marginTop: 32, flexWrap: 'wrap', alignItems: 'center',
  },
  searchWrap: {
    flex: '1 1 280px', position: 'relative',
  },
  searchIcon: {
    position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)',
    color: 'var(--color-text-tertiary)', pointerEvents: 'none',
  },
  searchInput: {
    width: '100%', padding: '10px 14px 10px 42px',
    background: 'var(--color-bg-card)', border: '1px solid var(--color-border)',
    borderRadius: 'var(--radius-md)', color: 'var(--color-text)',
    fontFamily: 'var(--font-body)', fontSize: 14, outline: 'none',
  },
  select: {
    padding: '10px 14px', background: 'var(--color-bg-card)',
    border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)',
    color: 'var(--color-text)', fontFamily: 'var(--font-body)', fontSize: 14,
    outline: 'none', cursor: 'pointer',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 360px), 1fr))',
    gap: 20, marginTop: 32,
  },
  card: {
    background: 'var(--color-bg-card)', border: '1px solid var(--color-border)',
    borderRadius: 'var(--radius-lg)', padding: 24,
    display: 'flex', flexDirection: 'column', gap: 12,
    transition: 'border-color 0.2s, transform 0.2s',
  },
  cardTop: { display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 },
  cardType: (type) => ({
    display: 'inline-flex', alignItems: 'center', gap: 6,
    fontSize: 12, fontWeight: 500, color: typeColors[type] || 'var(--color-text-secondary)',
  }),
  cardTitle: {
    fontSize: 16, fontWeight: 600, color: 'var(--color-text)', lineHeight: 1.4,
  },
  cardDesc: {
    fontSize: 14, color: 'var(--color-text-secondary)', lineHeight: 1.6, flex: 1,
  },
  cardMeta: {
    display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 'auto',
  },
  metaTag: {
    fontSize: 11, padding: '3px 10px', borderRadius: 100,
    background: 'var(--color-surface)', color: 'var(--color-text-tertiary)',
  },
  link: {
    display: 'inline-flex', alignItems: 'center', gap: 6,
    fontSize: 13, fontWeight: 500, color: 'var(--color-accent)', marginTop: 4,
  },
  empty: {
    textAlign: 'center', padding: 80, color: 'var(--color-text-tertiary)',
    gridColumn: '1 / -1',
  },
}

// Fallback resources for when API isn't running
const fallbackResources = {
  items: [
    { id: 1, title: 'Hallmarks of Aging: An Expanding Universe', description: 'The landmark 2023 update expanding from 9 to 12 hallmarks.', url: 'https://doi.org/10.1016/j.cell.2022.11.001', type: 'Paper', difficulty: 'Advanced', authors: 'López-Otín C et al.', year: 2023, hallmarks: [], tags: ['review-paper', 'foundational'] },
    { id: 2, title: 'TAME Trial', description: 'First FDA clinical trial targeting aging itself.', url: 'https://www.afar.org/tame-trial', type: 'ClinicalTrial', difficulty: 'Beginner', authors: 'Barzilai N et al.', year: 2024, hallmarks: [], tags: ['clinical-trial', 'metformin'] },
    { id: 4, title: 'Lifespan: Why We Age — and Why We Don\'t Have To', description: 'Accessible book making the case that aging is a disease.', url: 'https://lifespanbook.com', type: 'Book', difficulty: 'Beginner', authors: 'Sinclair DA', year: 2019, hallmarks: [], tags: ['foundational'] },
    { id: 10, title: 'The Economic Value of Targeting Aging', description: 'Slowing aging by 2.2 years = $83 trillion over 50 years.', url: '#', type: 'Paper', difficulty: 'Intermediate', authors: 'Scott AJ et al.', year: 2021, hallmarks: [], tags: ['policy'] },
  ],
  totalCount: 4, page: 1, pageSize: 20, totalPages: 1,
}

export default function ResourcesPage() {
  const [resources, setResources] = useState(fallbackResources)
  const [search, setSearch] = useState('')
  const [type, setType] = useState('')
  const [difficulty, setDifficulty] = useState('')
  const [debounced, setDebounced] = useState('')

  // Debounce search
  useEffect(() => {
    const t = setTimeout(() => setDebounced(search), 300)
    return () => clearTimeout(t)
  }, [search])

  useEffect(() => {
    resourcesApi.search({ search: debounced, type, difficulty })
      .then(setResources)
      .catch(() => { /* use fallback */ })
  }, [debounced, type, difficulty])

  return (
    <div style={styles.page}>
      <div className="container section">
        <div className="section-label">Research library</div>
        <h2 className="section-title">Resources</h2>
        <p className="section-subtitle">
          Curated papers, books, organizations, and clinical trials building the case
          for aging as a treatable disease.
        </p>

        <div style={styles.controls}>
          <div style={styles.searchWrap}>
            <Search size={16} style={styles.searchIcon} />
            <input
              style={styles.searchInput}
              placeholder="Search resources..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <select style={styles.select} value={type} onChange={e => setType(e.target.value)}>
            <option value="">All types</option>
            <option value="Paper">Papers</option>
            <option value="Book">Books</option>
            <option value="ClinicalTrial">Clinical Trials</option>
            <option value="Organization">Organizations</option>
            <option value="Video">Videos</option>
          </select>
          <select style={styles.select} value={difficulty} onChange={e => setDifficulty(e.target.value)}>
            <option value="">All levels</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
        </div>

        <div style={styles.grid}>
          {resources.items.length === 0 ? (
            <div style={styles.empty}>No resources match your filters.</div>
          ) : (
            resources.items.map(r => {
              const Icon = typeIcons[r.type] || BookOpen
              return (
                <div
                  key={r.id}
                  style={styles.card}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--color-border-hover)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--color-border)'; e.currentTarget.style.transform = 'translateY(0)' }}
                >
                  <div style={styles.cardTop}>
                    <div style={styles.cardType(r.type)}>
                      <Icon size={14} />
                      {r.type === 'ClinicalTrial' ? 'Clinical Trial' : r.type}
                    </div>
                    {r.year && <span style={{ fontSize: 12, color: 'var(--color-text-tertiary)' }}>{r.year}</span>}
                  </div>
                  <div style={styles.cardTitle}>{r.title}</div>
                  {r.authors && <div style={{ fontSize: 13, color: 'var(--color-text-tertiary)' }}>{r.authors}</div>}
                  <div style={styles.cardDesc}>{r.description}</div>
                  <div style={styles.cardMeta}>
                    <span style={{ ...styles.metaTag, background: 'var(--color-accent-soft)', color: 'var(--color-accent)' }}>
                      {r.difficulty}
                    </span>
                    {r.tags.slice(0, 3).map(t => (
                      <span key={t} style={styles.metaTag}>{t.replace('-', ' ')}</span>
                    ))}
                  </div>
                  <a href={r.url} target="_blank" rel="noopener noreferrer" style={styles.link}>
                    View resource <ExternalLink size={12} />
                  </a>
                </div>
              )
            })
          )}
        </div>
      </div>
    </div>
  )
}
