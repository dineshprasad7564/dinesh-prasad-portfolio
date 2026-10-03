import { Reveal, Stagger, Item } from './Reveal.jsx'

const JOBS = [
  {
    meta: 'Web Development • 4 Weeks',
    title: 'Web Development Intern',
    desc: 'Worked on frontend development, responsive UI, debugging and practical web-development tasks.',
  },
  {
    meta: 'Software Testing',
    title: 'QA / Bug Reporting Practice',
    desc: 'Practiced professional bug reporting, reproduction steps, expected vs actual results and UI issue documentation.',
  },
  {
    meta: 'Project Experience',
    title: 'Independent Developer',
    desc: 'Built personal web, AI, IoT and cybersecurity projects to strengthen development skills.',
  },
]

export default function Experience() {
  return (
    <section className="section sheet sheet--red on-red" id="experience">
      <div className="container">
        <Reveal>
          <p className="eyebrow">Career Journey</p>
          <div className="section-head">
            <h2 className="section-title">
              Work <span className="serif-it accent-ink">Experience</span>
            </h2>
            <p className="section-sub">
              Practical internships where I applied engineering principles and built real-world
              assets.
            </p>
          </div>
        </Reveal>

        <Stagger as="ol" className="timeline" gap={0.16}>
          {JOBS.map(({ meta, title, desc }) => (
            <Item as="li" key={title} y={44}>
              <span className="tdot" aria-hidden="true" />
              <article className="tcard">
                <p className="tcard__meta">
                  <span className="tcard__dash" aria-hidden="true" />
                  {meta}
                </p>
                <h3 className="tcard__title">{title}</h3>
                <p className="tcard__desc">{desc}</p>
              </article>
            </Item>
          ))}
        </Stagger>
      </div>
    </section>
  )
}
