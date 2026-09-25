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
      'Build developer platforms and AI-assisted operational workflows that connect delivery, infrastructure, reliability, and cost signals into self-service experiences.',
      'Led a zero-downtime Argo CD scaling program, distributing a large GitOps estate across multiple control planes while preserving source-of-truth ownership and deployment continuity.',
      'Created reusable CI/CD, Helm, Terraform, and observability standards that reduce platform variance and make new capabilities easier for service teams to adopt.',
      'Apply SRE practices to AI systems through evaluation, sandboxing, traceability, cost visibility, failure monitoring, and clear human approval boundaries.',
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
