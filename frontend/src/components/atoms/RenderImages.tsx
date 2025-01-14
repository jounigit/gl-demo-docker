import styled from 'styled-components'
import type { Picture } from '../../types'
import { ImageKitComponent } from '../../features/utils/ImageKitComponent'

interface Props {
	data: Picture[]
	showInfo?: false | true | undefined
}

const Txt = styled.p`
  color: var(--gray-4);
  font-size: 0.95rem;
`

export function RenderImages({
	data,
	showInfo = true
}: Props): JSX.Element {
	return (
		<>
			{data.map((item) => (
				<div key={item.id}>
					<ImageKitComponent url={item.url} />
					{showInfo && picData(item)}
				</div>
			))}
		</>
	)
}

function picData(item: Picture) {
	return (
		<>
			{item.title && <h4>{item.title}</h4>}
			{item.year && <Txt>{item.year}</Txt>}
			{item.content && <Txt>{item.content}</Txt>}
		</>
	)
}
