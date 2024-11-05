import type { FC } from 'react'
import { StyledBurger } from './NavLinks.styles'
import { NavLinks } from './NavLinks'
import { useToggle } from '../../../hooks/useToggle'

const Burger: FC = () => {
  const [isOpen, toggleOpen] = useToggle(false)

  return (
    <>
      <StyledBurger data-cy='burger' open={isOpen} onClick={toggleOpen}>
        <div />
        <div />
        <div />
      </StyledBurger>
      <NavLinks open={isOpen} toggle={toggleOpen} />
    </>
  )
}
export default Burger
