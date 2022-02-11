import { FC, JSXElementConstructor } from 'react'
import { ReactElement } from 'react'
import { cloneElement, useRef, useState } from 'react'
import { menuAimCtx, IMenuCtx, menuCtx } from './ctx'

const { Provider } = menuCtx.ctx

export const Menu: FC<{ info?: any, children: ReactElement<any, string | JSXElementConstructor<any>> }> = ({ children, info }) => {
  let { level = 1 } = menuCtx.useCtx() || {}
  let panelRef = useRef(), menuRef = useRef()
  let [val, setVal] = useState({ level: level + 1, panelRef, showSubMenu: false } as IMenuCtx)
  let { enter, leave } = menuAimCtx.useCtx()
  let childProps = {
    // onMouseEnter: onenter,
    onMouseMove: onenter,
    onClick: onenter,
    onMouseLeave: onleave,
    onMouseOut: onleave,
    ref: menuRef
  }

  return <Provider value={val}>
    {cloneElement(children, childProps)}
  </Provider>

  function onenter(e: MouseEvent) {
    let rtn = enter(level, () => setShow(false), menuRef.current)
    if (rtn == 0) {
      return
    }
    if (rtn == 1) {
      e.stopPropagation()
      setShow(true)
    }
  }

  function onleave(e: MouseEvent) {
    leave(panelRef.current, e) //&& e.stopPropagation()
  }

  function setShow(show: boolean) {
    setVal({
      ...val,
      showSubMenu: show
    })
  }
}