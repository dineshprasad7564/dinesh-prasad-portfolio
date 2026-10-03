import { Award } from 'lucide-react'
import { Reveal, Stagger, Item } from './Reveal.jsx'

const CERTS = [
  { num: '01', title: 'Web Development', issuer: 'Issuer — TBD', date: 'Date — TBD' },
  { num: '02', title: 'Programming', issuer: 'Issuer — TBD', date: 'Date — TBD' },
  { num: '03', title: 'Cyber Security', issuer: 'Issuer — TBD', date: 'Date — TBD' },
]

export default function Certifications() {
  return (
    <section className="section" id="certifications">
      <div className="container">
        <Reveal>
          <p className="eyebrow">Proof of Learning</p>
          <div className="section-head">
            <h2 className="section-title">
              <span className="serif-it accent">Certifications</span>
            </h2>
            <p className="section-sub">Industry-recognized certificates and learning milestones.</p>
          </div>
        </Reveal>

        <Stagger className="certs__grid" gap={0.12}>
          {CERTS.map(({ num, title, issuer, date }) => (
            <Item key={num} className="cert-card" y={26}>
              <span className="cert-card__num" aria-hidden="true">
                {num}
              </span>
              <span className="cert-card__icon" aria-hidden="true">
                <Award size={26} strokeWidth={1.6} />
              </span>
              <h3 className="cert-card__title">{title}</h3>
              <p className="cert-card__meta">
                <span>{issuer}</span>
                <span className="sep" aria-hidden="true">
                  /
                </span>
                <span>{date}</span>
              </p>
              {/* TODO: replace href with the real certificate URL */}
              <a className="btn btn--sm" href="#" onClick={(e) => e.preventDefault()}>
                View Certificate
              </a>
            </Item>
          ))}
        </Stagger>
      </div>
    </section>
  )
}
