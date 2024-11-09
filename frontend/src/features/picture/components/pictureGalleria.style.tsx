import styled from 'styled-components'
import { TABLET } from '../../../styles/theme/breakpoints'

export interface ImageGridProps {
  $gridwidth: number,
  $imgheight: number,
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
  repeat(auto-fit, ${({ $gridwidth }) => $gridwidth}px);
  padding: 1rem;
  /* grid-gap: .5rem; */

  div {
    height: auto;
    /* height: ${({ $imgheight }) => $imgheight}px;
     */
  }

  img {
    height: ${({ $imgheight }) => $imgheight}px;
    /* height: 100%; */
    /* transition: all 100ms ease-out; */

    /* :hover {
      cursor: pointer;
    } */

    /* &:hover {
      transform: scale(2);
      height: auto;
    } */
  }
}
`
