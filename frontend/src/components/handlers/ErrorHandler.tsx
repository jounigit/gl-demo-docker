import { HandlingWrapper } from '../../styles/styles'
import { FaTimes } from 'react-icons/fa'
import { Button } from '../atoms/Button'
import { useGoBack } from '../../hooks/useGoBack';

interface Props {
  error?: Error;
}

export function ErrorHandler({ error }: Props) {
  const goBack = useGoBack()

  return (
    <HandlingWrapper $brColor='red'>
      <FaTimes color='red' />
      <h4>An error occurred:</h4>
      <p>{error?.message}</p>
      <p>{error?.name}</p>
      <Button onClick={goBack}>...takaisin</Button>
    </HandlingWrapper>
  )
}