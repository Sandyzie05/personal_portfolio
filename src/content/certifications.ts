export interface Certification {
  name: string
  issuer: string
  href: string
}

export const certifications: Certification[] = [
  {
    name: 'PCAP – Certified Associate Python Programmer',
    issuer: 'Python Institute',
    href: 'https://pythoninstitute.org/pcap',
  },
  {
    name: 'Certified Jenkins Engineer',
    issuer: 'CloudBees',
    href: 'https://www.cloudbees.com/jenkins/certification',
  },
  {
    name: 'Solutions Architect – Associate',
    issuer: 'Amazon Web Services',
    href: 'https://aws.amazon.com/certification/certified-solutions-architect-associate/',
  },
  {
    name: 'Azure Fundamentals',
    issuer: 'Microsoft',
    href: 'https://learn.microsoft.com/credentials/certifications/azure-fundamentals/',
  },
  {
    name: 'ITIL V3 Foundation',
    issuer: 'PeopleCert',
    href: 'https://www.peoplecert.org/',
  },
  {
    name: 'Datadog Certification',
    issuer: 'Datadog',
    href: 'https://www.datadoghq.com/certification/overview/',
  },
]
