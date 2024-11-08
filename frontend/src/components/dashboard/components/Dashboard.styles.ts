import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { DESKTOP, LAPTOP, TABLET } from '../../../styles'
import {
	BIGSCREEN,
	WIDE,
} from '../../../styles/theme/breakpoints'
import { colors } from '../../../styles/theme'

interface Props {
	size?: number
	bgColor?: string
}

export const GridDb = styled.div`
    display: grid;
    grid-template-areas: 
    "header"
    "sidebar"
    "main";
    z-index: 100;
    @media ${LAPTOP} {
        grid-template-columns: 2fr 5fr;
        grid-template-areas: 
        "header header"
        "sidebar main";
    }

    @media ${DESKTOP} {
        grid-template-columns: 2fr 6fr;
        grid-template-areas: 
        "header header"
        "sidebar main";
    }

    @media ${WIDE} {
        grid-template-columns: 2fr 8fr;
        grid-template-areas: 
        "header header"
        "sidebar main";
    }

    @media ${BIGSCREEN} {
        grid-template-columns: 2fr 9fr;
        grid-template-areas: 
        "header header"
        "sidebar main";
    }
`

export const HeaderDb = styled.div`
    grid-area: header; 
    height: 1rem;
    width: 100vh;
    background-color: rgb(30, 100, 97);
`

export const AsideDb = styled.div`
    visibility: hidden;
    background-color: rgb(30, 100, 97);
    @media ${LAPTOP} {
        visibility: visible;
        grid-area: sidebar;
        height: 100%;
        min-height: 100vh;
    }
`

export const MainDb = styled.div`
    grid-area: main;
    /* width: 100%; */
`
/*********************************************** */
export const MainWrapper = styled.div<Props>`
    margin: 4rem auto 2rem;
    width: 100%;
    height: 100vh;
    background-color: ${({ bgColor }) => bgColor};
    h2 {
        font-size: 1.5rem;
    }
    h3 {
        font-size: 1.2rem;
    }
    h4 {
        font-size: 0.7rem;
    }

    @media ${TABLET} {
        /* max-width: 95%; */
        overflow-y: auto;
    }
`

export const Image = styled.img`
    max-height: 8rem;
    float: left;
`
export const NavbarLink = styled(Link)`
    color:white;
    font-size: 1.2rem;
    text-decoration: none;
    padding: 0.8em 0.5em 0px;
    margin: 10px;
    &:hover,
    &:focus{
    color: blue;
    };
    &:active{
    color: red;
    };
    @media(max-width: 700px) {
        display: none;
    }
`

/*********************************************** */
export const Grid = styled.div<Props>`
    margin-bottom: ${({ size }) => size}px;
    width: 100%;
`

export const Row = styled.div<Props>`
    display: flex;
    border: 1px solid grey;
    min-width: 100%;
    background-color: ${({ bgColor }) => bgColor};
`
export const Col = styled.div<Props>`
    flex: ${({ size }) => size};
`

/****************** Picture related ********************* */
export const ImgContainerDb = styled.div`
   flex: 1 100%;

@media ${TABLET} {
    flex: '1 0 100%',
}
`
interface GridImgArrProps {
	$width: number
	$imgheight: number
	$gap?: string
}

export const ImgGridDb = styled.div<GridImgArrProps>`
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
        repeat(auto-fit, ${({ $width }) => $width}px);
        padding: 1rem;
        grid-gap: ${({ $gap }) => ($gap ? $gap : '.5rem')};

        div {
            height: auto;
        }

        img {
            height: ${({ $imgheight }) => $imgheight}px;
        }
    }
`

export const ArticlePicture = styled.article`
    display: flex;
    flex-direction: column; 
    background-color: ${colors.grey1};
    padding: 0.5em;
    height: 15rem;

    details {
    margin: 0.5em 0;
    }
`