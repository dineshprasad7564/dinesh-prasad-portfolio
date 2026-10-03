import { motion, useReducedMotion } from 'framer-motion'
import { ArrowDown, ArrowRight, Code2, Play, ShieldCheck, Wifi } from 'lucide-react'
import { EASE } from './Reveal.jsx'

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.15 } },
}

const rise = {
  hidden: { opacity: 0, y: 34 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
}

const titleLine = {
  hidden: { y: '112%' },
  show: { y: '0%', transition: { duration: 0.9, ease: EASE } },
}

function Orb({ className, animate, duration }) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      className={`orb ${className}`}
      aria-hidden="true"
      animate={reduce ? undefined : animate}
      transition={{ duration, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }}
    />
  )
}

function FloatTile({ className, icon: Icon, label, duration, delay = 0 }) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      className={`hero__tile ${className}`}
      aria-hidden="true"
      animate={reduce ? undefined : { y: [0, -12, 0] }}
      transition={{ duration, delay, repeat: Infinity, ease: 'easeInOut' }}
    >
      <Icon size={15} strokeWidth={2.2} />
      {label}
    </motion.div>
  )
}

export default function Hero({ active }) {
  const reduce = useReducedMotion()
  const state = active ? 'show' : 'hidden'

  return (
    <section className="hero" id="home">
      <div className="hero__grid" aria-hidden="true" />
      <Orb className="orb--1" animate={{ x: [0, -46, 0], y: [0, 34, 0] }} duration={16} />
      <Orb className="orb--2" animate={{ x: [0, 40, 0], y: [0, -30, 0] }} duration={19} />
      <div className="hero__vignette" aria-hidden="true" />

      <FloatTile className="hero__tile--1" icon={ShieldCheck} label="Security First" duration={7} />
      <FloatTile className="hero__tile--2" icon={Code2} label="Clean Code" duration={8} delay={0.8} />
      <FloatTile className="hero__tile--3" icon={Wifi} label="IoT Lab" duration={9} delay={1.6} />

      <div className="container hero__inner">
        <motion.div
          className="hero__content"
          variants={container}
          initial="hidden"
          animate={reduce ? 'show' : state}
        >
          <motion.p className="hero__eyebrow" variants={rise}>
            <span className="pulse" aria-hidden="true" />
            Software Engineer • Cyber Security Enthusiast
          </motion.p>

          <h1 className="hero__title">
            <span className="line">
              <motion.span className="line-inner" variants={titleLine}>
                Build bold.
              </motion.span>
            </span>
            <span className="line">
              <motion.span className="line-inner serif-it" variants={titleLine}>
                Break limits.
              </motion.span>
            </span>
          </h1>

          <motion.p className="hero__desc" variants={rise}>
            I build fast, scalable and interactive digital experiences with clean code, modern UI
            and a security-first mindset.
          </motion.p>

          <motion.div className="hero__actions" variants={rise}>
            <a className="btn btn--solid" href="#projects">
              View My Work <ArrowRight size={15} className="btn-arrow" aria-hidden="true" />
            </a>
            <a className="btn" href="#contact">
              Contact Me
            </a>
            {/* Drop resume.pdf into /public to activate */}
            <a className="btn btn--ghost" href="/resume.pdf" download="Dinesh_Prasad_Resume.pdf">
              Download Resume{' '}
              <ArrowDown size={15} className="btn-arrow btn-arrow--down" aria-hidden="true" />
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          initial={reduce ? false : { opacity: 0, x: 44 }}
          animate={active || reduce ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.55, ease: EASE }}
        >
          <motion.a
            className="reel"
            href="#projects"
            aria-label="Play showreel — jump to selected work"
            animate={reduce ? undefined : { y: [0, -11, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          >
            <span className="reel__play" aria-hidden="true">
              <Play size={20} fill="currentColor" />
            </span>
            <span>
              <span className="reel__label">Play Reel</span>
              <span className="reel__sub">Selected Work — 2026</span>
            </span>
          </motion.a>
        </motion.div>
      </div>

      <motion.div
        className="hero__scroll"
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={active || reduce ? { opacity: 1 } : {}}
        transition={{ delay: 1.4, duration: 0.8 }}
      >
        <span>Scroll</span>
        <span className="hero__scroll-line" />
      </motion.div>
    </section>
  )
}
