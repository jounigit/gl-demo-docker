import styled from "styled-components"
import { LAPTOP } from "../../../styles"
import type { FC } from "react"
import { useToggle } from "../../../hooks/useToggle"
import { NavLinksDb } from "./NavLinksDb"


const LaptopBurger = styled.div<{ open: boolean }>`
    display: flex;
    flex-flow: column nowrap;
    justify-content: space-around;
    position: fixed;
    top: 15px;
    left: 20px; 
    z-index: 20;
    width: 2rem;
    height: 2rem;

    div {
    width: 2rem;
    height: 0.25rem;
    background-color: ${({ open }) => (open ? '#ccc' : '#ededed')};
    border-radius: 10px;
    transform-origin: 1px;
    transition: all 0.3s linear;

    &:nth-child(1) {
      transform: ${({ open }) => (open ? 'rotate(45deg)' : 'rotate(0)')};
    }

    &:nth-child(2) {
      transform: ${({ open }) => (open ? 'translateX(100%)' : 'translateX(0)')};
      opacity: ${({ open }) => (open ? 0 : 1)};
    }

    &:nth-child(3) {
      transform: ${({ open }) => (open ? 'rotate(-45deg)' : 'rotate(0)')};
    }
  }
    @media ${LAPTOP} {
        display: none;
    }
`

export const BurgerDb: FC = () => {
  const [isOpen, toggleOpen] = useToggle(false)

  return (
    <>
      <LaptopBurger data-cy='burger' open={isOpen} onClick={toggleOpen}>
        <div />
        <div />
        <div />
      </LaptopBurger>
      <NavLinksDb open={isOpen} toggle={toggleOpen} />
    </>
  )
}
