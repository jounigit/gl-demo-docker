import { Link } from 'react-router-dom'
import { SmallButton } from '../../../../components/atoms/Button'

interface Props {
  id: number;
  slug?: string
  toggle?: () => void;
}

export function ActionLinks({ id, slug, toggle }: Props) {

  /************** handle remove mutation ***********************/
  const remove = (): void => {
    // opens eg. modal window in parent
    toggle?.()
  }

  /************** links *************************/
  const link = (
    <Link to={`/dashboard/albums/${slug}`}>
      <SmallButton color='blue'>
        Katso
      </SmallButton>
    </Link>
  )

  const linkUpdate = (
    <Link to={`/dashboard/albums/update/${id}`}>
      <SmallButton color='green'>
        Päivitä
      </SmallButton>
    </Link>
  )

  const linkPictures = (
    <Link to={`/dashboard/albums/choose-pictures/${id}`}>
      <SmallButton color='green'>
        valitse kuvia
      </SmallButton>
    </Link>
  )

  const linkRemove = (
    <SmallButton
      color='red'
      onClick={() => remove()}
    >
      Poista
    </SmallButton>
  )
  return { link, linkUpdate, linkRemove, linkPictures }
}
