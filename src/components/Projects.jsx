import { ArrowUpRight } from 'lucide-react'
import { Reveal } from './Reveal.jsx'
import { WorksWheel } from './WorksWheel.jsx'

const BASE = import.meta.env.BASE_URL

// Placeholder covers live in public/works/ — swap the SVGs for real
// screenshots (same filenames) and the wheel picks them up automatically.
const WORKS = [
  {
    title: 'CodeGuard AI',
    image: `${BASE}works/codeguard-ai.svg`,
    href: 'https://github.com/dineshprasad7564',
  },
  {
    title: 'DineVerse',
    image: `${BASE}works/dineverse.svg`,
    href: 'https://github.com/dineshprasad7564',
  },
  {
    title: 'Data Analytics',
    image: `${BASE}works/ai-data-analytics.svg`,
    href: 'https://github.com/dineshprasad7564',
  },
  {
    title: 'IoT Lab',
    image: `${BASE}works/iot-lab.svg`,
    href: 'https://github.com/dineshprasad7564',
  },
  {
    title: 'Landing Page',
    image: `${BASE}works/landing-page.svg`,
    href: 'https://dineshprasad7564.github.io/dinesh-prasad-landing-page/',
  },
  {
    title: 'Google Clone',
    image: `${BASE}works/google-clone.svg`,
    href: 'https://dineshprasad7564.github.io/dinesh-prasad-google-clone/',
  },
  {
    title: 'Contact Form',
    image: `${BASE}works/contact-form.svg`,
    href: 'https://dineshprasad7564.github.io/dinesh-prasad-contact-form/',
  },
  {
    title: 'Blog',
    image: `${BASE}works/blog.svg`,
    href: 'https://dineshprasad7564.github.io/dinesh-prasad-blog/',
  },
  {
    title: 'Gallery',
    image: `${BASE}works/gallery.svg`,
    href: 'https://dineshprasad7564.github.io/dinesh-prasad-gallery/',
  },
]

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
              A wheel of real builds across AI, security, data, hardware and the
              internship tasks — scroll or drag to turn it.
            </p>
          </div>
        </Reveal>
      </div>

      <Reveal as="div" className="works-wrap" y={24}>
        <WorksWheel items={WORKS} label="Works ’26" action="View" />
      </Reveal>

      <div className="container">
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
