import { ArrowUpRight } from 'lucide-react'
import { Reveal } from './Reveal.jsx'

const SOCIALS = [
  {
    label: 'GitHub',
    href: 'https://github.com/dineshprasad7564',
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/dinesh-prashad-9a3227427/',
  },
  // TODO: add real Instagram URL when available
  {
    label: 'Instagram',
    href: '#',
  },
]

export default function Contact() {
  return (
    <section className="section sheet sheet--red on-red contact" id="contact">
      <div className="container contact__inner">
        <Reveal>
          <p className="eyebrow">Have a project?</p>
        </Reveal>

        <Reveal delay={0.08}>
          <h2 className="contact__title">
            Let&rsquo;s build
            <span className="serif-it">something great.</span>
          </h2>
        </Reveal>

        <Reveal delay={0.16}>
          <a className="contact__email" href="mailto:d2025617@gmail.com">
            d2025617@gmail.com
            <ArrowUpRight size={34} strokeWidth={2.2} aria-hidden="true" />
          </a>
        </Reveal>

        <Reveal className="contact__socials" delay={0.24}>
          {SOCIALS.map(({ label, href }) => (
            <a
              key={label}
              className="btn btn--outline-red"
              href={href}
              {...(href.startsWith('http')
                ? { target: '_blank', rel: 'noopener noreferrer' }
                : {})}
            >
              {label} <ArrowUpRight size={14} className="btn-arrow" aria-hidden="true" />
            </a>
          ))}
        </Reveal>

        <Reveal delay={0.3}>
          <p className="contact__note">Open to internships, freelance &amp; collaborations</p>
        </Reveal>
      </div>
    </section>
  )
}
