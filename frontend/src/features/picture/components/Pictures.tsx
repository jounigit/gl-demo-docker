import styled from 'styled-components'
import { usePictures } from '../usePicture'
import { PictureGalleria } from './PictureGalleria'
import { TABLET } from '@/styles'

export const ImagesContainer = styled.div`
   flex: 1 100%;

@media ${TABLET} {
    width: 80%;
    margin: 0 auto;
}
`

const Pictures = () => {
    const { data: pictures } = usePictures()

    if (pictures === undefined ) return <h4>no images yet.</h4>

    return (
        <ImagesContainer id='imgCtr'>
            <PictureGalleria
                imageList={pictures}
                $gridwidth={250}
                $imgheight={250}
                $gap='1rem'
                $centered
            />
        </ImagesContainer>
    )
    }

export default Pictures