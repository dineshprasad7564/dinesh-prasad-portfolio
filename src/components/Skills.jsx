import { Binary, Code2, Cpu, Database, Globe, ShieldCheck } from 'lucide-react'
import { Reveal, Stagger, Item } from './Reveal.jsx'

const GROUPS = [
  { icon: Code2, title: 'Programming', skills: ['C', 'Python', 'Java', 'JavaScript'] },
  { icon: Globe, title: 'Web', skills: ['HTML', 'CSS', 'JavaScript'] },
  { icon: Database, title: 'Database', skills: ['SQL', 'DBMS'] },
  { icon: Cpu, title: 'Computer Science', skills: ['DSA', 'Operating Systems', 'Networking'] },
  { icon: ShieldCheck, title: 'Security', skills: ['Cyber Security', 'Security Testing', 'Bug Reporting'] },
  { icon: Binary, title: 'IoT', skills: ['ESP8266', 'NodeMCU'] },
]

export default function Skills() {
  return (
    <section className="section" id="skills">
      <div className="container">
        <Reveal>
          <p className="eyebrow">Toolkit</p>
          <div className="section-head">
            <h2 className="section-title">
              What I <span className="serif-it accent">work</span> with.
            </h2>
            <p className="section-sub">
              A focused stack — languages, web fundamentals, data, security and connected devices.
            </p>
          </div>
        </Reveal>

        <Stagger className="skills__grid" gap={0.08}>
          {GROUPS.map(({ icon: Icon, title, skills }) => (
            <Item key={title} className="skill-card" y={26}>
              <div className="skill-card__head">
                <span className="skill-card__icon" aria-hidden="true">
                  <Icon size={20} strokeWidth={2} />
                </span>
                <h3 className="skill-card__title">{title}</h3>
              </div>
              <div className="skill-card__tags">
                {skills.map((s) => (
                  <span className="tag" key={s}>
                    {s}
                  </span>
                ))}
              </div>
            </Item>
          ))}
        </Stagger>
      </div>
    </section>
  )
}
