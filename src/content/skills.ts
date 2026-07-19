export interface SkillCategory {
  category: string
  items: string[]
}

export const skills: SkillCategory[] = [
  {
    category: 'Operating Systems',
    items: ['Unix', 'Linux (Ubuntu)', 'Linux (RHEL)', 'Linux (CentOS)', 'Windows'],
  },
  {
    category: 'Programming & Scripting',
    items: ['Python', 'Bash', 'JavaScript', 'React', 'TypeScript'],
  },
  {
    category: 'Web Services',
    items: ['Nginx', 'Kong', 'Traefik', 'Apache', 'IIS'],
  },
  {
    category: 'Database',
    items: ['MySQL', 'Postgres', 'MongoDB'],
  },
  {
    category: 'IaC',
    items: ['Terraform', 'Ansible', 'Chef', 'Vagrant'],
  },
  {
    category: 'GitOps',
    items: ['ArgoCD', 'Argo Workflows', 'Argo Rollouts'],
  },
  {
    category: 'DevOps Tools',
    items: ['Docker', 'Kubernetes', 'Helm', 'Artifactory', 'GitLab', 'Git', 'Jenkins'],
  },
  {
    category: 'Observability',
    items: ['Datadog', 'OpenTelemetry', 'OTEL Collector', 'Vector', 'Splunk', 'Graylog'],
  },
  {
    category: 'Cloud Technologies',
    items: ['AWS', 'Azure', 'GCP'],
  },
  {
    category: 'AI Tools and Frameworks',
    items: ['Cursor', 'Claude', 'Ollama', 'Exo', 'RAG', 'MCP'],
  },
]
