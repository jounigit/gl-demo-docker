import { Link } from 'react-router-dom'
import { SmallButton } from '../../components/atoms/Button'

interface Props {
  id: number;
  path: string;
  slug?: string;
  toggle?: () => void;
}

export function ActionLinks({ id, path, slug, toggle }: Props) {

  /************** links *************************/
  const link = (
    <Link to={`/dashboard/${path}/${slug}`}>
      <SmallButton color='blue'>
        Katso
      </SmallButton>
    </Link>
  )

  const linkUpdate = (
    <Link to={`/dashboard/${path}/update/${id}`}>
      <SmallButton color='green'>
        Edit
      </SmallButton>
    </Link>
  )

  const linkRemove = (
    <SmallButton
      color='red'
      onClick={() => toggle?.()}
    >
      Poista
    </SmallButton >
  )
  return { link, linkUpdate, linkRemove }
}
