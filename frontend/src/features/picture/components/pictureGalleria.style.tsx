import styled from 'styled-components'
import { TABLET } from '../../../styles/theme/breakpoints'

export interface ImageGridProps {
  width: number,
  height: number,
}

export const ImageGrid = styled.div<ImageGridProps>`
display: flex;
flex-wrap: wrap;
width: 100%;
margin: 0 auto;

div {
  flex-basis: 100%;
  height: auto;
  /* border: 1px solid; */
}

img {
  width: 100%;
  height: auto;
  object-fit: cover;
}

@media ${TABLET} {
  display: grid;
  grid-template-columns: 
  repeat(auto-fit, minmax(${({ width }) => width}px, 1fr));
  padding: 1rem;
  grid-gap: .5rem;

  div {
    height: ${({ height }) => height}px;
  }

  img {
    height: 100%;
    transition: all 100ms ease-out;

    :hover {
      cursor: pointer;
    }

    /* &:hover {
      transform: scale(2);
      height: auto;
    } */
  }
}
`
