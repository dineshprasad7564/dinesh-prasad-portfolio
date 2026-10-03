import { useEffect } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { EASE } from './Reveal.jsx'

const wordWrap = {
  hidden: {},
  show: { transition: { staggerChildren: 0.18, delayChildren: 0.25 } },
}

const word = {
  hidden: { y: '120%' },
  show: { y: '0%', transition: { duration: 0.95, ease: EASE } },
}

export default function Loader({ onDone }) {
  const reduce = useReducedMotion()

  useEffect(() => {
    const t = setTimeout(onDone, reduce ? 800 : 2350)
    return () => clearTimeout(t)
  }, [onDone, reduce])

  return (
    <motion.div
      className="loader"
      aria-hidden="true"
      initial={false}
      exit={reduce ? { opacity: 0, transition: { duration: 0.4 } } : { y: '-100%', transition: { duration: 0.85, ease: EASE } }}
    >
      <motion.h1 className="loader__title" variants={wordWrap} initial="hidden" animate="show">
        <span className="loader__word-wrap">
          <motion.span className="loader__word loader__word--white" variants={word}>
            Dinesh
          </motion.span>
        </span>
        <span className="loader__word-wrap">
          <motion.span className="loader__word loader__word--red" variants={word}>
            Prasad.
          </motion.span>
        </span>
      </motion.h1>

      <motion.p
        className="loader__foot"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.8 }}
      >
        Portfolio — 2026
      </motion.p>
    </motion.div>
  )
}
