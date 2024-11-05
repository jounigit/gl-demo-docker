import type { Picture } from '../../types'
import { formatUrl } from './utils'

interface Props {
    data: Picture[];
    url: string;
    onDivClick: (item: Picture) => void;
  }

export function ImagesLinkDiv({ data, url, onDivClick }: Props): JSX.Element {
  return (
    <>
      {
        data.map((item) => (
          // biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
          <div
            key={item.id}
            onClick={() => onDivClick(item)}
          >
            <img src={formatUrl(url, item.image)} alt="" />
          </div>
        )
        )
      }
    </>
  )
}