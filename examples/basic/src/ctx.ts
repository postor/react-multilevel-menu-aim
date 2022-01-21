import { createContext, useContext } from "react"

export interface IMenuAimCtx {
  enter: (level: number, hide: () => void) => boolean
  leave: (panel: Element, e: MouseEvent) => boolean
}

export interface IMenuCtx {
  showSubMenu: boolean
  level: number
  parentInfo: any,
  panelRef:any
}

export const menuAimCtx = getCtx({} as IMenuAimCtx)
export const menuCtx = getCtx({} as IMenuCtx)

function getCtx<T>(val: T) {
  let ctx = createContext(val)
  return {
    ctx,
    useCtx: () => useContext(ctx)
  }
}