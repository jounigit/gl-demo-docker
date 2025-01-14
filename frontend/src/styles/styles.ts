import styled from 'styled-components'
import {
	BIGSCREEN,
	DESKTOP,
	LAPTOP,
	MOBILE,
	TABLET
} from './theme/breakpoints'
import { colors } from './theme'

export const SiteContent = styled.div`
  flex: 1 0 auto;
  padding-top: 1rem;
  margin: 1.5rem 0 3rem 0;
  @media ${TABLET} {
    margin: 3rem 2rem 3rem 2rem;
  }
`

export const BaseFooter = styled.footer`
  display: flex;
  flex-direction: column;

  @media ${TABLET} {
    flex-direction: row;
  }
`
export const BaseContainer = styled.div`
  display: flex;
  box-shadow: var(--shadow-primary);
  border-radius: 5px;
  background: var(--bg-white);
  padding-bottom: 2rem;
`
export const Divider = styled.hr`
  display: block;
  margin-top: 0.5em;
  margin-bottom: 0.5em;
  margin-left: auto;
  margin-right: auto;
  border-style: inset;
  border-width: 1px;
`

// interface SpinnerProps {
// 	$marginTop?: number
// }

export const Spinner = styled(SiteContent)<{
	$marginTop?: number
}>`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: ${(p) => p.$marginTop ?? 0}px;
`
interface HandlingProps {
	$brColor?: string
}

export const HandlingWrapper = styled(
	BaseContainer
)<HandlingProps>`
  display: grid;
  width: 60%;
  border: 0.1rem solid ${(p) => p.$brColor ?? 'var(--gray-4)'};
  padding: 1.5rem;
  margin: auto;
  margin-top: 2rem;
  h4 {
    color: ${(p) => p.$brColor ?? 'var(--gray-4)'};
  }
  p {
    color: var(--gray-4);
  }
`
/* ************* list related **************************/
// frontpage
export const ListHomeContainer = styled.div`
  display: grid;
  grid-auto-columns: minmax(0, 1fr);
  grid-auto-flow: column;
`

export const ListHomeDetails = styled.div<{
	$bgcolor?: string
}>`
  /* border: 1px solid red; */
  align-items: center;
  background-color: ${({ $bgcolor }) => $bgcolor ?? 'var(--white)'};
  min-height: 23rem;
  h2 {
    color: var(--gray-2);
    margin: 1.2rem 0 0 1.4rem;
  }
`

export const BtnInline = styled.div`
  flex-direction: row;
  max-height: 50px;
`

/* ************* forms ****************************/
export const FormContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 1.4rem;
`
export const Form = styled.form`
  min-width: 400px;
  background: var(--gray-2);
  border-radius: 5px;
  padding: 1.5rem;
`
export const InputWrapperTwoCol = styled.div`
  display: flex;
  margin-left: auto;
  margin-right: auto;
`

export const TwoColChild = styled.div`
  flex: 1;
  padding: 0.8rem;
  /* &:first-child {
      margin-right: 1rem;
    } */
`

export const InputWrapper = styled.div`
  margin-left: auto;
  margin-right: auto;
`
export const Input = styled.input`
  display: block;
  font-size: 18px;
  height: 2rem;
  width: 100%;
  padding: 10px;
  /* margin: 10px; */
  background: papayawhip;
  border: none;
  border-radius: 3px;
  ::placeholder {
    color: palevioletred;
  }
`
export const Textarea = styled.textarea`
  display: block;
  font-size: 18px;
  /* height: 2rem; */
  width: 100%;
  padding: 10px;
  /* margin: 10px; */
  background: papayawhip;
  border: none;
  border-radius: 3px;
  ::placeholder {
    color: palevioletred;
  }
`
export const Label = styled.label`
  display: block;
  font-size: 1rem;
  color: var(--gray-4);
  padding: 10px;
  margin-top: 1rem;
`
export const DeleteWrapper = styled.div`
  padding: 1em;
  h3 {
    color: var(--gray-3);
  }
  h4 {
    padding: 0.6em;
  }
`

/* ************* cards ****************************/
export const Cards = styled.section<{ width: number }>`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  margin: 0 auto;

  @media ${MOBILE} {
    display: grid;
    grid-template-columns: repeat(
      auto-fit,
      minmax(${({ width }) => width}px, 1fr)
    );
    padding: 1rem;
    grid-gap: 0.5rem;
  }
`
export const Card = styled.article`
  flex: 1 0 300px;
  box-sizing: border-box;
  border: 1px solid ${colors.grey3};
  border-radius: 0.2rem;
  margin: 1rem 0.25em;

  .content {
    padding: 1.4em;
  }

  h2 {
    margin-top: 0;
    margin-bottom: 0.5em;
    font-weight: bold;
  }

  img {
    display: block;
    border: 0;
    width: 100%;
    height: auto;
  }

  max-width: calc(100% - 1em);

  /* @media ${MOBILE} {
    max-width: calc(50% - 1em);
  }

  @media ${LAPTOP} {
    max-width: calc(33% - 1em);
  }

  @media ${DESKTOP} {
    max-width: calc(25% - 1em);
  }

  @media ${BIGSCREEN} {
    max-width: calc(20% - 1em);
  } */
`
// export Cardcontent {
//   padding: 1.4em;
// }

// h2 {
//   margin-top: 0;
//   margin-bottom: .5em;
//   font-weight: bold;
// }

// img {
//   display: block;
//   border: 0;
//   width: 100%;
//   height: auto;
// }
