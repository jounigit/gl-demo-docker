import { useEffect } from 'react'
import { DeleteWrapper } from '@/styles/styles'
import { useDeletePicture } from '../../usePicture'
import { SmallButton } from '@/components/atoms/Button'

type Props = {
	id: number
	title: string
	toggle: () => void
}

export const PictureDelete = ({
	id,
	title,
	toggle
}: Props): JSX.Element => {
	const { status, mutate: DeletePicture } =
		useDeletePicture()

	useEffect(() => {
		if (status === 'success' || status === 'error') {
			toggle()
		}
	}, [status, toggle])

	/************** handle remove mutation ***********************/
	const remove = () => {
		DeletePicture(id)
	}

	/************************************************************/
	return (
		<DeleteWrapper>
			<h3>Haluatko poistaa kuvan:</h3>
			<h4>{title}</h4>
			<SmallButton color='red' onClick={() => remove()}>
				Poista kuva
			</SmallButton>
		</DeleteWrapper>
	)
}
