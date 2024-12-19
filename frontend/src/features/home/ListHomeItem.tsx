import { LinkTo } from '@/components/layouts/nav/NavLinks.styles'
import { ListHomeDetails } from '@/styles/styles'
import type { Album } from '@/types'
import styled from 'styled-components'
import { ImageKitComponent } from '../utils/ImageKitComponent'

const LinkStyle = styled(LinkTo)`
    display: inline-block;
    position: relative;
    &:hover{
        transform: scale(1);
    }
`
const ImgBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 10px;
  width: 50%;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`

const colors = ['#db3a34ff;', '#177e89ff;', '#2bc016ff;']

type Props = {
	album: Album
	order: number
}

export const ListHomeItem = ({
	order,
	album: { title, pictures, slug }
}: Props) => {
	const firstImg = pictures?.[0]
	const color = colors[order]

	return (
		<ListHomeDetails $bgcolor={color}>
			<LinkStyle to={`/galleria/${slug}`}>
				<h2>{title}</h2>
				<ImgBox>
					{firstImg && (
						<ImageKitComponent url={firstImg.url} />
					)}
				</ImgBox>
			</LinkStyle>
		</ListHomeDetails>
	)
}
