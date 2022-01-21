import { FC, JSXElementConstructor } from 'react'
import { ReactElement } from 'react'
import { cloneElement, useEffect, useRef, useState } from 'react'
import { menuAimCtx, IMenuCtx, menuCtx } from './ctx'

const { Provider } = menuCtx.ctx

export const Menu: FC<{ info: any, children: ReactElement<any, string | JSXElementConstructor<any>> }> = ({ children, info }) => {
  let { level } = menuCtx.useCtx()
  let panelRef = useRef()
  let [val, setVal] = useState({ level: level + 1, panelRef } as IMenuCtx)
  let { enter, leave } = menuAimCtx.useCtx()
  let childProps = {
    onMouseenter: onenter,
    onMouseMove: onenter,
    onClick: onenter,
    onMouseLeave: onleave,
    ref: panelRef,
  }

  return <Provider value={val}>
    {cloneElement(children, childProps)}
  </Provider>

  function onenter() {
    if (!enter(level, () => setShow(false))) {
      return
    }
    setShow(true)
  }

  function onleave(e: MouseEvent) {
    leave(panelRef.current, e)
  }

  function setShow(show: boolean) {
    setVal({
      ...val,
      showSubMenu: show
    })
  }
}