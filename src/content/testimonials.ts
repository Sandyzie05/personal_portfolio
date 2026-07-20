export interface Testimonial {
  quote: string
  name: string
  title: string
}

export const testimonials: Testimonial[] = [
  {
    quote:
      'Sandeep is an amazing colleague. He is filled with outstanding leadership qualities. His attitude towards work and his co-workers is commendable. He is strong in will power to take the very first step to change the monotonous system.',
    name: 'Ankit Agnihotri',
    title: 'Senior Site Reliability Engineer, Adobe',
  },
  {
    quote:
      'Sandeep has great passion to learn and fulfill his responsibilities to the best of his ability. While working on my team, he never ceased to give 100 percent effort until the task or project was complete.',
    name: 'Nathan Stewart',
    title: 'Lead DevOps Engineer, Five9',
  },
  {
    quote:
      'Sandeep is one of the most motivated and hardworking engineers I know. I never had to worry about his daily work or projects. He owned his work completely and consistently met deadlines and provided excellent communication and support to our internal customers. He invested many hours of his personal time to research and learn new technologies to help him succeed. It was an honor to work with Sandeep.',
    name: 'Rebecca Cengiz-Robbs',
    title: 'IT Infrastructure & Project Management Professional',
  },
]
