import type { PortfolioData } from '../types/portfolio';

export const AUTHORIZED_ADMIN_EMAIL = 'avadheshsahani487@gmail.com';

export const INITIAL_PORTFOLIO_DATA: PortfolioData = {
  profile: {
    name: 'Avadhesh Sahani',
    title: 'Entry-Level Data Analyst',
    headline: 'Data Analyst | Power BI | Advanced Excel | SQL | Python',
    heroHeading: 'Turning Data Into Meaningful Insights.',
    summary:
      'Entry-Level Data Analyst skilled in Power BI, Advanced Excel, SQL, and Python, with hands-on project experience in data analysis and visualization. Experienced in data cleaning, identifying trends, and creating interactive dashboards to transform raw data into actionable insights.',
    email: 'avadheshsahani487@gmail.com',
    photoUrl: '/assets/aistudio/file_0000000009f071fa8a13384e92ca876e_2dcc7097.png',
  },
  about: {
    summary:
      'I am an Entry-Level Data Analyst with a Bachelor of Science (B.Sc.) from Deen Dayal Upadhyaya Gorakhpur University and a strong foundation in data cleaning, exploratory data analysis, and visual storytelling. I enjoy working across the analytical workflow—querying relational databases with SQL and PostgreSQL, preparing and exploring datasets in Python and Advanced Excel, and building interactive Power BI dashboards that help stakeholders spot trends clearly.',
    analyticsInterests: [
      'Data cleaning, validation, and transparent reporting of dataset anomalies',
      'Exploratory data analysis (EDA) to surface segment, geographic, and behavioral trends',
      'Querying relational databases using SQL aggregations, CTEs, subqueries, and window functions',
      'Visual storytelling and KPI design with interactive Microsoft Power BI dashboards',
    ],
    technicalCapabilities: [
      'Data preparation & profiling with Python (Pandas, NumPy, Matplotlib) and Power Query',
      'Relational database schema design and analytical querying in PostgreSQL & SQL',
      'Spreadsheet modeling, pivot analysis, and business reporting in Advanced Excel',
      'Multi-page dashboard architecture, DAX measures, and slicer design in Power BI',
    ],
    careerObjective:
      'Seeking an entry-level Data Analyst role where I can apply SQL, Python, Advanced Excel, and Power BI skills to transform raw datasets into accurate, transparent, and actionable business insights.',
  },
  socialLinks: {
    githubUrl: '',
    linkedinUrl: '',
  },
  skills: [
    {
      id: 'skill-power-bi',
      name: 'Power BI',
      description: 'Interactive multi-page dashboards, DAX measures, KPI cards, and synchronized slicers.',
      iconKey: 'bar-chart-3',
    },
    {
      id: 'skill-advanced-excel',
      name: 'Advanced Excel',
      description: 'Data organization, formulas, lookup logic, pivot summaries, and business analytics.',
      iconKey: 'table',
    },
    {
      id: 'skill-sql',
      name: 'SQL',
      description: 'Structured querying using aggregations, filtering, subqueries, CTEs, and window functions.',
      iconKey: 'database',
    },
    {
      id: 'skill-postgresql',
      name: 'PostgreSQL',
      description: 'Typed relational table schemas, precision numeric storage, and analytical business queries.',
      iconKey: 'server',
    },
    {
      id: 'skill-python',
      name: 'Python',
      description: 'End-to-end analytical notebooks for dataset inspection, cleaning, and statistical summaries.',
      iconKey: 'code-2',
    },
    {
      id: 'skill-pandas',
      name: 'Pandas',
      description: 'Tabular data loading, missing-value audits, deduplication, date parsing, and grouping.',
      iconKey: 'layers',
    },
    {
      id: 'skill-numpy',
      name: 'NumPy',
      description: 'Numerical computation and array-level calculations supporting Python data workflows.',
      iconKey: 'sigma',
    },
    {
      id: 'skill-matplotlib',
      name: 'Matplotlib',
      description: 'Exploratory charts, distribution plots, and comparative trend visuals during Python EDA.',
      iconKey: 'line-chart',
    },
    {
      id: 'skill-power-query',
      name: 'Power Query',
      description: 'Repeatable data extraction, transformation, and shaping workflows prior to reporting.',
      iconKey: 'workflow',
    },
    {
      id: 'skill-data-cleaning',
      name: 'Data Cleaning',
      description: 'Duplicate removal, null auditing, imputation validation, and encoding/type standardization.',
      iconKey: 'sparkles',
    },
    {
      id: 'skill-eda',
      name: 'Exploratory Data Analysis',
      description: 'Uncovering skew, segment concentration, outliers, and key patterns before modeling.',
      iconKey: 'search',
    },
    {
      id: 'skill-data-viz',
      name: 'Data Visualization',
      description: 'Selecting clear chart encodings—bar, donut, treemap, and trend lines—for stakeholder clarity.',
      iconKey: 'pie-chart',
    },
    {
      id: 'skill-dashboard-dev',
      name: 'Dashboard Development',
      description: 'Cohesive executive layouts connecting raw SQL/CSV outputs to interactive visual exploration.',
      iconKey: 'layout-dashboard',
    },
  ],
  projects: [
    {
      id: 'project-ecommerce',
      title: 'E-commerce Data Analysis',
      shortDescription:
        'Analyzed 950 customer records across 52 countries using Python, PostgreSQL, and Power BI to uncover revenue concentration, segment behavior, and pipeline data integrity issues.',
      overview:
        'This project examines an e-commerce customer dataset of 950 cleaned records (derived from 959 raw rows after removing 9 duplicates) across 10 columns and 52 countries, including an "Unknown" group of 25 records. Python (Pandas, NumPy) was used for data cleaning, PostgreSQL (table ecommerce_data) for 7 analytical SQL queries, and Power BI Desktop for an interactive dashboard.',
      tools: ['Python', 'PostgreSQL', 'SQL', 'Power BI'],
      screenshots: [
        {
          id: 'ecom-ss-1',
          url: '/assets/aistudio/2026-11-15__1__688b9b8f.png',
          caption: 'Power BI E-commerce Analytics Dashboard — KPI cards, country charts, customer segments, and top spenders',
        },
      ],
      metrics: [
        { label: 'Total Customers', value: '950', note: 'Across 52 countries' },
        { label: 'Total Revenue', value: '$97,933.17', note: 'Verified CSV & SQL total' },
        { label: 'Avg. Spend / Customer', value: '$103.09', note: 'Paying customers avg $379.59' },
        { label: 'Paying Customers', value: '27.2%', note: '258 paid · 692 at $0.00' },
      ],
      analysisBlocks: [
        {
          heading: 'Customer & Spending Analysis',
          summary:
            'Spending is heavily skewed: 692 customers (72.8%) recorded $0.00 spend (median $0.00), while 258 paying customers (27.2%) averaged $379.59—over 3.6× the overall mean of $103.09.',
          points: [
            '228 customers (24.0% of base) spent above the $103.09 mean.',
            'Top 10% (95 accounts) generate roughly 71% of the $97,933.17 total revenue.',
            'Top 5 Premium spenders total $10,750.36 (11.0% of revenue): Felix Chen ($2,651.55, South Korea), Carlos Santos ($2,570.82, UK), Sophie Allen ($1,970.55, Israel), Sofia Choi ($1,907.44, Chile), and William Ali ($1,650.00, Colombia).',
            'Verified gender split across all 950 records: Male 453 (47.68%, $51,513.04 total), Female 420 (44.21%, $36,299.17), Unknown 30 (3.16%), Non-Binary 27 (2.84%), Prefer Not To Say 20 (2.11%).',
          ],
        },
        {
          heading: 'Country-wise & Category Analysis',
          summary:
            'Customer volume and revenue diverge across 52 countries and 16 product categories in the verified CSV and PostgreSQL outputs.',
          points: [
            'Top countries by customer count (SQL/CSV): Bangladesh (28), Thailand (26), Kenya (25), Belgium (25), Unknown (25), Turkey (24), Pakistan (23), Denmark (23).',
            'Top countries by revenue (SQL/CSV): Sweden ($5,269.73), Austria ($4,015.77), Bangladesh ($3,727.97), Japan ($3,513.96), and Turkey ($3,448.81).',
            'Computers & Accessories leads in customer count (72), while Electronics leads in category revenue ($7,950.37 across 52 customers).',
          ],
        },
        {
          heading: 'Customer Segmentation & Revenue Concentration',
          summary:
            'Regular and Premium segments represent 28.4% of the customer base yet drive 88.2% of total revenue.',
          points: [
            'Regular Customer: 255 users (26.8% base) · $65,098.70 revenue (66.5% share) · $255.29 avg spend.',
            'Premium Customer: 15 users (1.6% base) · $21,262.63 revenue (21.7% share) · $1,417.51 avg spend.',
            'At-Risk Customer: 28 users (2.9% base) · $10,588.45 revenue (10.8% share) · $378.16 avg spend.',
            'Unknown: 18 users (1.9% base) · $983.39 revenue (1.0% share) · $54.63 avg spend.',
            'New Customer (571 users, 60.1% base) and Dormant Customer (63 users, 6.6% base) both have $0.00 recorded spend.',
          ],
        },
      ],
      discrepancies: [
        'Python Imputation Bug: Calling .mean() outside fillna() overwrote all 950 rows with uniform Customer_Age (46.65) and Total_Orders (1.4), causing Power BI Total Orders KPI to display 1.33K (950 × 1.4).',
        'Country Ranking Mismatch in Screenshot: The Power BI screenshot shows Thailand (26) first by customers and UK ($3.1K) / US ($2.8K) first by revenue, whereas verified CSV/SQL totals rank Bangladesh (28) first by customers and Sweden ($5,269.73) first by revenue.',
        'Filtered Gender Pie Chart: The Power BI Gender visual displays 2 (40%) and 3 (60%)—reflecting an active 5-row filter—rather than the full 950-record SQL distribution.',
        'SQL Script Technical Notes: Query 5 used integer division (truncating 47.68% to 47.00); Query 6 contained a leftover ORDER BY line; Query 7 used misleading alias total_order instead of total_customers.',
        'Dashboard Visual Labels: Screenshot contains label typos ("Anylistics Dasbord", "Avarage_Spending", "Tp 5 Customers", "Total Revenu").',
      ],
      githubUrl: '',
      reportUrl: '/assets/aistudio/ecommerce_analysis_reports_d48b36e8.pdf',
      visible: true,
    },
    {
      id: 'project-ai-usage',
      title: 'AI Usage Analysis',
      shortDescription:
        'Explored 141 AI tool users across 12 countries using Python and Power BI to compare platform adoption, daily engagement hours, stated purposes, and demographic segments.',
      overview:
        'This project examines how 141 individuals in the AI_Usage_trend.csv dataset (19 columns, 0 duplicate rows, 6 missing cells imputed) adopt AI tools, which platforms they prefer, their stated usage purposes, and how usage varies by country, gender, age group, and education level.',
      tools: ['Python', 'Power BI'],
      screenshots: [
        {
          id: 'ai-ss-1',
          url: '/assets/aistudio/AI_Usage_Analysis_2a0268ab.png',
          caption: 'Power BI AI Usage Analysis Dashboard — Tool adoption, country breakdown, gender split, purpose donut, age engagement, and education levels',
        },
      ],
      metrics: [
        { label: 'Total Users', value: '141', note: '12 countries · 0 duplicates' },
        { label: 'Avg. Daily AI Use', value: '2.97 hrs', note: 'Rounded to 3.00 in KPI card' },
        { label: 'Top Adopted Tool', value: 'ChatGPT (61)', note: '43.3% of sample users' },
        { label: 'Leading Country', value: 'India (24)', note: '17.0% of dataset users' },
      ],
      analysisBlocks: [
        {
          heading: 'Country-wise & Gender-wise User Analysis',
          summary:
            'The 141-user dataset spans 12 countries with balanced male and female representation.',
          points: [
            'Top countries by user count: India (24, 17.0%), Canada (16), United States (15), Pakistan (14), Philippines (14), United Kingdom (13), Brazil (12), Australia (11), Nigeria (8), France (6), Germany (5), and Kenya (3).',
            'Gender distribution: Male 72 users (51.1%), Female 64 users (45.4%), and Other 5 users (3.5%).',
          ],
        },
        {
          heading: 'AI Tool Comparison: Adoption vs. Engagement',
          summary:
            'Popularity by user count and daily engagement time measure distinct behaviors in this sample.',
          points: [
            'User counts by tool: ChatGPT (61, 43.3%), Google Gemini (20), Microsoft Copilot (19), Claude (12), Grammarly (9), Perplexity AI (9), Meta AI (8), and DeepSeek (3).',
            'Average daily usage among top 5 tools by mean hours: Google Gemini ranks highest (~3.84 hrs/day), followed by Microsoft Copilot (3.00), Claude (2.93), ChatGPT (2.92), and DeepSeek (2.63).',
          ],
        },
        {
          heading: 'Usage Purpose, Education & Age Segments',
          summary:
            'Coding is the leading stated purpose in the dataset, while Bachelor’s-level users form the largest education segment.',
          points: [
            'Stated AI purposes (full 141-user dataset): Coding (41, 29.1%), Research (22, 15.6%), Writing (22, 15.6%), Studying (17, 12.1%), Content Creation (13, 9.2%), Data Analysis (12, 8.5%), Customer Support (11, 7.8%), Office Work (3, 2.1%).',
            'Education distribution: Bachelor’s (35), Master’s (32), Undergraduate (31), High School (24), Diploma (14), PhD (5).',
            'Self-reported averages across 141 users: Productivity score 5.17, Accuracy rating 3.41, Satisfaction score 6.08, Weekly time saved 6.05 hrs.',
          ],
        },
      ],
      discrepancies: [
        'KPI Rounding: Power BI KPI displays Average hours = 3.00 (rounded to 2 decimals) while the calculated dataset mean is 2.97 hrs/day.',
        'Dashboard Visual Scope vs. Full Dataset: In the Power BI screenshot, the Purpose donut chart displays 76 total across 5 shown categories (Research 22, Writing 22, Studying 17, Data Analysis 12, Office Work 3), and Age_Group bars show 10–19 (4.0), 20–29 (3.0), 40–49 (3.0), 50+ (3.0) rather than the unrounded Python EDA group averages (50+: 5.97 hrs across 6 users; 10–19: 3.58 hrs; 20–29: 2.78 hrs).',
        'Sample & Extreme Values: Small subgroups (PhD: 5, Other gender: 5, Age 50+: 6) and unremoved extreme values (up to 23 daily AI hours and age 97) affect small-group averages.',
      ],
      githubUrl: '',
      reportUrl: '/assets/aistudio/AI_Usage_Analysis_Report_7b323570.pdf',
      visible: true,
    },
    {
      id: 'project-smartphone',
      title: 'Smartphone Market Analysis',
      shortDescription:
        'Queried 915 device records across 18 companies in PostgreSQL and designed a 2-page Power BI report analyzing brand representation, RAM, battery capacity, and India launch-year pricing.',
      overview:
        'This project analyzes a dataset of 915 device records (908 distinct model_name values across 18 companies and 15 columns, including both smartphones and tablets) using PostgreSQL queries and a two-page Power BI report: Page 1 (Mobile Market Analysis) and Page 2 (Smartphone Market Analytics).',
      tools: ['SQL', 'PostgreSQL', 'Power BI'],
      screenshots: [
        {
          id: 'phone-ss-1',
          url: '/assets/aistudio/Smartphone_Analysis-1_33b0361e.png',
          caption: 'Page 1 — Mobile Market Analysis: Brand model counts, India price trend by launch year, and highest RAM by company',
        },
        {
          id: 'phone-ss-2',
          url: '/assets/aistudio/Smartphone_Analysis-2_9c22f202.png',
          caption: 'Page 2 — Smartphone Market Analytics: 908 distinct models, 18 companies, 7.79 GB avg RAM, and max battery capacity by brand',
        },
      ],
      metrics: [
        { label: 'Dataset Records', value: '915', note: '908 distinct model names' },
        { label: 'Companies', value: '18', note: 'Phones & tablet models' },
        { label: 'Average RAM', value: '7.79 GB', note: 'Range: 1 GB to 16 GB' },
        { label: 'Avg. India Price', value: '₹51,070', note: 'Avg battery: 5,030 mAh' },
      ],
      analysisBlocks: [
        {
          heading: 'Brands & Company-wise Comparison',
          summary:
            '18 manufacturers are represented across the 915 records, with Oppo, Apple, Honor, Samsung, and Vivo holding the largest record counts.',
          points: [
            'Top companies by CSV record count: Oppo (115), Apple (97), Honor (91), Samsung (88), Vivo (86), Realme (69), Motorola (62), Infinix (55), OnePlus (53), Huawei (42).',
            'Companies with largest average screen size: iQOO (11.87" across 3 tablet-sized records), Honor (8.06"), Realme (7.43"), Samsung (7.33"), Huawei (7.17").',
          ],
        },
        {
          heading: 'RAM & Battery Capacity Analysis',
          summary:
            'RAM spans 1 GB to 16 GB (mean 7.79 GB), while battery capacity averages 5,030 mAh (range 2,000 to 11,200 mAh).',
          points: [
            '9 brands reach the 16 GB maximum RAM tier: Google, Honor, Huawei, Lenovo, OnePlus, Oppo, Realme, Vivo, and Xiaomi.',
            'Among the 13 brands with >10 records and >6 GB avg RAM, Xiaomi leads at 10.52 GB, followed by Huawei (9.71 GB), Oppo (9.43 GB), and OnePlus (9.43 GB).',
            'Highest battery capacities belong to tablet models included in the dataset: Samsung Galaxy Tab S9 Ultra / S8 Ultra (11,200 mAh), OnePlus Pad Pro (11,000 mAh), Honor MagicPad 2 / Pad GT Pro / MagicPad 3 (10,500 mAh), and Apple iPad Pro 13-inch (10,307 mAh).',
          ],
        },
        {
          heading: 'Price & Launch-Year Analysis (India INR)',
          summary:
            'India listed prices are complete across all 915 records (mean ₹51,070), spanning launch years 2014–2025.',
          points: [
            'Top 5 highest-priced India models are Huawei foldables: Mate XT 512GB (₹274,999), Mate XT 256GB (₹259,999), Mate X2 (₹249,999), Mate X3 (₹249,999), and Mate X6 (₹249,999).',
            'Page 1 launch-year line chart (2020–2025) displays average India prices: 51.7K (2020), 44.5K (2021), 49.7K (2022), and 37.7K (2025); across 2014–2025 in the CSV, averages rose from <₹15,000 in 2014 to >₹56,000 in 2018.',
          ],
        },
      ],
      discrepancies: [
        'Weight KPI Label Mismatch: Page 1 KPI card labelled max_Weight(G) displays 135, which is actually the CSV minimum weight (135 g), whereas the maximum weight in the dataset is 732 g.',
        'Model Count vs. Row Count: Page 2 displays Total_Models = 908 (distinct model_name count) while the source CSV contains 915 total rows.',
        'Page 1 Slicer & Chart Counts: Page 1 shows company counts (e.g., Apple 62, Oppo 55) that differ from raw CSV totals due to active slicer selection or distinct-model aggregation.',
        'SQL Script Validation: CREATE TABLE defines price_india while queries 2 and 6 reference price_india_inr; the final battery query sorts ascending (ORDER BY battery_mah) rather than DESC for top-10 highest-capacity devices.',
      ],
      githubUrl: '',
      reportUrl: '/assets/aistudio/Smartphone_Market_Analysis_Project_Report_aafee0e2.pdf',
      visible: true,
    },
  ],
  education: [
    {
      id: 'edu-bsc',
      qualification: 'Bachelor of Science (B.Sc.)',
      institution: 'Deen Dayal Upadhyaya Gorakhpur University, Gorakhpur',
      details:
        'Completed undergraduate science curriculum providing a quantitative and analytical foundation for data cleaning, exploratory data analysis, SQL querying, and business intelligence reporting.',
    },
  ],
  certificates: [
    {
      id: 'cert-excel',
      name: 'Business Analytics with Excel',
      issuingOrganization: '',
      issueDate: '',
      imageUrl: null,
    },
    {
      id: 'cert-powerbi',
      name: 'Data Visualization with Power BI',
      issuingOrganization: '',
      issueDate: '',
      imageUrl: null,
    },
    {
      id: 'cert-python',
      name: 'Python for Data Analysis',
      issuingOrganization: '',
      issueDate: '',
      imageUrl: null,
    },
    {
      id: 'cert-sql',
      name: 'SQL – HackerRank',
      issuingOrganization: '',
      issueDate: '',
      imageUrl: null,
    },
  ],
  resume: {
    fileName: 'Avadhesh_Sahani_Resume.pdf',
    fileUrl: '/assets/aistudio/Avadhesh_Sahani_Resume__1__e34e4573.pdf',
    updatedAt: 'Supplied Resume Asset',
  },
  settings: {
    sectionVisibility: {
      about: true,
      skills: true,
      projects: true,
      education: true,
      certificates: true,
      resume: true,
      contact: true,
    },
    footerTagline: 'Data Analyst · Power BI · Advanced Excel · SQL · Python',
    footerNote: 'Turning raw datasets into clear, transparent, and actionable visual insights.',
  },
};
