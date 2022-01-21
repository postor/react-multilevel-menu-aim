import { cloneElement } from "react"
import { menuCtx } from "./ctx"

export const SubMenuPanel = ({ children }) => {
  let { showSubMenu, panelRef } = menuCtx.useCtx()
  return showSubMenu ? cloneElement(children, { ref: panelRef }) : null
}