import type { FC } from 'react'
import styled from 'styled-components'
import { NavLinksDetailsDb } from './NavLinksDetailsDb'
import { colors } from '../../../styles/theme'
import { Logout } from '../../../features/login/components/Logout'
// import { FaHome } from 'react-icons/fa'
// import { NavLink } from 'react-router-dom'
// import styled from 'styled-components'

type Props = {
  open: boolean,
  toggle: () => void,
}

const Ul = styled.ul<{ open: boolean }>`
  /* @media (max-width: 768px) { */
  display: flex;
  flex-grow: 1;
  /* flex-flow: row nowrap; */
  list-style: none;
  min-width: 200px;
  max-width: 400px;


    flex-flow: column nowrap;
    background-color: black;
    position: fixed;
    transform: ${({ open }) => (open ? 'translateX(0)' : 'translateX(-100%)')};
    top: 0;
    left: 0;
    height: 100vh;
    width: 50vW;
    padding-top: 3.5rem;
    z-index: 10;
    transition: transform 0.3s ease-in-out;

    li {
      color: ${colors.grey1};
    }
    /* @media {LAPTOP} {
    display: none;
  } */
  /* } */
`

export const NavLinksDb: FC<Props> = ({ open, toggle }) => (
  <Ul open={open}>
    <NavLinksDetailsDb toggle={toggle} />
    <Logout />

  </Ul>
)
