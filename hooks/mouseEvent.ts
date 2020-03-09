import { useCallback, useRef, useState } from 'react'
import { gatherOffsetLeft } from 'utils/dom'

export const useMouseMoveListener = <T extends HTMLElement>() => {
  const [diff, setDiff] = useState(0)
  const mouseRef = useRef<T>(null)

  const onMouseMove = useCallback((e: TouchEvent | MouseEvent) => {
    e.stopPropagation()

    let clientX = 0
    if (e instanceof TouchEvent) {
      clientX = e.changedTouches[0].clientX
    }

    if (e instanceof MouseEvent) {
      clientX = e.clientX
    }

    const diff = clientX - gatherOffsetLeft(mouseRef.current)
    setDiff(diff)
  }, [])

  const onMouseUp = useCallback(() => {
    window.removeEventListener('mousemove', onMouseMove)
    window.removeEventListener('touchmove', onMouseMove)
    window.removeEventListener('mouseup', onMouseUp)
    window.removeEventListener('touchend', onMouseUp)
  }, [onMouseMove])


  const onDragActionStart = useCallback(() => {
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('touchmove', onMouseMove)
    window.addEventListener('mouseup', onMouseUp)
    window.addEventListener('touchend', onMouseUp)
  }, [onMouseMove, onMouseUp])

  return { onDragActionStart, mouseRef, diff }
}