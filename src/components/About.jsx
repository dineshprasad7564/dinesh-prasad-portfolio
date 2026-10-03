import { Instagram, Linkedin, Github } from 'lucide-react'
import { Reveal, Stagger, Item } from './Reveal.jsx'

const CHIPS = [
  { mark: 'JS', label: 'JavaScript' },
  { mark: 'PY', label: 'Python' },
  { mark: 'DB', label: 'DBMS' },
  { mark: 'CS', label: 'Cyber Security' },
]

export default function About() {
  return (
    <section className="section sheet sheet--red on-red" id="about">
      <div className="container about__grid">
        <Reveal className="about__visual">
          {/* Portrait placeholder — drop your photo in as <img> when ready */}
          <div className="portrait">
            <div className="portrait__top">
              <span>Portrait</span>
              <span>EST. 2026</span>
            </div>
            <div className="portrait__monogram">D.</div>
            <div className="portrait__bottom">
              Dinesh Prasad <span>— WB, India</span>
            </div>
          </div>

          <div className="social-rail">
            <a
              href="https://github.com/dineshprasad7564"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub profile"
            >
              <Github size={18} />
            </a>
            <a
              href="https://www.linkedin.com/in/dinesh-prashad-9a3227427/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn profile"
            >
              <Linkedin size={18} />
            </a>
            {/* TODO: add real Instagram URL when available */}
            <a href="#" aria-label="Instagram profile (link coming soon)">
              <Instagram size={18} />
            </a>
          </div>
        </Reveal>

        <div>
          <Reveal>
            <p className="eyebrow">About Me</p>
            <h2 className="about__heading serif-it">Hello!</h2>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="about__text">
              Hi, my name is <strong>Dinesh Prasad</strong>, an aspiring software engineer who
              enjoys creating practical web applications, learning cybersecurity and turning ideas
              into polished digital products.
            </p>
          </Reveal>

          <Stagger className="about__chips" delay={0.15}>
            {CHIPS.map(({ mark, label }) => (
              <Item key={mark} className="chip">
                <span className="chip__icon" aria-hidden="true">
                  {mark}
                </span>
                <span className="chip__label">{label}</span>
              </Item>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  )
}
