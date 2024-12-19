import type { FC } from 'react'
import { PictureDelete } from './PictureDelete'
import { ImageWithTooltipInfo } from '../../../utils/ImageWithTooltipInfo'
import type { Picture } from '@/types'
import { useModal } from '@/hooks/useModal'
import { ActionLinks } from '@/features/utils/ActionLinks'
import { ArticlePicture } from '@/components/dashboard/components/Dashboard.styles'
import { BtnInline } from '@/styles/styles'
import { Modal } from '@/components/modal/modal'

interface Props {
	picture: Picture
}

export const PictureListItemAdmin: FC<Props> = ({
	picture
}) => {
	const { isShown, toggle } = useModal()
	const { id, title } = picture

	/************** actions *************************/
	const { linkUpdate, linkRemove } = ActionLinks({
		id,
		path: 'pictures',
		toggle
	})

	/************** return *************************/
	return (
		<>
			<ArticlePicture>
				<div>{ImageWithTooltipInfo(picture)}</div>

				<BtnInline>
					{linkUpdate}
					{linkRemove}
				</BtnInline>
			</ArticlePicture>
			<Modal
				isShown={isShown}
				hide={toggle}
				headerText='Kuvan poisto'
				modalContent={
					<PictureDelete
						id={id}
						title={title}
						toggle={toggle}
					/>
				}
			/>
		</>
	)
}
