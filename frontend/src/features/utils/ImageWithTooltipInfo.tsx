import type { Picture } from '@/types'
import { ImageKitComponent } from './ImageKitComponent'
import Tooltip from './Tooltip'
import DOMPurify from 'dompurify'

export function ImageWithTooltipInfo(picture: Picture) {
	const { title, url, year, content } = picture

	const sanitizedHtml = content ? DOMPurify.sanitize(content) : ''

	// biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
	const htmlText = <div dangerouslySetInnerHTML={{ __html: sanitizedHtml }} /> 

	const info = (
		<>
			<h4>{title}</h4>
			<p>{year}</p>
			<p>{htmlText}</p>
		</>
	)
	return (
		<Tooltip tip={info}>
			<ImageKitComponent url={url} />
		</Tooltip>
	)
}
