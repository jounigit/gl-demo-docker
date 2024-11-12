import { LinkTo } from "../../components/layouts/nav/NavLinks.styles"
import type { LinkFormer } from "../../types"


export const linkFormer: LinkFormer = (toggle, path, text) =>
  <LinkTo to={path} onClick={toggle}>
    {text}
  </LinkTo>
