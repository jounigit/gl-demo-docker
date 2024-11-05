import type { FC } from 'react'
import { DropLink, LinkTo, Ul } from './NavLinks.styles'
import { FaAngleDown, FaHome } from 'react-icons/fa'
import { useTokenStore } from '../../../store/tokenStore'
import { linkFormer } from '../../../features/utils/LinkFormer'
import { Logout } from '../../../features/login/components/Logout'

type Props = {
  open: boolean,
  toggle: () => void,
}

export const NavLinks: FC<Props> = ({ open, toggle }) => {
  const token = useTokenStore((state: { token: unknown }) => state.token)

  // console.log('Navlinks token: ', token)

  return (
    <Ul open={open}>
      <li>
        <LinkTo to="/" onClick={toggle}><FaHome /></LinkTo>
      </li>
      {/* <li>
        <LinkTo to="/galleria" onClick={toggle}>Galleria</LinkTo>
      </li> */}
      {/* dropdown section */}
      <li className='dropdown'>
        <LinkTo to="#">
          Galleria
          <span style={{ position: 'relative', top: '0.3rem' }}>
            <FaAngleDown />
          </span>
        </LinkTo>
        <div className='dropdown-content'>
          <DropLink to="/galleria/veistokset" onClick={toggle}>
            Veistokset
          </DropLink>
          <DropLink to="/galleria/piirustuksia" onClick={toggle}>
            Piirustukset
          </DropLink>
          <DropLink to="/galleria/tilateokset" onClick={toggle}>
            Tilateokset
          </DropLink>
        </div>
      </li>

      {/* end section */}

      {/* {linkFormer(toggle, '/articles', 'Artikkelit', 'articleslink')} */}

      {token &&
        linkFormer(toggle, '/dashboard', 'admin', 'adminlink')
      }
      {token &&
        <li>
          <Logout />
        </li>
      }
      {!token &&
        linkFormer(toggle, '/login', 'login', 'loginLink')
      }
    </Ul>
  )
}


