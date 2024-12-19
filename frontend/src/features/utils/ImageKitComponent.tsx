import { IKContext, IKImage } from 'imagekitio-react'
// const urlEndpoint = config.IMAGE_KIT_ENDPOINT

interface IKProps {
	url: string
	// urlendpt: string
}

export function ImageKitComponent({ url }: IKProps) {
	return (
		<IKContext urlEndpoint='https://ik.imagekit.io/vrojm7lqh'>
			<IKImage src={url} />
		</IKContext>
	)
}
