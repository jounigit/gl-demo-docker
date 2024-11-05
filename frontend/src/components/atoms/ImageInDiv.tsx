import type { Picture } from '../../types'
import { formatUrl } from './utils'

interface Props {
    data: Picture;
    url: string;
    height?: string;
  }

export function ImageInDiv({ data, url }: Props): JSX.Element {
  return (
    <>
      {
        <div>
          <img src={formatUrl(url, data.image)} alt="" />
        </div>
      }
    </>
  )
}
