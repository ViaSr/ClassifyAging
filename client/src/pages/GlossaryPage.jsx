import { useState } from 'react'
import { Search, Dna, FlaskConical, Globe, Microscope, ExternalLink } from 'lucide-react'

const CATEGORIES = ['All', 'Biology & Aging', 'Interventions', 'Policy & Advocacy']

const glossaryEntries = [
  // ── Biology & Aging ──
  {
    term: 'Senescence',
    aka: 'Biological aging',
    category: 'Biology & Aging',
    icon: 'dna',
    definition: 'The gradual biological deterioration that occurs after an organism reaches maturity. Senescence is characterized by declining function across cells, tissues, and organ systems, leading to increased vulnerability to disease and death. It is distinct from chronological aging — two people the same age can have very different levels of biological senescence.',
    whyItMatters: 'This is the core concept of the entire project. We argue that senescence meets every reasonable criterion for disease classification: it has identifiable causes, measurable biomarkers, progressive symptoms, and emerging treatments.',
    sources: [
      { title: 'Hallmarks of Aging: An Expanding Universe', authors: 'López-Otín C, Blasco MA, Partridge L, Serrano M, Kroemer G', journal: 'Cell, 186(2), 243–278', year: 2023, url: 'https://doi.org/10.1016/j.cell.2022.11.001' },
      { title: 'The Hallmarks of Aging', authors: 'López-Otín C, Blasco MA, Partridge L, Serrano M, Kroemer G', journal: 'Cell, 153(6), 1194–1217', year: 2013, url: 'https://doi.org/10.1016/j.cell.2013.05.039' },
    ],
  },
  {
    term: 'Hallmarks of Aging',
    category: 'Biology & Aging',
    icon: 'microscope',
    definition: 'A framework of 12 interconnected biological processes that drive aging, first proposed by López-Otín et al. in 2013 (originally 9 hallmarks, expanded to 12 in 2023). The hallmarks are grouped into three categories: Primary (genomic instability, telomere attrition, epigenetic alterations, loss of proteostasis, disabled macroautophagy), Antagonistic (deregulated nutrient sensing, mitochondrial dysfunction, cellular senescence), and Integrative (stem cell exhaustion, altered intercellular communication, chronic inflammation, dysbiosis).',
    whyItMatters: 'The hallmarks framework is the scientific backbone of the disease classification argument. If aging has identifiable, categorizable mechanisms — it can be studied, targeted, and treated like any disease.',
    sources: [
      { title: 'Hallmarks of Aging: An Expanding Universe', authors: 'López-Otín C, Blasco MA, Partridge L, Serrano M, Kroemer G', journal: 'Cell, 186(2), 243–278', year: 2023, url: 'https://doi.org/10.1016/j.cell.2022.11.001' },
    ],
  },
  {
    term: 'Cellular Senescence',
    category: 'Biology & Aging',
    icon: 'dna',
    definition: 'A state where individual cells permanently stop dividing but resist dying (apoptosis). These "zombie cells" accumulate with age and secrete a toxic mix of inflammatory molecules called the SASP (Senescence-Associated Secretory Phenotype), which damages surrounding healthy tissue and drives chronic inflammation.',
    whyItMatters: 'Cellular senescence is one of the most targetable hallmarks. Senolytic drugs that clear these cells have shown dramatic results in animal models and are now entering human trials.',
    sources: [
      { title: 'The Role of Senescent Cells in Ageing', authors: 'van Deursen JM', journal: 'Nature, 509(7501), 439–446', year: 2014, url: 'https://doi.org/10.1038/nature13193' },
      { title: 'Cellular Senescence: Defining a Path Forward', authors: 'Gorgoulis V, Adams PD, Alimonti A, et al.', journal: 'Cell, 179(4), 813–827', year: 2019, url: 'https://doi.org/10.1016/j.cell.2019.10.005' },
    ],
  },
  {
    term: 'Telomeres',
    category: 'Biology & Aging',
    icon: 'dna',
    definition: 'Protective caps on the ends of chromosomes, made of repetitive DNA sequences (TTAGGG in humans). They shorten with each cell division because most cells lack sufficient telomerase (the enzyme that rebuilds them). When telomeres become critically short, cells enter senescence or die.',
    whyItMatters: 'Telomere length is one of the most well-studied biomarkers of biological age. Short telomeres are associated with age-related diseases and reduced lifespan.',
    sources: [
      { title: 'Telomeres and Telomerase: Three Decades of Progress (Nobel Lecture)', authors: 'Blackburn EH', journal: 'Nobel Prize in Physiology or Medicine', year: 2009, url: 'https://doi.org/10.1002/anie.201002387' },
      { title: 'Telomere Shortening and Disease', authors: 'Armanios M, Blackburn EH', journal: 'Journal of Clinical Investigation, 122(2), 401–403', year: 2012, url: 'https://doi.org/10.1172/JCI60030' },
    ],
  },
  {
    term: 'Epigenetic Clock',
    category: 'Biology & Aging',
    icon: 'microscope',
    definition: 'A biochemical test that measures biological age by analyzing DNA methylation patterns at specific sites across the genome. The most well-known are the Horvath Clock (2013) and GrimAge. These clocks can predict biological age with remarkable accuracy and can differ significantly from chronological age.',
    whyItMatters: 'Epigenetic clocks give us a measurable, objective biomarker for aging — essential for clinical trials and for proving that interventions actually slow or reverse biological aging.',
    sources: [
      { title: 'DNA Methylation Age of Human Tissues and Cell Types', authors: 'Horvath S', journal: 'Genome Biology, 14(10), R115', year: 2013, url: 'https://doi.org/10.1186/gb-2013-14-10-r115' },
      { title: 'DNA Methylation GrimAge Strongly Predicts Lifespan and Healthspan', authors: 'Lu AT, Quach A, Wilson JG, et al.', journal: 'Aging, 11(2), 303–327', year: 2019, url: 'https://doi.org/10.18632/aging.101684' },
    ],
  },
  {
    term: 'Inflammaging',
    category: 'Biology & Aging',
    icon: 'dna',
    definition: 'Chronic, low-grade, sterile inflammation that increases with age. Driven by senescent cell accumulation (SASP), gut barrier dysfunction, immune dysregulation, and cellular debris. Characterized by elevated levels of inflammatory markers like IL-6, TNF-alpha, and CRP.',
    whyItMatters: 'Inflammaging is a convergence point where multiple hallmarks of aging manifest as systemic damage. It accelerates virtually every age-related disease and is now recognized as a standalone hallmark.',
    sources: [
      { title: 'Inflamm-aging: An Evolutionary Perspective on Immunosenescence', authors: 'Franceschi C, Bonafè M, Valensin S, et al.', journal: 'Annals of the New York Academy of Sciences, 908, 244–254', year: 2000, url: 'https://doi.org/10.1111/j.1749-6632.2000.tb06651.x' },
      { title: 'Chronic Inflammation in the Etiology of Disease Across the Life Span', authors: 'Furman D, Campisi J, Verdin E, et al.', journal: 'Nature Medicine, 25(12), 1822–1832', year: 2019, url: 'https://doi.org/10.1038/s41591-019-0675-0' },
    ],
  },
  {
    term: 'Autophagy',
    category: 'Biology & Aging',
    icon: 'microscope',
    definition: 'A cellular recycling process where cells break down and recycle damaged organelles, misfolded proteins, and other debris. The word comes from Greek meaning "self-eating." This essential maintenance process declines with age, allowing cellular damage to accumulate.',
    whyItMatters: 'Enhancing autophagy (through fasting, exercise, rapamycin, or spermidine) is one of the most reproducible ways to extend lifespan in model organisms. Yoshinori Ohsumi won the 2016 Nobel Prize for discovering its mechanisms.',
    sources: [
      { title: 'Autophagy: Renovation of Cells and Tissues (Nobel Lecture)', authors: 'Ohsumi Y', journal: 'Nobel Prize in Physiology or Medicine', year: 2016, url: 'https://doi.org/10.1016/j.cell.2014.02.006' },
      { title: 'Autophagy in Healthy Aging and Disease', authors: 'Levine B, Kroemer G', journal: 'Nature, 469(7330), 323–335', year: 2011, url: 'https://doi.org/10.1038/nature09782' },
    ],
  },
  {
    term: 'Proteostasis',
    category: 'Biology & Aging',
    icon: 'microscope',
    definition: 'The system of biological pathways that maintains the health of all proteins in a cell. Includes chaperone-assisted protein folding, the ubiquitin-proteasome system, and autophagy. When proteostasis fails with age, misfolded proteins accumulate and form toxic aggregates — the direct cause of neurodegenerative diseases like Alzheimer\'s and Parkinson\'s.',
    whyItMatters: 'Loss of proteostasis links aging directly to the most feared age-related diseases. Amyloid plaques, tau tangles, and alpha-synuclein aggregates are all failures of protein maintenance.',
    sources: [
      { title: 'Adapting Proteostasis for Disease Intervention', authors: 'Labbadia J, Morimoto RI', journal: 'Science, 346(6205), 1192–1198', year: 2014, url: 'https://doi.org/10.1126/science.1252592' },
    ],
  },

  // ── Interventions ──
  {
    term: 'Senolytics',
    category: 'Interventions',
    icon: 'flask',
    definition: 'A class of drugs that selectively kill senescent cells while sparing healthy cells. The first senolytic combination discovered was dasatinib (a cancer drug) plus quercetin (a plant flavonoid). Other candidates include fisetin and navitoclax (ABT-263).',
    whyItMatters: 'Senolytics represent one of the most promising approaches to directly targeting aging. In mouse studies, clearing senescent cells has reversed frailty, improved cardiac function, and extended healthspan. Multiple human trials are underway.',
    sources: [
      { title: 'The Achilles\' Heel of Senescent Cells: From Transcriptome to Senolytic Drugs', authors: 'Zhu Y, Tchkonia T, Pirtskhalava T, et al.', journal: 'Aging Cell, 14(4), 644–658', year: 2015, url: 'https://doi.org/10.1111/acel.12344' },
      { title: 'Senolytic Drugs: From Discovery to Translation', authors: 'Kirkland JL, Tchkonia T', journal: 'Journal of Internal Medicine, 288(5), 518–536', year: 2020, url: 'https://doi.org/10.1111/joim.13141' },
    ],
  },
  {
    term: 'Rapamycin',
    category: 'Interventions',
    icon: 'flask',
    definition: 'A drug originally discovered on Easter Island (Rapa Nui) and developed as an immunosuppressant. It inhibits the mTOR (mechanistic Target of Rapamycin) pathway, which regulates cell growth and metabolism. Rapamycin is the only drug shown to extend lifespan in every organism tested, including mammals.',
    whyItMatters: 'Rapamycin addresses multiple hallmarks of aging simultaneously — it enhances autophagy, reduces cellular senescence, and modulates nutrient sensing. It is widely considered one of the most promising geroprotective compounds.',
    sources: [
      { title: 'Rapamycin Fed Late in Life Extends Lifespan in Genetically Heterogeneous Mice', authors: 'Harrison DE, Strong R, Sharp ZD, et al.', journal: 'Nature, 460(7253), 392–395', year: 2009, url: 'https://doi.org/10.1038/nature08221' },
      { title: 'Rapamycin and the Hallmarks of Aging', authors: 'Blagosklonny MV', journal: 'Aging Cell, 22(4), e13846', year: 2023, url: 'https://doi.org/10.1111/acel.13846' },
    ],
  },
  {
    term: 'Metformin',
    category: 'Interventions',
    icon: 'flask',
    definition: 'A widely prescribed, inexpensive Type 2 diabetes drug that activates AMPK, a cellular energy sensor. Epidemiological studies have found that diabetics taking metformin sometimes have lower mortality rates than non-diabetics, suggesting effects beyond blood sugar control.',
    whyItMatters: 'Metformin is the intervention used in the TAME trial — the first clinical trial designed to target aging itself. Its decades-long safety record and low cost make it an ideal candidate if aging is reclassified as treatable.',
    sources: [
      { title: 'Can People with Type 2 Diabetes Live Longer Than Those Without?', authors: 'Bannister CA, Holden SE, Jenkins-Jones S, et al.', journal: 'Diabetes, Obesity and Metabolism, 16(11), 1165–1173', year: 2014, url: 'https://doi.org/10.1111/dom.12354' },
      { title: 'Metformin as a Tool to Target Aging', authors: 'Barzilai N, Crandall JP, Kritchevsky SB, Espeland MA', journal: 'Cell Metabolism, 23(6), 1060–1065', year: 2016, url: 'https://doi.org/10.1016/j.cmet.2016.05.011' },
    ],
  },
  {
    term: 'NAD+ Precursors',
    aka: 'NMN, NR, Nicotinamide Mononucleotide, Nicotinamide Riboside',
    category: 'Interventions',
    icon: 'flask',
    definition: 'Supplements that boost levels of NAD+ (Nicotinamide Adenine Dinucleotide), a coenzyme critical for cellular energy production, DNA repair, and sirtuin activation. NAD+ levels decline substantially with age — by age 50, levels are roughly half what they were at 20.',
    whyItMatters: 'Restoring NAD+ levels has shown benefits for mitochondrial function, DNA repair, and metabolic health in animal models. Multiple human clinical trials are ongoing to determine optimal dosing and efficacy.',
    sources: [
      { title: 'NAD+ Metabolism and Its Roles in Cellular Processes During Ageing', authors: 'Covarrubias AJ, Perrone R, Grozio A, Verdin E', journal: 'Nature Reviews Molecular Cell Biology, 22, 119–141', year: 2021, url: 'https://doi.org/10.1038/s41580-020-00313-x' },
    ],
  },
  {
    term: 'Epigenetic Reprogramming',
    aka: 'Yamanaka Factors, Cellular Rejuvenation',
    category: 'Interventions',
    icon: 'flask',
    definition: 'The use of specific transcription factors (Oct4, Sox2, Klf4, c-Myc — the "Yamanaka factors") to reset a cell\'s epigenetic state to a younger configuration. Shinya Yamanaka won the 2012 Nobel Prize for this discovery. Partial reprogramming aims to reverse aging markers without fully converting cells back to stem cells, which could cause tumors.',
    whyItMatters: 'This is the most radical approach to reversing aging — not just slowing it, but actually turning back the biological clock. Organizations like Altos Labs are investing billions in this research, though significant safety challenges remain.',
    sources: [
      { title: 'Induction of Pluripotent Stem Cells from Adult Human Fibroblasts by Defined Factors', authors: 'Takahashi K, Tanabe K, Ohnuki M, et al.', journal: 'Cell, 131(5), 861–872', year: 2007, url: 'https://doi.org/10.1016/j.cell.2007.11.019' },
      { title: 'In Vivo Partial Reprogramming Alters Age-Associated Molecular Changes During Physiological Aging in Mice', authors: 'Browder KC, Reddy P, et al.', journal: 'Nature Aging, 2, 243–253', year: 2022, url: 'https://doi.org/10.1038/s43587-022-00183-2' },
    ],
  },
  {
    term: 'Geroscience',
    category: 'Interventions',
    icon: 'flask',
    definition: 'The field of research focused on the relationship between aging and age-related diseases. The geroscience hypothesis proposes that by targeting the shared underlying biology of aging, we can prevent or delay multiple chronic diseases simultaneously — rather than fighting each one individually after it appears.',
    whyItMatters: 'This is the intellectual framework underpinning the disease classification argument. Treating heart disease, cancer, and Alzheimer\'s one at a time is treating symptoms. Treating aging treats the cause.',
    sources: [
      { title: 'Geroscience: Linking Aging to Chronic Disease', authors: 'Kennedy BK, Berger SL, Brunet A, et al.', journal: 'Cell, 159(4), 709–713', year: 2014, url: 'https://doi.org/10.1016/j.cell.2014.10.039' },
      { title: 'The Geroscience Hypothesis', authors: 'Sierra F, Kohanski R', journal: 'Advances in Geroscience, 1–36', year: 2017, url: 'https://doi.org/10.1007/978-3-319-23246-1_1' },
    ],
  },

  // ── Policy & Advocacy ──
  {
    term: 'ICD-11 XT9T',
    aka: 'WHO Ageing-Related Extension Code',
    category: 'Policy & Advocacy',
    icon: 'globe',
    definition: 'An extension code added to the World Health Organization\'s International Classification of Diseases (ICD-11) that allows "ageing-related" to be appended to any diagnosis. While not a full disease classification, it represents the first formal acknowledgment by a major international health body that aging is a medically relevant condition.',
    whyItMatters: 'This is the most significant policy precedent for reclassification. It opens the door for researchers and clinicians to formally link diseases to aging as an underlying cause, and establishes institutional recognition that aging is not simply "natural."',
    sources: [
      { title: 'ICD-11 for Mortality and Morbidity Statistics (XT9T)', authors: 'World Health Organization', journal: 'International Classification of Diseases, 11th Revision', year: 2022, url: 'https://icd.who.int/browse/2024-01/mms/en' },
      { title: 'Classification of Aging as a Disease in ICD-11', authors: 'Khaltourina D, Matveyev Y, et al.', journal: 'The Lancet Healthy Longevity, 1(1), e13–e14', year: 2020, url: 'https://doi.org/10.1016/S2666-7568(20)30002-3' },
    ],
  },
  {
    term: 'TAME Trial',
    aka: 'Targeting Aging with Metformin',
    category: 'Policy & Advocacy',
    icon: 'globe',
    definition: 'The first clinical trial specifically designed to test whether a drug (metformin) can slow aging itself rather than treating a specific age-related disease. Led by Dr. Nir Barzilai at the Albert Einstein College of Medicine, the trial required years of negotiation with the FDA to accept "aging" as a treatable indication.',
    whyItMatters: 'The TAME trial\'s existence may be more important than its specific results. It proves that the FDA is willing to consider aging as something that can be targeted by intervention — a regulatory precedent that could unlock the entire field.',
    sources: [
      { title: 'Metformin as a Tool to Target Aging', authors: 'Barzilai N, Crandall JP, Kritchevsky SB, Espeland MA', journal: 'Cell Metabolism, 23(6), 1060–1065', year: 2016, url: 'https://doi.org/10.1016/j.cmet.2016.05.011' },
      { title: 'TAME Trial Overview', authors: 'American Federation for Aging Research', journal: 'AFAR', year: 2024, url: 'https://www.afar.org/tame-trial' },
    ],
  },
  {
    term: 'FDA Disease Classification',
    category: 'Policy & Advocacy',
    icon: 'globe',
    definition: 'The process by which the U.S. Food and Drug Administration formally recognizes a condition as a disease or treatable indication. This classification determines whether pharmaceutical companies can develop drugs for a condition, run clinical trials with aging as a primary endpoint, seek regulatory approval, and receive insurance coverage for treatments.',
    whyItMatters: 'This is the central goal of ClassifyAging. Without disease classification, there is no regulatory pathway for anti-aging drugs, no insurance coverage for treatments, and limited incentive for pharmaceutical investment. Reclassification would unlock billions in research funding and drug development.',
    sources: [
      { title: 'It Is Time to Classify Biological Aging as a Disease', authors: 'Bulterijs S, Hull RS, Björk VCE, Roy AG', journal: 'Frontiers in Genetics, 6, 205', year: 2015, url: 'https://doi.org/10.3389/fgene.2015.00205' },
    ],
  },
  {
    term: 'The Economic Value of Targeting Aging',
    category: 'Policy & Advocacy',
    icon: 'globe',
    definition: 'A landmark economic analysis published in Nature Aging estimating that slowing aging by just 2.2 years would generate $83 trillion in economic value over 50 years — far exceeding the value of curing any single disease, including cancer and heart disease individually.',
    whyItMatters: 'This reframes aging research from a niche scientific interest to the single most valuable medical investment humanity could make. The economic argument is often more persuasive to policymakers than the scientific one.',
    sources: [
      { title: 'An Estimate of the Longevity Dividend', authors: 'Scott AJ, Ellison M, Sinclair DA', journal: 'Nature Aging, 1, 616–623', year: 2021, url: 'https://doi.org/10.1038/s43587-021-00080-0' },
    ],
  },
]

const iconComponents = {
  dna: Dna, flask: FlaskConical, globe: Globe, microscope: Microscope,
}

const categoryColors = {
  'Biology & Aging': { accent: 'var(--color-teal)', bg: 'var(--color-teal-soft)' },
  'Interventions': { accent: 'var(--color-amber)', bg: 'var(--color-amber-soft)' },
  'Policy & Advocacy': { accent: 'var(--color-accent)', bg: 'var(--color-accent-soft)' },
}

const styles = {
  page: { paddingTop: 100, minHeight: '100vh' },
  controls: {
    display: 'flex', gap: 12, marginTop: 32, flexWrap: 'wrap', alignItems: 'center',
  },
  searchWrap: { flex: '1 1 280px', position: 'relative' },
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
  pills: { display: 'flex', gap: 8, flexWrap: 'wrap' },
  pill: (active, cat) => ({
    padding: '7px 16px', borderRadius: 100, fontSize: 13, fontWeight: 500,
    cursor: 'pointer', border: '1px solid', transition: 'all 0.2s',
    borderColor: active ? (categoryColors[cat]?.accent || 'var(--color-border)') : 'var(--color-border)',
    background: active ? (categoryColors[cat]?.bg || 'transparent') : 'transparent',
    color: active ? (categoryColors[cat]?.accent || 'var(--color-text)') : 'var(--color-text-secondary)',
    fontFamily: 'var(--font-body)',
  }),
  list: { display: 'flex', flexDirection: 'column', gap: 16, marginTop: 32 },
  card: {
    background: 'var(--color-bg-card)', border: '1px solid var(--color-border)',
    borderRadius: 'var(--radius-lg)', padding: '28px', transition: 'border-color 0.2s',
  },
  cardTop: { display: 'flex', alignItems: 'flex-start', gap: 14, marginBottom: 12 },
  iconWrap: (cat) => ({
    width: 40, height: 40, borderRadius: 'var(--radius-sm)', flexShrink: 0,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    background: categoryColors[cat]?.bg || 'var(--color-surface)',
  }),
  term: { fontWeight: 600, fontSize: 18, color: 'var(--color-text)', lineHeight: 1.3 },
  aka: { fontSize: 13, color: 'var(--color-text-tertiary)', marginTop: 2, fontStyle: 'italic' },
  catTag: (cat) => ({
    fontSize: 11, fontWeight: 500, padding: '3px 10px', borderRadius: 100,
    background: categoryColors[cat]?.bg || 'var(--color-surface)',
    color: categoryColors[cat]?.accent || 'var(--color-text-secondary)',
    marginLeft: 'auto', flexShrink: 0, alignSelf: 'flex-start',
  }),
  definition: { fontSize: 15, color: 'var(--color-text-secondary)', lineHeight: 1.7, marginBottom: 16 },
  relevanceLabel: {
    fontSize: 12, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 6,
  },
  relevanceText: {
    fontSize: 14, color: 'var(--color-text-secondary)', lineHeight: 1.6,
    padding: '12px 16px', borderRadius: 'var(--radius-md)', background: 'var(--color-surface)',
  },
  sourcesSection: {
    marginTop: 16, paddingTop: 16, borderTop: '1px solid var(--color-border)',
  },
  sourcesLabel: {
    fontSize: 12, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase',
    color: 'var(--color-text-tertiary)', marginBottom: 10,
  },
  sourceItem: {
    fontSize: 13, lineHeight: 1.5, color: 'var(--color-text-tertiary)', marginBottom: 8,
    display: 'flex', gap: 8, alignItems: 'flex-start',
  },
  sourceLink: {
    color: 'var(--color-accent)', fontSize: 13, display: 'inline-flex',
    alignItems: 'center', gap: 4, textDecoration: 'none', flexShrink: 0,
  },
  empty: { textAlign: 'center', padding: 80, color: 'var(--color-text-tertiary)' },
  count: { fontSize: 14, color: 'var(--color-text-tertiary)', marginTop: 16 },
}

export default function GlossaryPage() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')

  const filtered = glossaryEntries.filter(entry => {
    const matchesCat = category === 'All' || entry.category === category
    const matchesSearch = !search ||
      entry.term.toLowerCase().includes(search.toLowerCase()) ||
      entry.definition.toLowerCase().includes(search.toLowerCase()) ||
      (entry.aka && entry.aka.toLowerCase().includes(search.toLowerCase()))
    return matchesCat && matchesSearch
  })

  return (
    <div style={styles.page}>
      <div className="container section">
        <div className="section-label">Reference</div>
        <h2 className="section-title">Glossary</h2>
        <p className="section-subtitle">
          Key terms, concepts, and milestones in the science and policy of aging —
          explained plainly, with sources you can verify.
        </p>

        <div style={styles.controls}>
          <div style={styles.searchWrap}>
            <Search size={16} style={styles.searchIcon} />
            <input
              style={styles.searchInput}
              placeholder="Search terms..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <div style={styles.pills}>
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                style={styles.pill(category === cat, cat)}
                onClick={() => setCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div style={styles.count}>
          {filtered.length} {filtered.length === 1 ? 'term' : 'terms'}
        </div>

        <div style={styles.list}>
          {filtered.length === 0 ? (
            <div style={styles.empty}>No terms match your search.</div>
          ) : (
            filtered.map(entry => {
              const Icon = iconComponents[entry.icon] || Dna
              const colors = categoryColors[entry.category]

              return (
                <div
                  key={entry.term}
                  style={styles.card}
                  onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--color-border-hover)'}
                  onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--color-border)'}
                >
                  <div style={styles.cardTop}>
                    <div style={styles.iconWrap(entry.category)}>
                      <Icon size={20} color={colors?.accent} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={styles.term}>{entry.term}</div>
                      {entry.aka && <div style={styles.aka}>Also known as: {entry.aka}</div>}
                    </div>
                    <span style={styles.catTag(entry.category)}>{entry.category}</span>
                  </div>

                  <div style={styles.definition}>{entry.definition}</div>

                  {entry.whyItMatters && (
                    <div style={{ marginBottom: 16 }}>
                      <div style={{ ...styles.relevanceLabel, color: colors?.accent }}>
                        Why it matters
                      </div>
                      <div style={styles.relevanceText}>{entry.whyItMatters}</div>
                    </div>
                  )}

                  {entry.sources && entry.sources.length > 0 && (
                    <div style={styles.sourcesSection}>
                      <div style={styles.sourcesLabel}>Sources</div>
                      {entry.sources.map((source, i) => (
                        <div key={i} style={styles.sourceItem}>
                          <span style={{ color: 'var(--color-text-tertiary)', flexShrink: 0 }}>•</span>
                          <span>
                            {source.authors} ({source.year}). <em>{source.title}</em>.{' '}
                            {source.journal}.{' '}
                            <a href={source.url} target="_blank" rel="noopener noreferrer" style={styles.sourceLink}>
                              View <ExternalLink size={11} />
                            </a>
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )
            })
          )}
        </div>
      </div>
    </div>
  )
}
