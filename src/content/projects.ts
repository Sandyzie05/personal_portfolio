export interface Project {
  name: string
  description: string
  tags: string[]
  repoUrl: string
}

export const projects: Project[] = [
  {
    name: 'acksync',
    description:
      'Self-hosted single-page marketing site for ACKSYNC INFOTECH featuring a light/dark theme system, Framer Motion animations, and a backend-free mailto contact flow.',
    tags: ['React', 'TypeScript', 'Vite', 'Tailwind CSS'],
    repoUrl: 'https://github.com/Sandyzie05/acksync',
  },
  {
    name: 'acksync_crm_lmb',
    description:
      'Cross-platform offline-first POS and CRM desktop app for a retail sweet shop, with GST-compliant billing, a touch-friendly UI, and local SQLite storage.',
    tags: ['Tauri 2', 'React', 'TypeScript', 'Rust', 'SQLite'],
    repoUrl: 'https://github.com/Sandyzie05/acksync_crm_lmb',
  },
  {
    name: 'stock_predictor',
    description:
      'FastAPI backend for evidence-linked stock research, mapping market moves to news and filings with an AI-infrastructure theme tracker and self-auditing prediction-accuracy reports.',
    tags: ['Python', 'FastAPI', 'PostgreSQL', 'Docker'],
    repoUrl: 'https://github.com/Sandyzie05/stock_predictor',
  },
  {
    name: 'jagdamba_automobiles',
    description:
      'React storefront and admin platform for a motorcycle-parts retailer, with live inventory search, an image-driven parts gallery, and GitHub-API-backed admin publishing.',
    tags: ['React', 'TypeScript', 'Vite', 'Node.js'],
    repoUrl: 'https://github.com/Sandyzie05/jagdamba_automobiles',
  },
  {
    name: 'cbse_tutor',
    description:
      'Multi-agent RAG chatbot teaching the CBSE Grade 5 curriculum, pairing each subject with its own dedicated AI agent and an isolated knowledge base built from official textbooks.',
    tags: ['Python', 'FastAPI', 'Ollama', 'ChromaDB'],
    repoUrl: 'https://github.com/Sandyzie05/cbse_tutor',
  },
  {
    name: 'compliOS',
    description:
      'Full-stack compliance workflow platform for Chartered Accountant firms, tracking companies, directors, and multi-step regulatory filings through a REST API and React UI.',
    tags: ['FastAPI', 'PostgreSQL', 'React', 'Docker'],
    repoUrl: 'https://github.com/Sandyzie05/compliOS',
  },
]
