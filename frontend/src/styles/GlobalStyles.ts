import { createGlobalStyle } from 'styled-components'
import {
	DESKTOP,
	LAPTOP,
	MOBILE,
	TABLET,
} from './theme/breakpoints'
import { colors } from './theme'
import defaultBg from '../assets/default_bg.jpg'

interface Prop {
	bgImage?: false | true | undefined
	homePage?: false | true | undefined
	bgColor?: string | undefined
	dashboard?: false | true | undefined
}

const GlobalStyles = createGlobalStyle<Prop>`

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: 0;
      -webkit-font-smoothing: antialiased;
    font-size: clamp(14px, 2vw, 18px);
    line-height: clamp(0, 4vw, 20px);
    /* vars */
    --bg-white: rgb(255,255,255,0.8);
    --bg-primary: rgb(255,255,255,0.7);
    --bg-secondary: rgb(255,255,255,0.6);
    --shadow-primary: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    --bg-color: ${(props) =>
			props.bgColor ? props.bgColor : '#B8860B'};
    --gray-1: ${colors.grey1};
    --gray-2: ${colors.grey2};
    --gray-3: ${colors.grey3};
    --gray-4: ${colors.grey4};
  }

  /*************************************** */
  html  {
    overflow-y: auto;
    overflow-x: auto;
  }

  html, body, #root {
    font-family: 'Nunito', sans-serif;
    width: 100%;
    /* height: auto; */
    min-height: 100vh;
  }

  body::-webkit-scrollbar{
    display: none;
  }

  #root, body {
    display: flex;
    flex-direction: column;
    /* don't show picture if dashboard */
    background-color: var(--gray-4);
    /* change color if dashboard */
    background-image: url(${props => ( !props.dashboard && defaultBg)});
    background-size: cover;
    background-color: ${(props) => props.dashboard && 'white'};
  }

  /*************************************** */
  .headerMiddle {
    font-size: 1.75rem;
    font-weight: 700;
    color: ${colors.white};
    text-align: center;
    padding: 1.2em 0 0.8em;
  }

  h1 {
    font-size: 2.75rem;
    color: ${colors.grey4};
  }

  h2 {
    font-size: 1.6rem;
    color: ${colors.grey4};
    /* font-size: clamp(1.75rem, 2vw, 2.7rem); */
  }

  h3 {
    font-size: 1.15rem;
    color: ${colors.grey4};
  }

  h4 {
    font-size: 1rem;
    color: ${colors.grey4};
  }

  /*************************************** */
  .photos {
    /* Prevent vertical gaps */
    line-height: 0;

    -webkit-column-count: 5;
    -webkit-column-gap: 0px;
    -moz-column-count: 5;
    -moz-column-gap: 0px;
    column-count: 5;
    column-gap: 0px;
  }

  .photos img {
    /* Just in case there are inline attributes */
    width: 100% !important;
    height: auto !important;
  }

  /*************************************** */
  a, a:link, a:visited, a:focus, a:hover, a:active{
  color: ${colors.grey3};
  text-decoration:none;
  /* cursor: crosshair; */
}

  /*************************************** */
/* mobile */
  @media ${MOBILE} {
    h1 { 
      font-size: 2.5rem;
    }
  }

  @media ${TABLET} {
    /* * {
      font-size: 1.05rem;
    } */

    h1 { 
      font-size: 2.9rem;
    }
  }

  @media ${LAPTOP} {
    /* * {
      font-size: 1.1rem;
    } */
    h1 { 
      font-size: 3.4rem;
    }
  }

  @media  ${DESKTOP} {
    /* * {
      font-size: 1.15rem;
    } */
    h1 { 
      font-size: 3.7rem;
    }
  }
`

export default GlobalStyles

// #root, body {
//   display: flex;
//   flex-direction: column;
//   /* don't show picture if dashboard */
//   background:
//   url(${props => (!props.dashboard && img_1)}) center center no-repeat;
//   background-attachment: fixed;
//   background-size: 105vw auto;
//   background-color: var(--bg-color);
//   /* change color if dashboard */
//   background-color: ${props => (props.dashboard && 'white')};
// }
