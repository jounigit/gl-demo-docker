import Pictures from '@/features/picture/components/Pictures'
import { FadeDiv } from '../components/atoms'
const GalleriaPage = (): JSX.Element => {
	return (
		<FadeDiv $timein='0.3s'>
			<Pictures />
		</FadeDiv>
	)
}

export default GalleriaPage
