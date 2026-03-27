import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Area, AreaChart } from 'recharts'

const mortalityData = [
  { age: '25-34', rate: 1.4, label: '25–34' },
  { age: '35-44', rate: 2.3, label: '35–44' },
  { age: '45-54', rate: 5.2, label: '45–54' },
  { age: '55-64', rate: 11.6, label: '55–64' },
  { age: '65-74', rate: 24.8, label: '65–74' },
  { age: '75-84', rate: 58.4, label: '75–84' },
  { age: '85+', rate: 146.2, label: '85+' },
]

const diseaseRiskData = [
  { age: '30', cancer: 1, heart: 1, alzheimers: 1, diabetes: 1 },
  { age: '40', cancer: 2.5, heart: 3, alzheimers: 1.2, diabetes: 2.8 },
  { age: '50', cancer: 6, heart: 8, alzheimers: 2, diabetes: 6 },
  { age: '60', cancer: 12, heart: 18, alzheimers: 5, diabetes: 11 },
  { age: '70', cancer: 22, heart: 35, alzheimers: 15, diabetes: 18 },
  { age: '80', cancer: 32, heart: 60, alzheimers: 40, diabetes: 24 },
]

const tooltipStyle = {
  backgroundColor: '#1A1A1A',
  border: '1px solid #2A2A2A',
  borderRadius: 8,
  padding: '8px 12px',
  fontSize: 13,
  color: '#F0EDE6',
}

const styles = {
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 480px), 1fr))',
    gap: 32,
    marginTop: 48,
  },
  chartCard: {
    background: 'var(--color-bg-card)',
    border: '1px solid var(--color-border)',
    borderRadius: 'var(--radius-lg)',
    padding: '28px 28px 20px',
  },
  chartTitle: {
    fontFamily: 'var(--font-body)',
    fontSize: 16,
    fontWeight: 600,
    color: 'var(--color-text)',
    marginBottom: 4,
  },
  chartSub: {
    fontSize: 13,
    color: 'var(--color-text-tertiary)',
    marginBottom: 24,
  },
  legend: {
    display: 'flex',
    gap: 20,
    flexWrap: 'wrap',
    marginTop: 16,
    fontSize: 12,
    color: 'var(--color-text-secondary)',
  },
  legendItem: {
    display: 'flex',
    alignItems: 'center',
    gap: 6,
  },
  dot: (color) => ({
    width: 8,
    height: 8,
    borderRadius: '50%',
    background: color,
  }),
  callout: {
    background: 'var(--color-accent-soft)',
    border: '1px solid rgba(232, 93, 58, 0.2)',
    borderRadius: 'var(--radius-lg)',
    padding: '28px 32px',
    marginTop: 48,
    maxWidth: 720,
  },
  calloutText: {
    fontFamily: 'var(--font-display)',
    fontSize: 22,
    lineHeight: 1.4,
    color: 'var(--color-text)',
  },
  calloutSource: {
    fontSize: 13,
    color: 'var(--color-text-tertiary)',
    marginTop: 12,
  },
}

export default function DataSection() {
  return (
    <section className="section container" id="data">
      <div className="section-label">The evidence</div>
      <h2 className="section-title">Age is the #1 risk factor for nearly every disease that kills you.</h2>
      <p className="section-subtitle">
        The data is unambiguous. As biological age increases, mortality and disease risk
        don't just rise — they explode exponentially. This isn't correlation. It's causation.
      </p>

      <div style={styles.grid}>
        <div style={styles.chartCard}>
          <div style={styles.chartTitle}>All-cause mortality rate by age</div>
          <div style={styles.chartSub}>Deaths per 1,000 people (US, age-adjusted)</div>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={mortalityData} margin={{ top: 8, right: 8, bottom: 0, left: -12 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2A2A2A" />
              <XAxis dataKey="label" tick={{ fill: '#6B6860', fontSize: 12 }} axisLine={{ stroke: '#2A2A2A' }} />
              <YAxis tick={{ fill: '#6B6860', fontSize: 12 }} axisLine={{ stroke: '#2A2A2A' }} />
              <Tooltip contentStyle={tooltipStyle} cursor={{ fill: 'rgba(232, 93, 58, 0.06)' }} />
              <Bar dataKey="rate" fill="#E85D3A" radius={[4, 4, 0, 0]} name="Deaths per 1,000" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div style={styles.chartCard}>
          <div style={styles.chartTitle}>Disease risk multiplier by age</div>
          <div style={styles.chartSub}>Relative risk compared to age 30 baseline</div>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={diseaseRiskData} margin={{ top: 8, right: 8, bottom: 0, left: -12 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2A2A2A" />
              <XAxis dataKey="age" tick={{ fill: '#6B6860', fontSize: 12 }} axisLine={{ stroke: '#2A2A2A' }} />
              <YAxis tick={{ fill: '#6B6860', fontSize: 12 }} axisLine={{ stroke: '#2A2A2A' }} />
              <Tooltip contentStyle={tooltipStyle} />
              <Line type="monotone" dataKey="heart" stroke="#E85D3A" strokeWidth={2} dot={false} name="Heart disease" />
              <Line type="monotone" dataKey="alzheimers" stroke="#A78BFA" strokeWidth={2} dot={false} name="Alzheimer's" />
              <Line type="monotone" dataKey="cancer" stroke="#2DD4A8" strokeWidth={2} dot={false} name="Cancer" />
              <Line type="monotone" dataKey="diabetes" stroke="#F5A623" strokeWidth={2} dot={false} name="Diabetes" />
            </LineChart>
          </ResponsiveContainer>
          <div style={styles.legend}>
            <span style={styles.legendItem}><span style={styles.dot('#E85D3A')} /> Heart disease</span>
            <span style={styles.legendItem}><span style={styles.dot('#A78BFA')} /> Alzheimer's</span>
            <span style={styles.legendItem}><span style={styles.dot('#2DD4A8')} /> Cancer</span>
            <span style={styles.legendItem}><span style={styles.dot('#F5A623')} /> Diabetes</span>
          </div>
        </div>
      </div>

      <div style={styles.callout}>
        <div style={styles.calloutText}>
          "If we could slow aging by just 2.2 years, the economic value would be $83 trillion
          over 50 years — more than the value of curing cancer and heart disease combined."
        </div>
        <div style={styles.calloutSource}>
          — Scott, Ellison & Sinclair, Nature Aging (2021)
        </div>
      </div>
    </section>
  )
}
