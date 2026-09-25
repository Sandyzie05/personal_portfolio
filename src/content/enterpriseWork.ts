export interface EnterpriseWorkItem {
  title: string
  discipline: string
  summary: string
  outcomes: string[]
}

export const enterpriseWork: EnterpriseWorkItem[] = [
  {
    title: 'AI agent operations',
    discipline: 'Applied AI · Developer Experience',
    summary:
      'Helped shape a chat-driven engineering assistant that routes requests to reusable skills and isolated workers, with deliberate safety boundaries, recovery paths, and production telemetry.',
    outcomes: ['Skill and evaluation patterns', 'Sandboxed task execution', 'Cost, trace, and failure observability'],
  },
  {
    title: 'GitOps at enterprise scale',
    discipline: 'SRE · Platform Engineering',
    summary:
      'Led platform changes that spread deployment load across independent control planes while keeping source-of-truth ownership, rollout safety, and service-team workflows intact.',
    outcomes: ['Zero-downtime migration strategy', 'Automated shard assignment', 'Safer progressive delivery'],
  },
  {
    title: 'Self-service delivery platform',
    discipline: 'Software Engineering · DevOps',
    summary:
      'Built and evolved shared delivery capabilities that connect service ownership, CI/CD, infrastructure access, cost signals, and reliability feedback into clearer developer workflows.',
    outcomes: ['Reusable delivery standards', 'Faster service onboarding', 'Actionable reliability and cost signals'],
  },
]
