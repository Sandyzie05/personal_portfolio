import { TopNav } from './nav/TopNav'
import { Hero } from './sections/Hero'
import { About } from './sections/About'
import { Experience } from './sections/Experience'
import { Skills } from './sections/Skills'
import { Contact } from './sections/Contact'

export default function App() {
  return (
    <>
      <TopNav />
      <main id="main">
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Contact />
      </main>
      <footer>
        <p>© 2026 Sandeep Gupta</p>
      </footer>
    </>
  )
}
