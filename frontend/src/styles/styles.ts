import styled from "styled-components";
import {
  BIGSCREEN,
  DESKTOP,
  LAPTOP,
  MOBILE,
  TABLET,
} from "./theme/breakpoints";
import { colors } from "./theme";

export const SiteContent = styled.div`
  flex: 1 0 auto;
  padding-top: 1rem;
  margin: 1.5rem 0 3rem 0;
  @media ${TABLET} {
    margin: 3rem 2rem 3rem 2rem;
  }
`;

export const BaseFooter = styled.footer`
  display: flex;
  flex-direction: column;

  @media ${TABLET} {
    flex-direction: row;
  }
`;
export const BaseContainer = styled.div`
  display: flex;
  box-shadow: var(--shadow-primary);
  border-radius: 5px;
  background: var(--bg-white);
  padding-bottom: 2rem;
`;
export const Divider = styled.hr`
  display: block;
  margin-top: 0.5em;
  margin-bottom: 0.5em;
  margin-left: auto;
  margin-right: auto;
  border-style: inset;
  border-width: 1px;
`;

// interface SpinnerProps {
// 	$marginTop?: number
// }

export const Spinner = styled(SiteContent)<{
  $marginTop?: number;
}>`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: ${(p) => p.$marginTop ?? 0}px;
`;
interface HandlingProps {
  $brColor?: string;
}

export const HandlingWrapper = styled(BaseContainer)<HandlingProps>`
  display: grid;
  width: 60%;
  border: 0.1rem solid ${(p) => p.$brColor ?? "var(--gray-4)"};
  padding: 1.5rem;
  margin: auto;
  margin-top: 2rem;
  h4 {
    color: ${(p) => p.$brColor ?? "var(--gray-4)"};
  }
  p {
    color: var(--gray-4);
  }
`;
/* ************* list related **************************/
// frontpage
export const ListHomeContainer = styled.div`
  display: grid;
  grid-auto-columns: minmax(0, 1fr);
  grid-auto-flow: column;
`;
export const ListHomeDetails = styled.div<{
  $bgimg?: string;
}>`
  /* border: 1px solid red; */
  align-items: center;
  background-color: lightsalmon;
  min-height: 30rem;
  background-image: url(${(p) => p.$bgimg});
  background-size: cover;
  h2 {
    color: var(--gray-2);
    margin: 1.2rem 0 0 1.4rem;
  }
`;

// .eg albums, currents
export const ListContainer = styled.div`
  display: grid;
  grid-template-rows: 1fr;
  width: 100vw !important;
  gap: 0.6em;
  margin: auto;

  @media ${TABLET} {
    max-width: 70%;
  }
`;

export const ListItemContainer = styled(BaseContainer)`
  flex-wrap: wrap;
  padding: 1.2rem;
`;
interface ImageGridProps {
  width: number;
  height: number;
}

export const ListItemImageGrid = styled.div<ImageGridProps>`
  div {
    height: ${({ height }) => height}px;
    margin: auto;
  }

  img {
    width: ${({ width }) => width}px;
    height: ${({ height }) => height}px;
    object-fit: cover;
  }

  @media ${TABLET} {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 0.5rem;
  }
`;

export const ListImgBox = styled.div`
  flex: 1 100%;

  @media ${TABLET} {
    flex: 0 0 45%;
    margin-right: 1rem;
    margin-bottom: 1rem;
  }
`;
export const ListItemInfo = styled.div`
  flex: 0 0 45%;
  margin: 0 0 0.5em;
  color: ${colors.grey3};
  text-decoration: none;

  h3 {
    margin-bottom: 0.5rem;
  }
`;
export const ListItemInfoText = styled.span`
  margin-top: 1.2rem;
  margin-bottom: 1rem;
  font-size: 0.9em;
  color: black;
  text-decoration: none;
`;

export const ListTitle = styled.div`
  flex: 1 100%;
`;
export const BtnInline = styled.div`
  flex-direction: row;
  max-height: 50px;
`;
/* ********** details components related eg. album, album admin ***********/
export const DetailsContainer = styled(BaseContainer)`
  flex-wrap: wrap;
  padding: 1em;
`;
export const DetailsContainerForTwoCol = styled(DetailsContainer)`
  max-width: 1250px;
  margin: 0 auto;
`;

export const DetailsAdminContainer = styled(DetailsContainer)`
  margin-right: 1.2rem;
`;
export const DetailsTitle = styled.div`
  /* flex: 1 100%; */
`;
export const DetailsText = styled.div`
  flex: 1 0 40%;
  margin: 0.5em;
`;
export const DetailsInfoTxt = styled.article`
  flex: 1;
  margin: 0.5em;
  max-width: 32rem;
  h2 {
    margin-bottom: 0.8rem;
  }
  p {
    line-height: normal;
  }
`;

export const DetailsImgBox = styled.div`
  flex: 1 100%;

  @media ${TABLET} {
    flex: "1 0 100%";
  }
`;

export const DetailsImgBoxTwoColumn = styled(DetailsImgBox)`
  @media ${TABLET} {
    flex: 0 0 45%;
  }
`;

/* ************* forms ****************************/
export const FormContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 1.4rem;
`;
export const Form = styled.form`
  min-width: 400px;
  background: var(--gray-2);
  border-radius: 5px;
  padding: 1.5rem;
`;
export const InputWrapperTwoCol = styled.div`
  display: flex;
  margin-left: auto;
  margin-right: auto;
`;

export const TwoColChild = styled.div`
  flex: 1;
  padding: 0.8rem;
  /* &:first-child {
      margin-right: 1rem;
    } */
`;

export const InputWrapper = styled.div`
  margin-left: auto;
  margin-right: auto;
`;
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
`;
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
`;
export const Label = styled.label`
  display: block;
  font-size: 1rem;
  color: var(--gray-4);
  padding: 10px;
  margin-top: 1rem;
`;
export const DeleteWrapper = styled.div`
  padding: 1em;
  h3 {
    color: var(--gray-3);
  }
  h4 {
    padding: 0.6em;
  }
`;

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
`;
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
`;
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
