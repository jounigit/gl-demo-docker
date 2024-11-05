import { LinkTo } from "../../components/layouts/nav/NavLinks.styles"
import type { LinkFormer } from "../../types"


export const linkFormer: LinkFormer = (toggle, path, text) => <li>
  <LinkTo to={path} onClick={toggle}>
    {text}
  </LinkTo>
</li>

export const dbLinkFormer: LinkFormer = (
  toggle, path, text
) => <LinkTo to={path} onClick={toggle}>{text}</LinkTo>