import { cloneElement, useRef } from 'react'
import { menuAimCtx } from './ctx'

const { Provider } = menuAimCtx.ctx

export const MenuAim = ({ children }) => {
  let ref = useRef({ x: 0, y: 0, inArea: undefined, panels: [], curMenu: undefined })
  let childProps = {
    onMouseLeave: () => {
      console.log(`onMouseLeave`)
      hidePanels(1)
      ref.current.inArea = undefined
      ref.current.curMenu = undefined
    },
    onMouseMove: (e: MouseEvent) => {
      let { inArea } = ref.current
      if (!inArea) return
      if (inArea(e.pageX, e.pageY)) {
        console.log(`inArea!`)
        return
      }
      ref.current.inArea = undefined
      ref.current.curMenu = undefined
      console.log(`outArea!`)
    }
  }

  return <Provider value={{
    enter: (level, hide, el) => {
      let { inArea, panels, curMenu } = ref.current
      if (curMenu == el || el.contains(curMenu)) return -1
      if (inArea && level == panels.length) {
        console.log(`enter fail:`, { inArea: !!inArea, level, panels: panels.length })
        return 0
      }
      // if(level==2) debugger
      ref.current.curMenu = el
      console.log(`enter success!`, { inArea: !!inArea, level, panels: panels.length })
      hidePanels(level)
      panels.push(hide)
      ref.current.inArea = undefined
      return 1
    },
    leave: (el, e) => {
      console.log(`leave!`)
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
      console.log(`hidePanels ${panels.length}`)
      panels.pop()()
    }
  }

  function getInArea(el: Element, e: MouseEvent) {
    console.log(`getInArea`, { el, e })
    if (!el) return
    let { pageX: x, pageY: y } = e
    let { top, left, width, height } = el.getBoundingClientRect()
    let angles = [
      getAngle(x, y, left, top),
      getAngle(x, y, left + width, top),
      getAngle(x, y, left, top + height),
      getAngle(x, y, left + width, top + height),
    ]
    let min = Math.min(...angles), max = Math.max(...angles)
    // debugger
    return (tx = 0, ty = 0) => {
      if (tx == x && ty == y) return true
      let angle = getAngle(x, y, tx, ty)
      return (angle <= max && angle >= min)
    }

    function getAngle(x = 0, y = 0, x1 = 0, y1 = 0) {
      return Math.atan2(y1 - y, x1 - x)
    }
  }
}
