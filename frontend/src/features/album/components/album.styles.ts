import { BaseContainer, TABLET } from "@/styles"
import { colors } from "@/styles/theme"
import styled from "styled-components"


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
`

export const ListItemContainer = styled(BaseContainer)`
  flex-wrap: wrap;
  padding: 1.2rem;
`
interface ImageGridProps {
	width: number
	height: number
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
`

export const ListImgBox = styled.div`
  flex: 1 100%;

  @media ${TABLET} {
    flex: 0 0 45%;
    margin-right: 1rem;
    margin-bottom: 1rem;
  }
`
export const ListItemInfo = styled.div`
  flex: 0 0 45%;
  margin: 0 0 0.5em;
  color: ${colors.grey3};
  text-decoration: none;

  h3 {
    margin-bottom: 0.5rem;
  }
`
export const ListItemInfoText = styled.span`
  margin-top: 1.2rem;
  margin-bottom: 1rem;
  font-size: 0.9em;
  color: black;
  text-decoration: none;
`

export const ListTitle = styled.div`
  flex: 1 100%;
`

/* ********** details components related eg. album, album admin ***********/
export const DetailsContainer = styled(BaseContainer)<{ isContent?: boolean }>`
  /* flex-wrap: wrap; */
  padding: 1em;
  margin: 0 auto;
<<<<<<< HEAD
  width: ${({ isContent }) => isContent ? 800 : 600}px;
=======
  width: ${({ iscontent }) => iscontent ? 800 : 600}px;
>>>>>>> v-20-tinymce
`
export const DetailsContainerForTwoCol = styled(DetailsContainer)`
  max-width: 1250px;
  margin: 0 auto;
`

export const DetailsAdminContainer = styled(DetailsContainer)`
  margin-right: 1.2rem;
`
export const DetailsTitle = styled.div`
  /* flex: 1 100%; */
`
export const DetailsText = styled.div`
  flex: 1 0 40%;
  margin: 0.5em;
`
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
`

export const DetailsImgBox = styled.div`
  flex: 1 100%;

  @media ${TABLET} {
    flex: "1 0 100%";
  }
`

export const DetailsImgBoxTwoColumn = styled(DetailsImgBox)`
  @media ${TABLET} {
    flex: 0 0 45%;
  }
`
/* ********** ***********/
export const AlbumContainer = styled(BaseContainer)`
    min-width: 600px;
    max-width: 1000px;
    width: 100%;
    margin: 0 auto;
    background-color: #fff;
    border: 1px solid red;
    padding: 20px;
`
export const AlbumWithoutContent = styled(AlbumContainer)` 
    display: flex;
    flex-direction: column;
`

export const AlbumWithContent = styled(AlbumContainer)` 
    display: grid;
    grid-template-columns: 50% 50%;
`
export const AlbumImages = styled.div` 
    margin: 0 auto;
    display: grid;
    width: 100%;
    gap: 1rem;
    border: 1px solid blue;
    @media ${TABLET} {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
    }
`
export const AlbumImage = styled.div`
  padding: 1rem;
  height: 4rem;

  img {
    width: 100%;
    height: auto;
    object-fit: cover;
  }
`