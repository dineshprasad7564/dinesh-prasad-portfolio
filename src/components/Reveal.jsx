import { motion, useReducedMotion } from 'framer-motion'

/** Shared cinematic easing — cubic-bezier(.2,.8,.2,1) */
export const EASE = [0.2, 0.8, 0.2, 1]

/**
 * Scroll-triggered reveal. Fades + slides up once when entering the viewport.
 * Respects prefers-reduced-motion (renders without movement).
 */
export function Reveal({ children, delay = 0, y = 34, className, as = 'div', once = true }) {
  const reduce = useReducedMotion()
  const Comp = motion[as] || motion.div

  return (
    <Comp
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: '-70px' }}
      transition={{ duration: 0.8, delay, ease: EASE }}
    >
      {children}
    </Comp>
  )
}

/** Staggered children container — pairs with <Item>. */
export function Stagger({ children, className, as = 'div', delay = 0, gap = 0.09, amount = 0.2 }) {
  const Comp = motion[as] || motion.div

  return (
    <Comp
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-60px', amount }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: gap, delayChildren: delay } },
      }}
    >
      {children}
    </Comp>
  )
}

/** Child of <Stagger> — fades + slides up with the group. */
export function Item({ children, className, as = 'div', y = 30 }) {
  const reduce = useReducedMotion()
  const Comp = motion[as] || motion.div

  return (
    <Comp
      className={className}
      variants={
        reduce
          ? undefined
          : {
              hidden: { opacity: 0, y },
              show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
            }
      }
    >
      {children}
    </Comp>
  )
}
