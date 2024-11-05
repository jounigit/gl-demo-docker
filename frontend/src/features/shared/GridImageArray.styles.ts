import styled from 'styled-components'
import { TABLET } from '../../styles'

export const ImageArrBox = styled.div`
   flex: 1 100%;

@media ${TABLET} {
    flex: '1 0 100%',
}
`
export const ImgDiv = styled.div`
    /* width: 100%;
    height: 200px; */
    /* @media {MOBILE} {
        width: 100%;
        height: 200px;
    } */
`
interface GridImgArrProps {
	$width: number
	$imgheight: number
	$gap?: string
}

export const GridImgArray = styled.div<GridImgArrProps>`
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    margin: 0 auto;

    div {
        flex-basis: 100%;
        height: auto;
    }

    img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    }

    @media ${TABLET} {
        display: grid;
        grid-template-columns: 
        repeat(auto-fit, ${(p) => p.$width}px);
        padding: 1rem;
        grid-gap: ${(p) => (p.$gap ? p.$gap : '.5rem')};

        div {
            height: auto;
        }

        img {
            height: ${(p) => p.$imgheight}px;
        }
    }
`
