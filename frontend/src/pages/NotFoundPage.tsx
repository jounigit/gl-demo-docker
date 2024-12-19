import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { BaseContainer } from '../styles/styles'

const Wrapper = styled(BaseContainer)`
  display: flex;
  flex-direction: column;
  width: 60%;
  padding: 1.5rem;
  margin: auto;
  margin-top: 2rem;
  h4 {
    display: block;
  }
  p { display: block; }
`

const NotFoundPage = () => (
	<Wrapper>
		<h4>404 - Page Not Found!</h4>
		<Link to='/'>Go Home</Link>
	</Wrapper>
)

export default NotFoundPage
