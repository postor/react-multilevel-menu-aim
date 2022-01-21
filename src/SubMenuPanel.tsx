import { menuCtx } from "./ctx"

export const SubMenuPanel = ({ children }) => {
  let { showSubMenu } = menuCtx.useCtx()
  return showSubMenu ? children : null
}