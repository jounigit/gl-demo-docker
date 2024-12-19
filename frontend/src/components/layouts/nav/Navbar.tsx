import type { FC } from 'react'
import styled from 'styled-components'
import Burger from './Burger'
import { NavbarContainer } from './Navbar.styles'
import { useNavScroll } from './useNavScroll'

const Transition = styled.div`
  .active {
    visibility: visible;
    transition: all 200ms ease-in;
  }
  .hidden {
    visibility: hidden;
    transition: all 200ms ease-out;
    transform: translate(0, -100%);
  }
`

const Navbar: FC = () => {
	const { show } = useNavScroll()

	// console.log(' Show: ', show, ' Scrollpos: ', scrollpos)

	return (
		<Transition>
			<NavbarContainer
				$scrollpos={scrollY}
				className={show ? 'active' : 'hidden'}
			>
				<Burger />
				<div className='name'>PORTFOLIO</div>
			</NavbarContainer>
		</Transition>
	)
}

export default Navbar
