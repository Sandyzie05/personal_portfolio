export interface ExperienceRole {
  role: string
  company: string
  location: string
  start: string
  end: string
  achievements: string[]
}

export const experience: ExperienceRole[] = [
  {
    role: 'Senior Site Reliability Engineer',
    company: 'Adobe',
    location: 'Lehi, Utah',
    start: 'May 2021',
    end: 'Present',
    achievements: [
      "Built and scaled Adobe Workfront's Backstage-based Internal Developer Portal for 250+ engineers — a 30-plugin React 18/Node.js platform unifying ArgoCD deployments, Kubernetes rightsizing, Split.io feature flags, SLOs, service maturity, Datadog CCM cost/reliability insights and error-budget health, Vault, Okta SSO, and GitLab CI/CD into a single service-owner view.",
      'Contributed to Cadence, Adobe Workfront\'s Kubernetes/Temporal-based AI agent orchestration platform, adding dependency graph views, automated MR reviews, and cross-provider sub-agent dispatch with isolated pod execution and durable streamed results.',
      'Led zero-downtime ArgoCD sharding for 568 ApplicationSets, 4,200+ Applications, and 252 services, splitting one control plane into 4 shards across 8+ repos and delivering a 15x UI latency improvement (10-30s to p95 under 2s) while maintaining 99%+ sync success and ~3x capacity headroom.',
      'Built Argo Workflows and ArgoCD deployment automation for 1,300+ microservices and migrated 90%+ of services from GitLab CD to ArgoCD, achieving 98.4% deployment success, cutting deployment time by 50-67% through batch orchestration and smart sync optimization, and standardizing GitLab CI/CD templates to 80%+ adoption.',
      'Architected Datadog and Vector log-governance pipelines across multi-region Kubernetes and owned enterprise observability standards for logs, metrics, traces, and RUM, reducing observability spend by 15-20%, raising tagging compliance from 40% to 100%, and driving 80%+ telemetry adoption through reusable Datadog and OpenTelemetry onboarding modules.',
      'Introduced reusable Helm chart standards adopted by 20%+ of services, reducing Kubernetes deployment variance and improving service onboarding consistency.',
    ],
  },
  {
    role: 'Site Reliability Engineer',
    company: 'Carbonite Inc. (An Opentext Company)',
    location: 'Salt Lake City, Utah',
    start: 'Sep 2019',
    end: 'Mar 2021',
    achievements: [
      'Automated infrastructure configuration with Chef, Jenkins, and Git-based CI/CD, improving repeatability across system and application deployments.',
      'Built centralized logging and monitoring platforms using Kubernetes, Kubeadm, Helm, Graylog, Zabbix, SolarWinds, Icinga2, and Dell OpenManage for engineering and support teams.',
    ],
  },
  {
    role: 'System Engineer',
    company: 'Workfront',
    location: 'Lehi, Utah',
    start: 'Nov 2018',
    end: 'Jun 2019',
    achievements: [
      'Built AWS-based CI/CD and platform infrastructure using GitLab, Jenkins, TravisCI, Terraform, Kubernetes, Artifactory, Nginx Ingress, Cert Manager, Consul, and Vault.',
      'Automated security and infrastructure workflows using Python, AWS Lambda, Splunk, GuardDuty, CloudWatch, Slack, Samanage, and Workfront APIs, reducing manual effort for security and infrastructure teams.',
    ],
  },
  {
    role: 'DevOps Intern',
    company: 'Workfront',
    location: 'Lehi, Utah',
    start: 'Jul 2018',
    end: 'Nov 2018',
    achievements: [
      'Developed and managed Python-based automations using AWS Lambda to streamline multiple workflows based on SecurityCenter, Splunk, AWS GuardDuty, AWS CloudWatch, Slack, and Samanage.',
    ],
  },
  {
    role: 'DevOps Intern',
    company: 'Intermountain',
    location: 'West Valley, Utah',
    start: 'Jan 2018',
    end: 'Jul 2018',
    achievements: [
      "Developed patch automation for Windows servers and reusable Ansible configuration to retrieve and renew Let's Encrypt TLS certificates using AWS Route53 for domain validation, and developed and maintained an internal web portal using HTML, CSS, PHP, Laravel, and Azure MS SQL.",
    ],
  },
  {
    role: 'Infrastructure Engineer',
    company: 'BOLD Technology Solutions Pvt. Ltd.',
    location: 'Noida, India',
    start: 'Feb 2016',
    end: 'Jul 2017',
    achievements: [
      'Managed AWS production infrastructure across EC2, Auto Scaling, EBS, S3, Route53, IAM, CloudWatch, and New Relic, and automated infrastructure inventory, health checks, dashboards, and operational reporting with Python, CloudWatch, and New Relic.',
    ],
  },
  {
    role: 'Senior Analyst, Infrastructure',
    company: 'HCL Technologies',
    location: 'Noida, India',
    start: 'Jun 2013',
    end: 'Jan 2016',
    achievements: [
      'Supported Linux and Windows HA infrastructure, monitoring CPU, memory, disk, and network utilization across virtualized enterprise systems, and managed service requests, health checks, incident workflows, and operational reporting using ServiceNow, HPSM/HPSC, HP OVO, and Informatica.',
    ],
  },
]
