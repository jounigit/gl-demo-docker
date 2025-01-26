import styled from 'styled-components'
import { TABLET } from '../../../styles/theme/breakpoints'

export interface ImageGridProps {
	$gridwidth: number
	$imgheight: number
  $centered?: boolean
  $gap?: string
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
    repeat(auto-fit, minmax( ${({ $gridwidth }) => $gridwidth}px, 1fr ));
    grid-gap: ${({ $gap }) => $gap};
    justify-content: ${(p) => (p.$centered ? 'center' : 'normal')};
    padding: 1rem 0 2rem 0;

    div {
      height: auto;
      margin-bottom: -5px;
    } 

    img {
      height: ${({ $imgheight }) => $imgheight}px;
    }
}
`
// export const ImageGridAllWidth = styled(ImageGrid)`
//     @media ${TABLET} {
//       grid-template-columns: 
//       repeat(auto-fit, minmax(200px, 1fr));
//     }
// `
