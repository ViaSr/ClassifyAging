using ClassifyAging.Api.Models;

namespace ClassifyAging.Api.Data.Seed;

public static class SeedData
{
    public static List<Hallmark> GetHallmarks() => new()
    {
        new Hallmark
        {
            Id = 1, Name = "Genomic Instability", Slug = "genomic-instability",
            Category = "Primary",
            IconName = "dna",
            SortOrder = 1,
            Summary = "Accumulation of DNA damage throughout life that overwhelms repair mechanisms.",
            Description = "Throughout life, both exogenous (radiation, chemicals) and endogenous (replication errors, reactive oxygen species) agents continuously damage DNA. While cells possess sophisticated repair mechanisms, their efficiency declines with age. The resulting accumulation of unrepaired genetic lesions — point mutations, translocations, chromosomal gains and losses — drives cellular dysfunction, senescence, and cancer. Progeroid syndromes caused by DNA repair deficiencies demonstrate that genomic instability alone is sufficient to accelerate aging."
        },
        new Hallmark
        {
            Id = 2, Name = "Telomere Attrition", Slug = "telomere-attrition",
            Category = "Primary",
            IconName = "ruler",
            SortOrder = 2,
            Summary = "Progressive shortening of chromosome-protecting telomeres with each cell division.",
            Description = "Telomeres are repetitive nucleotide sequences (TTAGGG in vertebrates) capping chromosome ends, preventing degradation and fusion. Most somatic cells lack sufficient telomerase activity, so telomeres shorten with each division. When critically short, cells enter replicative senescence or apoptosis. Short telomeres correlate with age-related diseases including pulmonary fibrosis, aplastic anemia, and dyskeratosis congenita. Telomerase reactivation in mice has been shown to reverse tissue degeneration."
        },
        new Hallmark
        {
            Id = 3, Name = "Epigenetic Alterations", Slug = "epigenetic-alterations",
            Category = "Primary",
            IconName = "layers",
            SortOrder = 3,
            Summary = "Changes in DNA methylation, histone modifications, and chromatin remodeling that disrupt gene expression.",
            Description = "Aging is accompanied by widespread changes in DNA methylation patterns, histone post-translational modifications, and chromatin remodeling. These epigenetic drifts alter gene expression programs, reactivating silenced genes and silencing active ones. Epigenetic clocks (Horvath, GrimAge) can predict biological age with remarkable accuracy, suggesting epigenetic changes are not merely correlated with aging but may be causal. Reprogramming factors (Yamanaka factors) can reverse epigenetic age in cells and tissues."
        },
        new Hallmark
        {
            Id = 4, Name = "Loss of Proteostasis", Slug = "loss-of-proteostasis",
            Category = "Primary",
            IconName = "box",
            SortOrder = 4,
            Summary = "Decline in protein folding quality control, leading to toxic aggregates.",
            Description = "Cells maintain protein homeostasis through chaperone-assisted folding, the ubiquitin-proteasome system, and autophagy-lysosomal degradation. With age, these mechanisms decline, leading to accumulation of misfolded, aggregated, or damaged proteins. This is the direct driver of neurodegenerative diseases — amyloid plaques in Alzheimer's, alpha-synuclein in Parkinson's, huntingtin aggregates in Huntington's. Enhancing autophagy or proteasome activity extends lifespan in model organisms."
        },
        new Hallmark
        {
            Id = 5, Name = "Disabled Macroautophagy", Slug = "disabled-macroautophagy",
            Category = "Primary",
            IconName = "recycle",
            SortOrder = 5,
            Summary = "Declining cellular recycling machinery that normally clears damaged components.",
            Description = "Macroautophagy is the primary mechanism by which cells sequester and degrade damaged organelles, protein aggregates, and intracellular pathogens. Autophagic activity declines with age across tissues, contributing to the accumulation of cellular debris that drives inflammation and dysfunction. Genetic or pharmacological enhancement of autophagy (e.g., via spermidine, rapamycin) extends lifespan in yeast, worms, flies, and mice."
        },
        new Hallmark
        {
            Id = 6, Name = "Deregulated Nutrient Sensing", Slug = "deregulated-nutrient-sensing",
            Category = "Antagonistic",
            IconName = "activity",
            SortOrder = 6,
            Summary = "Aging dysregulates the insulin/IGF-1, mTOR, AMPK, and sirtuin pathways.",
            Description = "The nutrient-sensing network — including insulin/IGF-1 signaling (IIS), mTOR, AMPK, and sirtuins — regulates growth, metabolism, and stress responses based on nutrient availability. With age, these pathways become dysregulated, favoring anabolic signaling even when conditions call for repair and maintenance. Caloric restriction, the most reproducible life-extending intervention across species, works by modulating these pathways. Rapamycin (mTOR inhibition) and metformin (AMPK activation) are leading pharmacological candidates."
        },
        new Hallmark
        {
            Id = 7, Name = "Mitochondrial Dysfunction", Slug = "mitochondrial-dysfunction",
            Category = "Antagonistic",
            IconName = "zap",
            SortOrder = 7,
            Summary = "Age-related decline in mitochondrial function increases oxidative stress and reduces energy production.",
            Description = "Mitochondria deteriorate with age: electron transport chain efficiency drops, reactive oxygen species (ROS) production increases, mitochondrial DNA accumulates mutations, and mitophagy (selective clearance of damaged mitochondria) declines. This creates a vicious cycle of oxidative damage and energy depletion. Mitochondrial dysfunction contributes to sarcopenia, neurodegeneration, and metabolic syndrome. NAD+ precursors (NMN, NR) and urolithin A show promise in restoring mitochondrial function."
        },
        new Hallmark
        {
            Id = 8, Name = "Cellular Senescence", Slug = "cellular-senescence",
            Category = "Antagonistic",
            IconName = "pause-circle",
            SortOrder = 8,
            Summary = "Accumulation of permanently arrested cells that secrete inflammatory factors.",
            Description = "Senescent cells have permanently exited the cell cycle but resist apoptosis. They accumulate with age and secrete a cocktail of pro-inflammatory cytokines, chemokines, and proteases known as the senescence-associated secretory phenotype (SASP). This corrupts the tissue microenvironment, driving chronic inflammation ('inflammaging'), tissue dysfunction, and cancer. Senolytics — drugs that selectively kill senescent cells (dasatinib + quercetin, fisetin, navitoclax) — have shown dramatic results in preclinical models, reversing frailty, improving cardiac function, and extending healthspan."
        },
        new Hallmark
        {
            Id = 9, Name = "Stem Cell Exhaustion", Slug = "stem-cell-exhaustion",
            Category = "Integrative",
            IconName = "git-branch",
            SortOrder = 9,
            Summary = "Depletion and dysfunction of tissue-resident stem cells that maintain organ function.",
            Description = "Tissue homeostasis depends on resident stem and progenitor cells replacing damaged cells. With age, stem cell pools shrink and their regenerative capacity declines due to accumulated damage from other hallmarks — DNA damage, epigenetic drift, telomere shortening, niche deterioration. This manifests as impaired wound healing, immunosenescence (hematopoietic stem cell decline), muscle wasting, and reduced neurogenesis. Stem cell rejuvenation strategies, including parabiosis and young plasma factors (GDF11, oxytocin), are active research areas."
        },
        new Hallmark
        {
            Id = 10, Name = "Altered Intercellular Communication", Slug = "altered-intercellular-communication",
            Category = "Integrative",
            IconName = "radio",
            SortOrder = 10,
            Summary = "Breakdown in signaling between cells, driving chronic systemic inflammation.",
            Description = "Aging disrupts the communication networks between cells and organ systems. The most prominent consequence is chronic, low-grade, sterile inflammation — 'inflammaging' — driven by the SASP, innate immune activation, and declining immunosurveillance. This inflammatory milieu accelerates every other hallmark, creating a self-reinforcing cascade. Anti-inflammatory interventions, from simple aspirin to targeted cytokine blockade, have shown geroprotective effects in animal models and some human trials."
        },
        new Hallmark
        {
            Id = 11, Name = "Chronic Inflammation", Slug = "chronic-inflammation",
            Category = "Integrative",
            IconName = "flame",
            SortOrder = 11,
            Summary = "Persistent low-grade inflammation ('inflammaging') that drives tissue destruction.",
            Description = "Now recognized as a standalone hallmark, chronic inflammation ('inflammaging') is driven by senescent cell accumulation, gut barrier dysfunction, immune dysregulation, and cell debris. Elevated levels of IL-6, TNF-alpha, and CRP are strongly associated with frailty, sarcopenia, atherosclerosis, neurodegeneration, and mortality. Inflammaging represents a convergence point where multiple primary and antagonistic hallmarks manifest as systemic damage."
        },
        new Hallmark
        {
            Id = 12, Name = "Dysbiosis", Slug = "dysbiosis",
            Category = "Integrative",
            IconName = "target",
            SortOrder = 12,
            Summary = "Age-related shifts in gut microbiome composition that drive inflammation and metabolic dysfunction.",
            Description = "The gut microbiome undergoes significant compositional shifts with age: diversity decreases, beneficial species decline, and pro-inflammatory species expand. This dysbiosis contributes to intestinal barrier dysfunction ('leaky gut'), systemic inflammation, and impaired immune function. Fecal microbiota transplants from young to aged mice have been shown to reverse hallmarks of aging in the gut, brain, and eyes. The gut-brain axis and gut-immune axis make dysbiosis a systemic multiplier of aging."
        }
    };

    public static List<ResourceTag> GetTags() => new()
    {
        new ResourceTag { Id = 1, Name = "Senolytics", Slug = "senolytics" },
        new ResourceTag { Id = 2, Name = "Clinical Trial", Slug = "clinical-trial" },
        new ResourceTag { Id = 3, Name = "Policy", Slug = "policy" },
        new ResourceTag { Id = 4, Name = "Epigenetic Clock", Slug = "epigenetic-clock" },
        new ResourceTag { Id = 5, Name = "Caloric Restriction", Slug = "caloric-restriction" },
        new ResourceTag { Id = 6, Name = "Rapamycin", Slug = "rapamycin" },
        new ResourceTag { Id = 7, Name = "NAD+", Slug = "nad-plus" },
        new ResourceTag { Id = 8, Name = "Telomerase", Slug = "telomerase" },
        new ResourceTag { Id = 9, Name = "Metformin", Slug = "metformin" },
        new ResourceTag { Id = 10, Name = "Parabiosis", Slug = "parabiosis" },
        new ResourceTag { Id = 11, Name = "Autophagy", Slug = "autophagy" },
        new ResourceTag { Id = 12, Name = "Review Paper", Slug = "review-paper" },
        new ResourceTag { Id = 13, Name = "Foundational", Slug = "foundational" },
        new ResourceTag { Id = 14, Name = "Inflammation", Slug = "inflammation" },
        new ResourceTag { Id = 15, Name = "Microbiome", Slug = "microbiome" },
    };

    public static List<Resource> GetResources() => new()
    {
        new Resource
        {
            Id = 1,
            Title = "Hallmarks of Aging: An Expanding Universe",
            Description = "The landmark 2023 update to the original 2013 hallmarks paper, expanding from 9 to 12 hallmarks. Essential reading for understanding the biological basis of aging.",
            Url = "https://doi.org/10.1016/j.cell.2022.11.001",
            Type = "Paper",
            Difficulty = "Advanced",
            Authors = "López-Otín C, Blasco MA, Partridge L, Serrano M, Kroemer G",
            Year = 2023
        },
        new Resource
        {
            Id = 2,
            Title = "TAME Trial — Targeting Aging with Metformin",
            Description = "The first FDA-approved clinical trial designed to treat aging itself as a condition, using metformin as an intervention. A landmark moment in aging-as-disease advocacy.",
            Url = "https://www.afar.org/tame-trial",
            Type = "ClinicalTrial",
            Difficulty = "Beginner",
            Authors = "Barzilai N et al.",
            Year = 2024
        },
        new Resource
        {
            Id = 3,
            Title = "Senolytics: A Translational Bridge Between Preclinical and Clinical Evidence",
            Description = "Comprehensive review of senolytic compounds (dasatinib, quercetin, fisetin, navitoclax) and their progress from animal models to human trials.",
            Url = "https://doi.org/10.1016/j.ebiom.2023.104596",
            Type = "Paper",
            Difficulty = "Intermediate",
            Authors = "Kirkland JL, Tchkonia T",
            Year = 2023
        },
        new Resource
        {
            Id = 4,
            Title = "Lifespan: Why We Age — and Why We Don't Have To",
            Description = "David Sinclair's accessible book making the case that aging is a disease and presenting the information theory of aging. Great entry point for non-scientists.",
            Url = "https://lifespanbook.com",
            Type = "Book",
            Difficulty = "Beginner",
            Authors = "Sinclair DA, LaPlante MD",
            Year = 2019
        },
        new Resource
        {
            Id = 5,
            Title = "WHO ICD-11 Extension Code XT9T",
            Description = "The World Health Organization's addition of 'Ageing-related' as an extension code in the International Classification of Diseases. A crucial policy precedent.",
            Url = "https://icd.who.int/browse/2024-01/mms/en#411508689",
            Type = "Organization",
            Difficulty = "Beginner",
            Year = 2022
        },
        new Resource
        {
            Id = 6,
            Title = "DNA Methylation Age of Human Tissues and Cell Types",
            Description = "Steve Horvath's foundational paper introducing the epigenetic clock — a biomarker that measures biological age from DNA methylation patterns with unprecedented accuracy.",
            Url = "https://doi.org/10.1186/gb-2013-14-10-r115",
            Type = "Paper",
            Difficulty = "Advanced",
            Authors = "Horvath S",
            Year = 2013
        },
        new Resource
        {
            Id = 7,
            Title = "Rapamycin and the Hallmarks of Aging",
            Description = "Analysis of how rapamycin (mTOR inhibition) addresses multiple hallmarks of aging simultaneously, making it one of the most promising geroprotective compounds.",
            Url = "https://doi.org/10.1111/acel.13846",
            Type = "Paper",
            Difficulty = "Intermediate",
            Authors = "Blagosklonny MV",
            Year = 2023
        },
        new Resource
        {
            Id = 8,
            Title = "The Longevity FAQ",
            Description = "Laura Deming's comprehensive and accessible guide to the science of aging. Covers the major theories, interventions, and open questions in longevity research.",
            Url = "https://www.ldeming.com/longevityfaq",
            Type = "Organization",
            Difficulty = "Beginner",
            Authors = "Deming L"
        },
        new Resource
        {
            Id = 9,
            Title = "In Vivo Reprogramming Leads to Premature Death Linked to Hepatic and Intestinal Failure",
            Description = "Important cautionary research on Yamanaka factor-based epigenetic reprogramming showing the risks alongside the promise. Demonstrates the need for controlled approaches.",
            Url = "https://doi.org/10.1038/s43587-023-00528-5",
            Type = "Paper",
            Difficulty = "Advanced",
            Authors = "Browder KC et al.",
            Year = 2023
        },
        new Resource
        {
            Id = 10,
            Title = "The Economic Value of Targeting Aging",
            Description = "Landmark economic analysis estimating that slowing aging by just 2.2 years would be worth $83 trillion over 50 years — dwarfing the value of curing any single disease.",
            Url = "https://doi.org/10.1038/s43587-021-00080-0",
            Type = "Paper",
            Difficulty = "Intermediate",
            Authors = "Scott AJ, Ellison M, Sinclair DA",
            Year = 2021
        },
        new Resource
        {
            Id = 11,
            Title = "The Geroscience Hypothesis: Is It Possible to Change the Rate of Aging?",
            Description = "Defines the geroscience approach: instead of treating diseases individually, target the shared underlying biology of aging to prevent or delay all age-related conditions.",
            Url = "https://doi.org/10.1007/978-3-319-23246-1_1",
            Type = "Paper",
            Difficulty = "Intermediate",
            Authors = "Sierra F, Kohanski R",
            Year = 2017
        },
        new Resource
        {
            Id = 12,
            Title = "LEV Foundation (formerly SENS Research Foundation)",
            Description = "Research organization focused on developing and promoting rejuvenation biotechnologies — therapies designed to repair the damage of aging at the molecular and cellular level.",
            Url = "https://www.levf.org",
            Type = "Organization",
            Difficulty = "Beginner"
        }
    };

    /// <summary>
    /// Returns (ResourceId, HallmarkId) pairs for the join table.
    /// </summary>
    public static List<(int ResourceId, int HallmarkId)> GetResourceHallmarkLinks() => new()
    {
        // Hallmarks paper → all hallmarks
        (1, 1), (1, 2), (1, 3), (1, 4), (1, 5), (1, 6), (1, 7), (1, 8), (1, 9), (1, 10), (1, 11), (1, 12),
        // TAME → nutrient sensing
        (2, 6),
        // Senolytics review → cellular senescence, inflammation
        (3, 8), (3, 11),
        // Lifespan book → epigenetics, general
        (4, 3), (4, 2),
        // WHO ICD-11 → all (policy)
        (5, 8),
        // Horvath clock → epigenetic alterations
        (6, 3),
        // Rapamycin → nutrient sensing, autophagy, senescence
        (7, 6), (7, 5), (7, 8),
        // Economic value → general
        (10, 8), (10, 9),
        // Geroscience → general
        (11, 6), (11, 7), (11, 8),
        // Reprogramming → epigenetics
        (9, 3),
    };

    /// <summary>
    /// Returns (ResourceId, TagId) pairs for the join table.
    /// </summary>
    public static List<(int ResourceId, int TagId)> GetResourceTagLinks() => new()
    {
        (1, 12), (1, 13),    // Hallmarks paper: review, foundational
        (2, 2), (2, 9),       // TAME: clinical trial, metformin
        (3, 1), (3, 12),      // Senolytics review: senolytics, review
        (4, 13),               // Lifespan: foundational
        (5, 3),                // WHO: policy
        (6, 4), (6, 13),      // Horvath: epigenetic clock, foundational
        (7, 6), (7, 11),      // Rapamycin: rapamycin, autophagy
        (9, 4),                // Reprogramming: epigenetic clock
        (10, 3),               // Economic value: policy
        (11, 12), (11, 13),   // Geroscience: review, foundational
    };
}
