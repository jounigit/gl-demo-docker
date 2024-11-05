import styled from 'styled-components'

export const Wrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 700;
  /* width: inherit; */
  outline: 0;
`

export const Backdrop = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.8);
  z-index: 500;
`

export const StyledModal = styled.div`
  z-index: 100;
  background: white;
  position: relative;
  margin: auto;
  border-radius: 8px;
`

export const Header = styled.div`
  border-radius: 8px 8px 0 0;
  display: flex;
  justify-content: space-between;
  padding: 0.5rem;
`

export const HeaderText = styled.div`
  color: #fff;
  align-self: center;
  color: #5c5858;
  margin-top: 0.5rem;
  margin-bottom: -0.5rem;
`

export const CloseButton = styled.button`
  font-size: 0.8rem;
  border: none;
  border-radius: 3px;
  margin-left: 0.5rem;
  background: none;
  :hover {
    cursor: pointer;
  }
`

export const Content = styled.div`
   padding: 5px 2rem 5px 2rem;
    /* border: 1px solid red; */
   max-height: 100%;
   overflow-x: hidden;
   overflow-y: auto;
`
