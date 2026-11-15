export interface Badge {
  id: string;
  caseNumber: number;
  title: string;
  concept: string;
  icon: string;
  description: string;
  color: string;
}

export const BADGES: Badge[] = [
  { id: 'b-1', caseNumber: 1, title: 'Junior Data Collector', concept: 'Data Collection & Organization', icon: 'Database', description: 'Structured raw witness fragments into a rigorous schema table.', color: '#3b82f6' },
  { id: 'b-2', caseNumber: 2, title: 'Filter Specialist', concept: 'Sorting & Multi-Attribute Filtering', icon: 'Filter', description: 'Applied compound Boolean queries to isolate the bank vault robber.', color: '#0ea5e9' },
  { id: 'b-3', caseNumber: 3, title: 'De-Duplication Specialist', concept: 'Duplicate Data Cleaning', icon: 'Copy', description: 'Eliminated sensor bounce duplicates and discovered an impossible RFID clone.', color: '#06b6d4' },
  { id: 'b-4', caseNumber: 4, title: 'Data Reconstruction Expert', concept: 'Missing Value Imputation', icon: 'FileQuestion', description: 'Imputed null sensor telemetry to reconstruct the laser blackout window.', color: '#10b981' },
  { id: 'b-5', caseNumber: 5, title: 'Frequency Analyst', concept: 'Frequency Distribution & Aggregations', icon: 'BarChart', description: 'Aggregated weekend access frequency counts to expose server espionage.', color: '#84cc16' },
  { id: 'b-6', caseNumber: 6, title: 'Statistical Pioneer', concept: 'Mean vs Median vs Mode', icon: 'Calculator', description: 'Demonstrated outlier sensitivity on radar speeds and isolated the true getaway median.', color: '#eab308' },
  { id: 'b-7', caseNumber: 7, title: 'Outlier Hunter', concept: 'IQR & Outlier Fences', icon: 'AlertTriangle', description: 'Calculated Tukey boxplot fences to detect a hidden $84.5k wire fraud.', color: '#f97316' },
  { id: 'b-8', caseNumber: 8, title: 'Causality Investigator', concept: 'Correlation vs Causation', icon: 'GitCompare', description: 'Debunked spurious ice cream correlation and proved grid tampering causality.', color: '#ef4444' },
  { id: 'b-9', caseNumber: 9, title: 'Cluster Detective', concept: 'K-Means Clustering', icon: 'Layers', description: 'Partitioned 12 coordinates into 3 smuggling rings and unmasked the kingpin.', color: '#8b5cf6' },
  { id: 'b-10', caseNumber: 10, title: 'Visualization Auditor', concept: 'Data Visualization Ethics', icon: 'Eye', description: 'Corrected a truncated Y-axis to reveal a catastrophic 400% pollution surge.', color: '#ec4899' },
  { id: 'b-11', caseNumber: 11, title: 'Machine Learning Pioneer', concept: 'Supervised ML & Classification', icon: 'Cpu', description: 'Trained a decision tree on historical features to predict tonight’s heist venue.', color: '#6366f1' },
  { id: 'b-12', caseNumber: 12, title: 'Sampling Integrity Auditor', concept: 'Sampling Bias & Stratification', icon: 'PieChart', description: 'Exposed convenience sampling bias and identified the true hit-and-run SUV.', color: '#14b8a6' },
  { id: 'b-13', caseNumber: 13, title: 'Generalization Master', concept: 'Overfitting & Polynomial Complexity', icon: 'TrendingUp', description: 'Tuned model complexity from Degree 8 to Degree 2 to catch the intruder.', color: '#f43f5e' },
  { id: 'b-14', caseNumber: 14, title: 'Tradeoff Architect', concept: 'The Bias-Variance Tradeoff', icon: 'Sliders', description: 'Located the optimal capacity sweet spot to defeat biometric forgery.', color: '#a855f7' },
  { id: 'b-15', caseNumber: 15, title: 'Master Detective & Data Scientist', concept: 'End-to-End Data Science Pipeline', icon: 'Award', description: 'Executed the complete 5-stage Data Science lifecycle to convict The Cipher.', color: '#d97706' }
];

export const RANKS = [
  { rank: 'Junior Detective', minCases: 0, maxCases: 3, desc: 'Starting your investigative journey with data collection and cleaning.' },
  { rank: 'Field Investigator', minCases: 4, maxCases: 7, desc: 'Proficient in frequency analysis, imputation, and foundational statistics.' },
  { rank: 'Senior Investigator', minCases: 8, maxCases: 11, desc: 'Mastering outliers, correlation analysis, clustering, and ethical visualization.' },
  { rank: 'Chief Detective', minCases: 12, maxCases: 14, desc: 'Advanced practitioner in machine learning classification, bias, and variance.' },
  { rank: 'Master Detective', minCases: 15, maxCases: 15, desc: 'Grandmaster of the complete end-to-end Data Science investigative pipeline!' }
];
