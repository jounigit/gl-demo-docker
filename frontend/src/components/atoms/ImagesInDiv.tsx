import styled from 'styled-components'
import type { Picture } from '../../types'
import { formatUrl } from './utils'

interface Props {
    data: Picture[];
    url: string;
    showInfo?: false | true | undefined;
}

const Txt = styled.p`
  color: var(--gray-4);
  font-size: 0.95rem;
`

export function ImagesInDiv({ data, url, showInfo=true }: Props): JSX.Element {

  return (
    <>
      {
        data.map((item) => (
          <div key={item.id}>
            <img src={formatUrl(url, item.image)} alt="" />
            {showInfo &&
              picData(item)
            }
          </div>
        )
        )
      }
    </>
  )

  function picData(item: Picture) {
    return <>
      {item.title && <h4>{item.title}</h4>}
      {item.year && <Txt>{item.year}</Txt>}
      {item.content && <Txt>{item.content}</Txt>}
    </>
  }
}