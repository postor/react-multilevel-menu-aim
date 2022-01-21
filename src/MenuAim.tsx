import { cloneElement, useRef } from 'react'
import { menuAimCtx } from './ctx'

const { Provider } = menuAimCtx.ctx

export const MenuAim = ({ children }) => {
  let ref = useRef({ x: 0, y: 0, curLevel: 0, inArea: undefined, panels: [], })
  let childProps = {
    onMouseLeave: () => {
      hidePanels(1)
      ref.current.inArea = undefined
    },
    onMouseMove: (e: MouseEvent) => {
      let { inArea } = ref.current
      if (!inArea) return
      if (inArea(e.pageX, e.pageY)) return
      ref.current.inArea = undefined
    }
  }

  return <Provider value={{
    enter: (level, hide) => {
      let { inArea, curLevel, panels } = ref.current
      if (inArea && level != (curLevel + 1)) return false
      hidePanels(level)
      panels.push(hide)
      ref.current.inArea = undefined
      return true
    },
    leave: (el, e) => {
      let { inArea } = ref.current
      if (inArea) return

      ref.current.inArea = getInArea(el, e)
      return true
    }
  }}>
    {cloneElement(children, childProps)}
  </Provider>

  function hidePanels(level: number) {
    let { panels } = ref.current
    while (panels.length >= level) {
      panels.pop()()
    }
  }

  function getInArea(el: Element, e: MouseEvent) {
    let { pageX: x, pageY: y } = e
    let { top, left, width, height } = el.getBoundingClientRect()
    let angles = [
      getAngle(x, y, left, top),
      getAngle(x, y, left + width, top),
      getAngle(x, y, left, top + height),
      getAngle(x, y, left + width, top + height),
    ]
    let min = Math.min(...angles), max = Math.max(...angles)
    return (tx = 0, ty = 0) => {
      let angle = getAngle(x, y, tx, ty)
      return (angle <= max && angle >= min)
    }

    function getAngle(x = 0, y = 0, x1 = 0, y1 = 0) {
      return Math.atan2(y1 - y, x1 - x)
    }
  }
}