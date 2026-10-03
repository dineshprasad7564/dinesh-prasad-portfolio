import { useEffect, useRef } from 'react'
import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion'
import { ArrowUpRight, BarChart3, Clapperboard, Cpu, ShieldCheck } from 'lucide-react'
import { Reveal, Stagger, Item } from './Reveal.jsx'

const PROJECTS = [
  {
    icon: ShieldCheck,
    name: 'CodeGuard AI',
    category: 'AI • Security',
    desc: 'AI-assisted source-code security analysis with vulnerability detection and actionable fixes.',
  },
  {
    icon: Clapperboard,
    name: 'DineVerse',
    category: 'Web • API',
    desc: 'An anime discovery and streaming-style interface built with modern frontend interactions.',
  },
  {
    icon: BarChart3,
    name: 'AI Data Analytics',
    category: 'Data • AI',
    desc: 'Upload CSV, Excel or JSON data and turn it into useful insights, charts and dashboards.',
  },
  {
    icon: Cpu,
    name: 'IoT Projects',
    category: 'IoT • ESP8266',
    desc: 'Connected-device experiments using ESP8266/NodeMCU, sensors and web dashboards.',
  },
]

/** Project card with smooth mouse-follow 3D tilt (desktop, fine pointers only). */
function TiltCard({ project, index }) {
  const reduce = useReducedMotion()
  const fineRef = useRef(false)

  useEffect(() => {
    fineRef.current = window.matchMedia('(hover: hover) and (pointer: fine)').matches
  }, [])

  const rx = useMotionValue(0)
  const ry = useMotionValue(0)
  const rotateX = useSpring(rx, { stiffness: 170, damping: 22, mass: 0.5 })
  const rotateY = useSpring(ry, { stiffness: 170, damping: 22, mass: 0.5 })

  const onMove = (e) => {
    if (!fineRef.current || reduce) return
    const rect = e.currentTarget.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width - 0.5
    const py = (e.clientY - rect.top) / rect.height - 0.5
    ry.set(px * 7)
    rx.set(-py * 7)
    e.currentTarget.style.setProperty('--mx', `${(px + 0.5) * 100}%`)
    e.currentTarget.style.setProperty('--my', `${(py + 0.5) * 100}%`)
  }

  const onLeave = () => {
    rx.set(0)
    ry.set(0)
  }

  const Icon = project.icon

  return (
    <Item>
      <motion.a
        className="pcard"
        href="https://github.com/dineshprasad7564"
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${project.name} — view project on GitHub`}
        style={{ rotateX, rotateY, transformPerspective: 900 }}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        whileHover={reduce ? undefined : { y: -8, scale: 1.015 }}
        transition={{ duration: 0.45, ease: [0.2, 0.8, 0.2, 1] }}
      >
        <div className="pcard__top">
          <span className="pcard__icon" aria-hidden="true">
            <Icon size={22} strokeWidth={2} />
          </span>
          <span className="pcard__cat">{project.category}</span>
        </div>

        <h3 className="pcard__name">{project.name}</h3>
        <p className="pcard__desc">{project.desc}</p>

        <div className="pcard__foot">
          <span className="pcard__num">0{index + 1}</span>
          <span className="pcard__cta">
            View Project <ArrowUpRight size={15} aria-hidden="true" />
          </span>
        </div>
      </motion.a>
    </Item>
  )
}

const TASKS = [
  {
    label: 'Task 02 · AI Landing Page',
    href: 'https://dineshprasad7564.github.io/dinesh-prasad-landing-page/',
  },
  {
    label: 'Task 03 · Google Clone',
    href: 'https://dineshprasad7564.github.io/dinesh-prasad-google-clone/',
  },
  {
    label: 'Task 04 · Contact Form',
    href: 'https://dineshprasad7564.github.io/dinesh-prasad-contact-form/',
  },
  {
    label: 'Task 05 · Blog',
    href: 'https://dineshprasad7564.github.io/dinesh-prasad-blog/',
  },
  {
    label: 'Task 06 · Gallery',
    href: 'https://dineshprasad7564.github.io/dinesh-prasad-gallery/',
  },
]

export default function Projects() {
  return (
    <section className="section projects" id="projects">
      <span className="projects__watermark" aria-hidden="true">
        WORK
      </span>

      <div className="container">
        <Reveal>
          <p className="eyebrow">Selected Work</p>
          <div className="section-head">
            <h2 className="section-title">
              Projects that <span className="serif-it accent">do something.</span>
            </h2>
            <p className="section-sub">
              Real builds across AI, security, data and connected hardware — each one shipped to
              solve an actual problem.
            </p>
          </div>
        </Reveal>

        <Stagger className="projects__grid" gap={0.12}>
          {PROJECTS.map((project, i) => (
            <TiltCard key={project.name} project={project} index={i} />
          ))}
        </Stagger>

        <Reveal className="social-cta" delay={0.15}>
          <a
            className="btn btn--solid"
            href="https://github.com/dineshprasad7564"
            target="_blank"
            rel="noopener noreferrer"
          >
            Follow my work on GitHub <ArrowUpRight size={15} className="btn-arrow" aria-hidden="true" />
          </a>
          <a
            className="btn"
            href="https://www.linkedin.com/in/dinesh-prashad-9a3227427/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Connect with me on LinkedIn{' '}
            <ArrowUpRight size={15} className="btn-arrow" aria-hidden="true" />
          </a>
        </Reveal>

        <Reveal className="tasks-row" delay={0.22}>
          <span className="tasks-label">Internship Tasks</span>
          {TASKS.map(({ label, href }) => (
            <a key={href} className="tasks-link" href={href} target="_blank" rel="noopener noreferrer">
              {label}
            </a>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
