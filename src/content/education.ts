export interface EducationEntry {
  institution: string
  degree: string
  date: string
  href: string
}

export const education: EducationEntry[] = [
  {
    institution: 'University of Utah',
    degree: 'Master of Science in Information Systems',
    date: 'Aug 2018',
    href: 'https://www.utah.edu/',
  },
  {
    institution: 'Uttar Pradesh Technical University',
    degree: 'Bachelor of Technology in Computer Science & Engineering',
    date: 'Jun 2013',
    href: 'https://aktu.ac.in/',
  },
]
