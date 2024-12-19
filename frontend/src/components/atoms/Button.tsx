import styled from 'styled-components'

interface Props {
	size?: number
	color?: string
	nm?: number
	width?: string
	onClick?:
		| React.MouseEventHandler<HTMLButtonElement>
		| undefined
}

export const Button = styled.button<Props>`
  display: inline-block;
  color: #5a6268;
  font-size: 0.9em;
  width: ${(props) => props.width};
  margin: ${(props) => props.size || 1}em;
  padding: 0.25em 1em;
  border: 1px solid #5a6268;
  border-radius: 3px;
  /* display: block; */
  cursor: pointer;
  text-decoration: none;

  :hover {
    background-color: #5a6268;
    color: white;
  }
`

export const TransButton = styled(Button)`
  color: #fcfcfc;
  background: rgba(255, 255, 255, 0.25);
  border: 1px solid #fcfcfc;
`

export const GreenButton = styled(Button)`
  color: #fcfcfc;
  background-color: green;
`
export const RedButton = styled(Button)`
  color: #fcfcfc;
  background-color: #fa300c;
`
export const BlueButton = styled(Button)`
  color: #fcfcfc;
  background-color: #0051ff;
`
export const ColorButton = styled(Button)`
  color: #0c0c0c;
  background-color: ${(props) => props.color};
`

export const SmallButton = styled(Button)`
  min-width: 1.8rem;
  font-size: 0.6rem;
  color: white;
  background-color: ${(props) => props.color};
`
