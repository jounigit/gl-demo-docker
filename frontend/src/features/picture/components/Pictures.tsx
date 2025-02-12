import styled from 'styled-components'
import { usePictures } from '../usePicture'
import { PictureGalleria } from './PictureGalleria'
import { TABLET } from '@/styles'
<<<<<<< HEAD
import incrementByMediaQuery from '@/components/atoms/incrementByMediaQuery'

=======
import { getDeviceType } from '@/components/atoms/getDeviceType'
import incrementByMediaQuery from '@/components/atoms/incrementByMediaQuery'

const addByDevice = () => {
    return getDeviceType()
}

>>>>>>> v-20-tinymce
export const ImagesContainer = styled.div`
   flex: 1 100%;

@media ${TABLET} {
    width: 85%;
    margin: 0 auto;
}
`

const Pictures = () => {
    const { data: pictures } = usePictures()

    const meter = incrementByMediaQuery(200, 50)
    if (pictures === undefined ) return <h4>no images yet.</h4>

    return (
        <ImagesContainer id='imgCtr'>
<<<<<<< HEAD
=======
            <h3>{ addByDevice() }</h3>
>>>>>>> v-20-tinymce
            <PictureGalleria
                imageList={pictures}
                $gridwidth={meter}
                $imgheight={meter}
                $gap='0.5rem'
                $centered
            />
        </ImagesContainer>
    )
    }

export default Pictures