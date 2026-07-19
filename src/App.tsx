import { TopNav } from './nav/TopNav'
import { Hero } from './sections/Hero'
import { Contact } from './sections/Contact'

export default function App() {
  return (
    <>
      <TopNav />
      <main id="main">
        <Hero />
        <Contact />
      </main>
      <footer>
        <p>© 2026 Sandeep Gupta</p>
      </footer>
    </>
  )
}
