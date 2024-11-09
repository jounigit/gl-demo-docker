import type { FC } from 'react'
import { PictureDelete } from './PictureDelete'
import type { Picture } from '../../../../types'
import { useModal } from '../../../../hooks/useModal'
import { ActionLinks } from '../../../utils/ActionLinks'
import { BtnInline } from '../../../../styles/styles'
import { Modal } from '../../../../components/modal/modal'
import { ArticlePicture } from '../../../../components/dashboard/components/Dashboard.styles'
import { ImageWithTooltipInfo } from '../../../utils/ImageWithTooltipInfo'

interface Props {
  picture: Picture
}

export const PictureListItemAdmin: FC<Props> = (props) => {
  const { isShown, toggle } = useModal()
  const { id, title } = props.picture

  /************** actions *************************/
  const { linkUpdate, linkRemove } =
    ActionLinks({ id, path: 'pictures', toggle })

  /************** return *************************/
  return (
    <>
      <ArticlePicture>
        <div>
          {ImageWithTooltipInfo(props.picture)}
        </div>

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
          <PictureDelete id={id} title={title} toggle={toggle}
          />} />
    </>
  )
}


