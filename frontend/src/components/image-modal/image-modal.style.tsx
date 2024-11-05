import styled from 'styled-components'

interface Props { portrait: boolean }

export const Image = styled.div<Props>`

    @media screen and (max-width: 880px) {
        height: 80vh;
        width: auto;

        img {
            height: 95%;
            width: auto;
            object-fit: cover;
        }
    }

    height: 85vh;
    width: auto;

    img {
        height: ${({ portrait }) => portrait ? '98%' : '90%'};
        width: auto;
        object-fit: cover;
    }

`

export const PictureInfo = styled.div<Props>`
    font-size: 0.7rem;
    margin-bottom: 10px;
    margin-left: 10px;
    text-align: left;
    float: ${({ portrait }) => portrait ? 'right' : 'left'};
    p {
        white-space: pre-wrap;
        font-size: 0.7rem;
    }
`
