import type { Picture } from '@/types'
import { ImageKitComponent } from './ImageKitComponent'
import Tooltip from './Tooltip'
<<<<<<< HEAD
import DOMPurify from 'dompurify'

export function ImageWithTooltipInfo(picture: Picture) {
	const { title, url, year, content } = picture

	const sanitizedHtml = content ? DOMPurify.sanitize(content) : ''

	// biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
	const htmlText = <div dangerouslySetInnerHTML={{ __html: sanitizedHtml }} /> 

=======

// const urlEndpoint = config.IMAGE_KIT_ENDPOINT

export function ImageWithTooltipInfo(picture: Picture) {
	const { title, url, year, content } = picture
>>>>>>> v-20-tinymce
	const info = (
		<>
			<h4>{title}</h4>
			<p>{year}</p>
<<<<<<< HEAD
			<p>{htmlText}</p>
=======
			<p>{content}</p>
>>>>>>> v-20-tinymce
		</>
	)
	return (
		<Tooltip tip={info}>
			<ImageKitComponent url={url} />
		</Tooltip>
	)
}
