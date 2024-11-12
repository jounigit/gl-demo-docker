import { FaHome } from 'react-icons/fa'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import { LAPTOP } from '../../../styles'
import { colors } from '../../../styles/theme'
import { useTokenStore } from '../../../store/tokenStore'
import { Divider } from '../../../styles/styles'
import { Logout } from '../../../features/login/components/Logout'

interface Props { toggle?: () => void }

const Wrap = styled.div`
  margin-left: 1.5rem;
  @media ${LAPTOP} {
    margin: 1.5rem;
    position: fixed;
    top: 4rem;
  }
`
const LinkStyle = styled(NavLink)`
   display: block;
   padding: 0.4rem 0;
   font-size: 1.2rem;
   font-size: x-large;
    font-weight: 600;
   &:hover,
    &:focus{
      color: ${colors.grey4};
    }
    &:active{
      color: ${colors.grey4};
    };
`

type LinkFormer = (path: string, text: string, cytxt: string) => JSX.Element

export const NavLinksDetailsDb = ({ toggle }: Props) => {
  const token = useTokenStore(state => state.token)

  const linkForm: LinkFormer = (path, text, cytxt) => (
    <LinkStyle to={path} data-cy={cytxt} onClick={toggle}>
      {text}
    </LinkStyle>
  )

  return (
    <Wrap>
      <LinkStyle to="/dashboard" onClick={toggle} data-cy='home'>
        <FaHome />
      </LinkStyle>

      {linkForm('/dashboard/albums', 'Albumit', 'albumslink')}

      {linkForm('/dashboard/pictures', 'Kuva-arkisto', 'pictureslink')}

      <Divider />

      {linkForm('/dashboard/albums/create', '- Uusi albumi', 'createalbum')}

      {linkForm('/dashboard/pictures/upload', '- Uusi kuva', 'createpicture')}

      {token &&
        <Logout />
      }

    </Wrap>
  )
}


