import { TopNav } from './nav/TopNav'
import { Hero } from './sections/Hero'
import { Practice } from './sections/Practice'
import { EnterpriseWork } from './sections/EnterpriseWork'
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
        <Practice />
        <EnterpriseWork />
        <Projects />
        <Experience />
        <Skills />
        <About />
        <div className="credentials-grid">
          <Education />
          <Certifications />
        </div>
        <Testimonials />
        <Contact />
      </main>
      <footer className="site-footer">
        <p>© 2026 Sandeep Gupta</p>
        <p>Built with intent. Operated with care.</p>
        <a href="#hero">Back to top ↑</a>
      </footer>
    </>
  )
}
