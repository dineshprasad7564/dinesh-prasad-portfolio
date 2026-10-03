import * as React from 'react'

/**
 * A portfolio index built as a wheel you turn.
 *
 * At rest the work sits in a ring around a title, each card tangent to the
 * circle. The first notch of scroll blows the ring open into a vertical drum:
 * the card at the front lies flat and full size, the ones above and below
 * rotate away into hard perspective and run off the top and bottom of the
 * frame. Keep turning and the drum carries the next piece round to the front.
 *
 * The whole thing is one number - `turn` - read by a single rAF pass that
 * writes transforms straight to the DOM. 0 is the ring, 1 is the drum with
 * item 0 at the front, and every whole number after that is one more item
 * turned past. (Ported from the shadcn/Tailwind original to plain JSX+CSS.)
 */

/* Geometry. The card is measured against the stage; everything else is
   measured against the card, so a narrow stage - where the card is capped by
   width, not height - scales the whole wheel down with it. */
const CARD_H = 0.38 // front card height, of the stage
const CARD_MAX_W = 0.34 // ... but never wider than this much of the stage
const CARD_RATIO = 1.45 // card width / height
const STEP = 40 // degrees between cards on the drum
const DRUM = 2.22 // drum radius, in card heights - and everything below likewise
const LENS = 2.7 // perspective distance
const RING_R = 1.14 // ring radius
/* The drum curves away round an arc whose centre sits off to the LEFT, so the
   piece at the front is at the arc's near point - dead centre. */
const BOW = 1.82
const TITLE = 0.124 // ring label and front-card title
const INDEX = 0.04 // the index down the right-hand side
const CULL = 1.6 // items either side of the front still worth drawing

const WHEEL_UNITS = 900 // how much of a wheel-notch counts as one item
const DRAG_UNITS = 420 // ... or a dragged pixel
const SETTLE = 140 // quiet time after the last wheel event before settling
const EASE = 0.12 // fraction of the remaining distance closed each frame

const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v))
const lerp = (a, b, t) => a + (b - a) * t
const rad = (deg) => (deg * Math.PI) / 180

/* How far left the arc has carried something that has turned `drumDeg` off
   the front. Zero at the front, so the piece being read stays centred. */
const bowAt = (drumDeg, bow) => -bow * (1 - Math.cos(rad(drumDeg)))

/* Both states in one chain: ring terms fall away as `m` reaches the drum,
   drum terms are still zero while the ring is up. */
function place(ringDeg, drumDeg, ringR, drumR, bow, m) {
  return (
    `translateX(${m * bowAt(drumDeg, bow)}px)` +
    ` rotateZ(${(1 - m) * ringDeg}deg) translateY(${-(1 - m) * ringR}px)` +
    ` rotateX(${m * drumDeg}deg) translateZ(${m * drumR}px)`
  )
}

export function WorksWheel({
  items,
  label = "Works '26",
  action = 'View',
  className = '',
  ...props
}) {
  const stageRef = React.useRef(null)
  const wheelRef = React.useRef(null)
  const cardRefs = React.useRef([])
  const labelRef = React.useRef(null)
  const titleRef = React.useRef(null)

  // Only `active` is state - everything else is written to the DOM, so
  // turning the wheel is not a render.
  const turn = React.useRef(0)
  const target = React.useRef(0)
  const [active, setActive] = React.useState(0)
  const [stage, setStage] = React.useState({ w: 0, h: 0 })

  const count = items.length
  const last = Math.max(count - 1, 0)

  // Reduced motion drops the easing, so the wheel lands where it is put.
  const [reduced, setReduced] = React.useState(false)
  React.useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    const read = () => setReduced(query.matches)
    read()
    query.addEventListener('change', read)
    return () => query.removeEventListener('change', read)
  }, [])

  React.useEffect(() => {
    const el = stageRef.current
    if (!el) return
    const read = () => setStage({ w: el.clientWidth, h: el.clientHeight })
    read()
    const ro = new ResizeObserver(read)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const metrics = React.useMemo(() => {
    const { w, h } = stage
    const cardW = Math.min(h * CARD_H * CARD_RATIO, w * CARD_MAX_W)
    const cardH = cardW / CARD_RATIO
    const drumR = cardH * DRUM
    const ringR = cardH * RING_R
    // Shrink the ring's cards until the circle reads as a closed loop.
    const ringScale = count
      ? clamp((((2 * Math.PI * ringR) / count) * 0.82) / (cardW || 1), 0.16, 1)
      : 1
    return {
      cardW,
      cardH,
      ringR,
      ringScale,
      drumR,
      bow: cardH * BOW,
      depth: cardH * LENS,
      title: cardH * TITLE,
      index: cardH * INDEX,
    }
  }, [stage, count])

  // One pass per frame: ease toward the target, then write every transform.
  React.useEffect(() => {
    if (!stage.h) return
    let frame = 0
    const { ringR, ringScale, drumR, bow } = metrics

    const draw = () => {
      frame = requestAnimationFrame(draw)
      const gap = target.current - turn.current
      if (Math.abs(gap) < 0.0005) turn.current = target.current
      else turn.current += gap * (reduced ? 1 : EASE)

      const t = turn.current
      const m = clamp(t, 0, 1)
      const pos = Math.max(0, t - 1)

      // The drum is pulled back so its front face lands on the picture plane.
      if (wheelRef.current) {
        wheelRef.current.style.transform = `translateZ(${-m * drumR}px)`
      }

      for (let i = 0; i < count; i++) {
        const d = i - pos
        const drumDeg = d * STEP
        const card = cardRefs.current[i]
        if (card) {
          card.style.transform = place(d * (360 / count), drumDeg, ringR, drumR, bow, m)
          card.style.opacity = m > 0.5 && Math.abs(d) > CULL ? '0' : '1'
          card.style.zIndex = String(Math.round(100 - Math.abs(d) * 2))
        }
        const face = card?.firstElementChild
        if (face) face.style.transform = `scale(${lerp(ringScale, 1, m)})`
      }

      if (labelRef.current) labelRef.current.style.opacity = String(1 - m)
      if (titleRef.current) titleRef.current.style.opacity = String(m)
      const near = clamp(Math.round(pos), 0, last)
      setActive((prev) => (prev === near ? prev : near))
    }

    frame = requestAnimationFrame(draw)
    return () => cancelAnimationFrame(frame)
  }, [metrics, stage.h, count, last, reduced])

  const to = React.useCallback(
    (next) => {
      target.current = clamp(next, 0, last + 1)
    },
    [last],
  )

  // Native listener, because the wheel has to be cancellable - and it only
  // cancels while it still has somewhere to go, so the page scrolls on at
  // either end instead of trapping the reader.
  React.useEffect(() => {
    const el = stageRef.current
    if (!el) return
    const onWheel = (event) => {
      const next = target.current + event.deltaY / WHEEL_UNITS
      if (next > 0 && next < last + 1) event.preventDefault()
      to(next)
      // Settle onto an item rather than stopping between two.
      window.clearTimeout(settling.current)
      settling.current = window.setTimeout(() => to(Math.round(target.current)), SETTLE)
    }
    el.addEventListener('wheel', onWheel, { passive: false })
    return () => {
      el.removeEventListener('wheel', onWheel)
      window.clearTimeout(settling.current)
    }
  }, [to, last])

  const drag = React.useRef(null)
  const settling = React.useRef(0)

  return (
    <section aria-label={label} className={`works ${className}`} {...props}>
      <div
        ref={stageRef}
        tabIndex={0}
        role="listbox"
        aria-label={label}
        aria-activedescendant={`works-wheel-${active}`}
        className="works__stage"
        style={{ perspective: `${metrics.depth}px` }}
        onPointerDown={(event) => {
          drag.current = event.clientY
          event.currentTarget.setPointerCapture(event.pointerId)
        }}
        onPointerMove={(event) => {
          if (drag.current === null) return
          to(target.current + (drag.current - event.clientY) / DRAG_UNITS)
          drag.current = event.clientY
        }}
        onPointerUp={() => {
          drag.current = null
          if (target.current > 1) to(Math.round(target.current))
        }}
        onKeyDown={(event) => {
          if (event.key === 'ArrowDown') to(Math.round(target.current) + 1)
          else if (event.key === 'ArrowUp') to(Math.round(target.current) - 1)
          else return
          event.preventDefault()
        }}
      >
        <div ref={wheelRef} className="works__wheel">
          {items.map((item, i) => {
            const Tag = item.href ? 'a' : 'div'
            return (
              <Tag
                key={item.title}
                id={`works-wheel-${i}`}
                role="option"
                aria-selected={i === active}
                href={item.href}
                {...(item.href?.startsWith('http')
                  ? { target: '_blank', rel: 'noopener noreferrer' }
                  : {})}
                ref={(node) => {
                  cardRefs.current[i] = node
                }}
                className="works__card"
                style={{
                  width: metrics.cardW,
                  height: metrics.cardH,
                  marginLeft: -metrics.cardW / 2,
                  marginTop: -metrics.cardH / 2,
                }}
              >
                <span className="works__face">
                  <img src={item.image} alt={item.title} draggable={false} loading="lazy" />
                  {action && item.href ? (
                    <span className="works__action">
                      <svg viewBox="0 0 12 12" width="10" height="10" aria-hidden="true">
                        <path
                          d="M3 9 9 3M4 3h5v5"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      {action}
                    </span>
                  ) : null}
                </span>
              </Tag>
            )
          })}
        </div>
      </div>

      {/* Ring title and front-card title trade places across the transition. */}
      <div ref={labelRef} className="works__label" style={{ fontSize: metrics.title }}>
        {label}
      </div>
      <div ref={titleRef} className="works__title" style={{ fontSize: metrics.title }}>
        {items[active]?.title}
      </div>

      <ol className="works__index" style={{ fontSize: metrics.index }}>
        {items.map((item, i) => (
          <li key={item.title}>
            <button type="button" onClick={() => to(i + 1)} className={i === active ? 'is-active' : ''}>
              {item.title}
            </button>
          </li>
        ))}
      </ol>
    </section>
  )
}

export default WorksWheel
