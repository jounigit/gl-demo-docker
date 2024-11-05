import styled from 'styled-components'
import { NavLink } from 'react-router-dom'
import { TABLET } from '../../../styles'
import { colors } from '../../../styles/theme'

interface Nav {
	open: boolean
}

export const StyledBurger = styled.div<Nav>`
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

@media ${TABLET} {
  display: none;
}
`
export const Ul = styled.ul<Nav>`
  display: flex;
  flex-grow: 1;
  flex-flow: row nowrap;
  list-style: none;
  min-width: 200px;
  max-width: 400px;
  align-items: center;

  @media (max-width: 768px) {
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
  }

  li {
    padding: 18px 10px;
    color: white;
  }

  .dropdown {
      display: inline-block;

      & > .dropdown-content {
        display: none;
        position: absolute;
        margin-top: -2px;
        background-color: #f9f9f9;
        border: 2px solid ${colors.grey2};
        border-radius: 5px;
        min-width: 160px;
        box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
        z-index: 1;

        & > a {
          color: ${colors.grey4};
          padding: 12px 16px;
          text-decoration: none;
          display: block;
          text-align: left;
          &:hover {
            background-color: ${colors.grey2};
          }
        }
      }

      &:hover .dropdown-content {
        display: block
      }
  }
`
export const LinkTo = styled(NavLink)`
    display: flex;
    flex-direction: row;
    margin: '1rem';
    text-decoration: 'none' !important;
    font-size: x-large;
    font-weight: 700;
    transition: transform .2s;
    /* color: white; */
    /* color: white  !important; */
    &:link,
    &:visited{
      color: ${colors.grey1};
  };
  
    &:hover{
      transform: scale(1.2);
    }; 
    &:focus,   
    &:active{
      color: ${colors.grey3};
    }
`
export const DropLink = styled(NavLink)`
  color: ${colors.grey4};
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  text-align: left;
  &:hover {
    background-color: ${colors.grey2};
  }
`

/* color: ${colors.grey3}; */
