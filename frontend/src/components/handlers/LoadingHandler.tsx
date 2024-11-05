import { HandlingWrapper } from '../../styles/styles'
import { LoadingSpinner } from '../atoms'

interface Props {
  mt?: number;
}

export function LoadingHandler({ mt }: Props) {
  return (
    <HandlingWrapper $brColor='green'>
      <LoadingSpinner mt={mt} c='green' />
    </HandlingWrapper>
  )
}