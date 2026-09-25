export interface Project {
  name: string
  kind: string
  description: string
  tags: string[]
  repoUrl: string
}

export const projects: Project[] = [
  {
    name: 'Personal AI Vault',
    kind: 'Privacy-first AI',
    description:
      'A local-first assistant that combines encrypted personal-data storage, document understanding, structured extraction, and grounded chat without sending private content to a hosted model.',
    tags: ['Python', 'Ollama', 'RAG', 'ChromaDB', 'Streamlit'],
    repoUrl: 'https://github.com/Sandyzie05/personal_ai',
  },
  {
    name: 'Stock Research System',
    kind: 'Evidence-backed AI',
    description:
      'A research platform that connects market movement to news and filings, captures source quality, and audits predictions against later outcomes instead of hiding uncertainty.',
    tags: ['Python', 'FastAPI', 'PostgreSQL', 'Local LLMs'],
    repoUrl: 'https://github.com/Sandyzie05/stock_predictor',
  },
  {
    name: 'CBSE AI Tutor',
    kind: 'Grounded learning',
    description:
      'A corpus-aware tutoring system built around official textbooks, hybrid retrieval, subject isolation, streaming answers, quizzes, and explicit source boundaries.',
    tags: ['Python', 'FastAPI', 'Qdrant', 'RAG', 'Ollama'],
    repoUrl: 'https://github.com/Sandyzie05/cbse_tutor',
  },
  {
    name: 'Touch-first Retail CRM',
    kind: 'Desktop product',
    description:
      'An offline-first POS and CRM desktop app with GST-aware billing, reporting, backups, and a large-target interface designed for day-to-day counter use.',
    tags: ['Tauri', 'React', 'TypeScript', 'Rust', 'SQLite'],
    repoUrl: 'https://github.com/Sandyzie05/acksync_crm_lmb',
  },
  {
    name: 'CompliOS',
    kind: 'Workflow software',
    description:
      'A full-stack compliance workspace that turns multi-step regulatory work into traceable company, director, task, and filing workflows.',
    tags: ['FastAPI', 'PostgreSQL', 'React', 'Docker'],
    repoUrl: 'https://github.com/Sandyzie05/compliOS',
  },
  {
    name: 'Jagdamba Automobiles',
    kind: 'Commerce platform',
    description:
      'An image-led storefront and lightweight admin workflow for a motorcycle-parts retailer, designed for simple shared-hosting deployment.',
    tags: ['React', 'TypeScript', 'Vite', 'Node.js'],
    repoUrl: 'https://github.com/Sandyzie05/jagdamba_automobiles',
  },
]
