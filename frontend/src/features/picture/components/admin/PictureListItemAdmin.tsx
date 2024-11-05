import type { FC } from 'react'
import { PictureDelete } from './PictureDelete'
import type { Picture } from '../../../../types'
import config from '../../../../data/config'
import { useModal } from '../../../../hooks/useModal'
import { formatUrl } from '../../../../components/atoms/utils'
import { ActionLinks } from '../../../utils/ActionLinks'
import { BtnInline } from '../../../../styles/styles'
import { Modal } from '../../../../components/modal/modal'
import { ArticlePicture } from '../../../../components/dashboard/components/Dashboard.styles'

interface Props {
  picture: Picture
}

const picFolder = config.IMAGES_BIG_URL as string

export const PictureListItemAdmin: FC<Props> = (props) => {
  const { isShown, toggle } = useModal()
  const { id, title, image } = props.picture
  const pic1 = formatUrl(picFolder, image)

  /************** actions *************************/
  const { linkUpdate, linkRemove } =
    ActionLinks({ id, path: 'pictures', toggle })

  /************** return *************************/
  return (
    <>
      <ArticlePicture>
        <div>
          <img src={pic1} alt='' />
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
