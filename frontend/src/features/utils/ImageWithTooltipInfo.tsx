import type { Picture } from '@/types'
import { ImageKitComponent } from './ImageKitComponent'
import Tooltip from './Tooltip'
import { sanitizeHtml } from '@/components/atoms/sanitizeHtml'

// const urlEndpoint = config.IMAGE_KIT_ENDPOINT

export function ImageWithTooltipInfo(picture: Picture) {
	const { title, url, year, content } = picture

	const info = (
		<>
			<h4>{title}</h4>
			<p>{year}</p>
			{sanitizeHtml(content)}
		</>
	)
	return (
		<Tooltip tip={info}>
			<ImageKitComponent url={url} />
		</Tooltip>
	)
}
