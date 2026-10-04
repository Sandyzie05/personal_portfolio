export interface ContactContent {
  email: string
  linkedin: string
  github: string
  resumeHref: string
  resumeDownloadName: string
}

export const contact: ContactContent = {
  email: 'sandeepgupta050890@gmail.com',
  linkedin: 'https://www.linkedin.com/in/sandeepguptauou17/',
  github: 'https://github.com/Sandyzie05',
  resumeHref: `${import.meta.env.BASE_URL}resume.pdf`,
  resumeDownloadName: 'Sandeep_Gupta_Resume.pdf',
}
