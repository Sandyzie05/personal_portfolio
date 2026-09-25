export interface SkillCategory {
  category: string
  items: string[]
}

export const skills: SkillCategory[] = [
  {
    category: 'Software Engineering',
    items: ['Python', 'TypeScript', 'React', 'Node.js', 'FastAPI', 'REST APIs', 'PostgreSQL'],
  },
  {
    category: 'Reliability & Operations',
    items: ['Kubernetes', 'Linux', 'SRE', 'SLOs', 'Incident response', 'Capacity planning'],
  },
  {
    category: 'Platforms & Delivery',
    items: ['AWS', 'Azure', 'GCP', 'Terraform', 'Ansible', 'Helm', 'GitLab CI/CD', 'Argo CD'],
  },
  {
    category: 'Applied AI & Observability',
    items: ['LLM applications', 'Agent workflows', 'RAG', 'MCP', 'Ollama', 'Evals', 'Datadog', 'OpenTelemetry'],
  },
]
