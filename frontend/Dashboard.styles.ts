import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { LAPTOP, TABLET } from '../../../styles'

interface Props {
	size?: number
	bgColor?: string
}

export const GridDb = styled.div`
    display: grid;
    grid-template-rows: auto;
    grid-template-areas: 
    "hd"
    "main";
    @media ${LAPTOP} {
        grid-template-columns: repeat(16, 1fr);
        grid-template-areas: 
        "hd hd hd hd hd hd hd hd hd hd hd hd hd hd hd hd"
        "sd sd sd main main main main
         main main main main main main main main main";
    }

    /* @media {DESKTOP} {
        grid-template-columns: repeat(16, 1fr);
        grid-template-areas: 
        "hd hd hd hd hd hd hd hd hd hd hd hd hd hd hd hd"
        "sd sd sd main main main main
         main main main main main main main main main";
    } */
`

export const HeaderDb = styled.div`
    grid-area: hd; 
    height: 1rem;
    width: 100vh;
    background-color: rgb(30, 100, 97);
`

export const AsideDb = styled.div`
    visibility: hidden;
    background-color: rgb(30, 100, 97);
    @media ${LAPTOP} {
        visibility: visible;
        grid-area: sd;
        height: 100%;
        min-height: 100vh;
    }
`

export const MainDb = styled.div`
    grid-area: main;
    /* width: 100%; */
`
export const MainWrapper = styled.div<Props>`
    margin: 4rem auto 2rem;
    width: 100%;
    height: 100vh;
    background-color: ${(props) => props.bgColor};

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

export const Grid = styled.div<Props>`
    margin-bottom: ${(props) => props.size}px;
    width: 100%;
`

export const Row = styled.div<Props>`
    display: flex;
    border: 1px solid grey;
    min-width: 100%;
    background-color: ${(props) => props.bgColor};
`
export const Col = styled.div<Props>`
    flex: ${(props) => props.size};
`
