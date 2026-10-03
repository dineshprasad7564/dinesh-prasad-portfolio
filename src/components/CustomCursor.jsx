import { useEffect, useRef } from 'react'

/**
 * Desktop-only custom cursor: a dot that tracks the pointer 1:1 and a
 * trailing ring that eases behind it (lerp in a single rAF loop). The ring
 * expands over links, buttons and anything marked [data-cursor].
 *
 * The color auto-adapts to the surface under the pointer: red on dark
 * backgrounds, black on red ones — detected by walking the elements at the
 * pointer for the nearest opaque background color.
 * Fully disabled on touch / coarse pointers.
 */
export default function CustomCursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)

  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    if (!fine || !dotRef.current || !ringRef.current) return

    const dot = dotRef.current
    const ring = ringRef.current
    document.documentElement.classList.add('has-cursor')

    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
    const ringPos = { ...pos }
    let scale = 1
    let targetScale = 1
    let raf = 0
    let dirty = true
    let inverted = false

    /* True when the nearest opaque surface under the pointer is red. */
    const isRedUnder = (x, y) => {
      const el = document.elementFromPoint(x, y)
      let node = el
      while (node && node !== document.documentElement) {
        const bg = getComputedStyle(node).backgroundColor
        if (bg && bg !== 'transparent' && bg !== 'rgba(0, 0, 0, 0)') {
          const [r = 0, g = 0, b = 0] = (bg.match(/\d+/g) || []).map(Number)
          return r > 140 && g < 100 && b < 100
        }
        node = node.parentElement
      }
      return false
    }

    const applyInversion = (red) => {
      inverted = red
      dot.classList.toggle('is-inverted', red)
      ring.classList.toggle('is-inverted', red)
    }

    const onMove = (e) => {
      pos.x = e.clientX
      pos.y = e.clientY
      dirty = true
      dot.style.opacity = '1'
      ring.style.opacity = '1'
    }

    const onOver = (e) => {
      targetScale = e.target.closest('a, button, [data-cursor]') ? 1.9 : 1
    }

    const onDown = () => {
      targetScale = 0.8
    }

    const onUp = (e) => {
      targetScale = e.target.closest('a, button, [data-cursor]') ? 1.9 : 1
    }

    const onLeave = () => {
      dot.style.opacity = '0'
      ring.style.opacity = '0'
    }

    // Scrolling can change the surface under a stationary pointer
    const onScroll = () => {
      dirty = true
    }

    const loop = () => {
      if (dirty) {
        dirty = false
        const red = isRedUnder(pos.x, pos.y)
        if (red !== inverted) applyInversion(red)
      }

      ringPos.x += (pos.x - ringPos.x) * 0.16
      ringPos.y += (pos.y - ringPos.y) * 0.16
      scale += (targetScale - scale) * 0.18

      dot.style.transform = `translate(${pos.x}px, ${pos.y}px) translate(-50%, -50%)`
      ring.style.transform = `translate(${ringPos.x}px, ${ringPos.y}px) translate(-50%, -50%) scale(${scale})`

      raf = requestAnimationFrame(loop)
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('mouseover', onOver, { passive: true })
    window.addEventListener('mousedown', onDown)
    window.addEventListener('mouseup', onUp)
    window.addEventListener('scroll', onScroll, { passive: true })
    document.documentElement.addEventListener('mouseleave', onLeave)
    raf = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseover', onOver)
      window.removeEventListener('mousedown', onDown)
      window.removeEventListener('mouseup', onUp)
      window.removeEventListener('scroll', onScroll)
      document.documentElement.removeEventListener('mouseleave', onLeave)
      document.documentElement.classList.remove('has-cursor')
    }
  }, [])

  return (
    <>
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
    </>
  )
}
