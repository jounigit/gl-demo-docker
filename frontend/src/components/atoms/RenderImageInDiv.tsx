import { ImageKitComponent } from '../../features/utils/ImageKitComponent'
import type { Picture } from '../../types'

interface Props {
	data: Picture
	height?: string
}

export function RenderImageInDiv({ data }: Props): JSX.Element {
	return (
		<>
			{
				<div>
					<ImageKitComponent url={data.url} />
				</div>
			}
		</>
	)
}
