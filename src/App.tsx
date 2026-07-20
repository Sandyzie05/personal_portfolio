import { TopNav } from './nav/TopNav'
import { Hero } from './sections/Hero'
import { About } from './sections/About'
import { Experience } from './sections/Experience'
import { Projects } from './sections/Projects'
import { Skills } from './sections/Skills'
import { Certifications } from './sections/Certifications'
import { Education } from './sections/Education'
import { Testimonials } from './sections/Testimonials'
import { Contact } from './sections/Contact'

export default function App() {
  return (
    <>
      <TopNav />
      <main id="main">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Certifications />
        <Education />
        <Testimonials />
        <Contact />
      </main>
      <footer>
        <p>© 2026 Sandeep Gupta</p>
      </footer>
    </>
  )
}
