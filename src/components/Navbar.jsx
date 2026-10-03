import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { EASE } from './Reveal.jsx'

const LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('home')

  // Elevate the bar once the page scrolls
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Scroll-spy: highlight the section currently in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      { rootMargin: '-38% 0px -55% 0px' },
    )
    LINKS.forEach(({ href }) => {
      const el = document.getElementById(href.slice(1))
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  // Lock body scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  // Close the menu if the viewport grows past the mobile breakpoint
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 901px)')
    const onChange = (e) => e.matches && setOpen(false)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  return (
    <>
      <header className={`nav ${scrolled ? 'is-scrolled' : ''}`}>
        <div className="nav__inner">
          <a className="nav__logo" href="#home" aria-label="Dinesh Prasad — home">
            Dinesh<span className="dot">.</span>
          </a>

          <nav className="nav__links" aria-label="Primary">
            {LINKS.map(({ label, href }) => (
              <a
                key={href}
                href={href}
                className={`nav__link ${active === href.slice(1) ? 'is-active' : ''}`}
              >
                {label}
              </a>
            ))}
          </nav>

          <a className="nav__cta" href="#contact">
            Hire Me
          </a>

          <button
            type="button"
            className={`nav__burger ${open ? 'is-open' : ''}`}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            <span />
            <span />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="mnav"
            initial={{ opacity: 0, y: -14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.38, ease: EASE }}
          >
            <nav className="mnav__links" aria-label="Mobile">
              {LINKS.map(({ label, href }, i) => (
                <motion.a
                  key={href}
                  href={href}
                  className="mnav__link"
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, y: 28 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 12 }}
                  transition={{ delay: 0.08 + i * 0.06, duration: 0.5, ease: EASE }}
                >
                  <span className="mnav__num">0{i + 1}</span>
                  {label}
                </motion.a>
              ))}
            </nav>

            <motion.div
              className="mnav__foot"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.5, duration: 0.4 }}
            >
              <a href="mailto:d2025617@gmail.com">d2025617@gmail.com</a>
              <a
                href="https://github.com/dineshprasad7564"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/dinesh-prashad-9a3227427/"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
