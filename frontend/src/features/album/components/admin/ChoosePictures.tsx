import { useParams } from 'react-router-dom'
import { useAlbum } from '../../useAlbum'
import { Button } from '@/components/atoms/Button'
import {
	ImgContainerDb,
	ImgGridDb
} from '@/components/dashboard/components/Dashboard.styles'
import {
	addPictureToAlbum,
	deletePictureFromAlbum
} from '@/features/albumpictures'
import {
	useAlbumPictures,
	useAddAlbumPicture,
	useDeleteAlbumPicture
} from '@/features/albumpictures/useAlbumPictures'
import { usePictures } from '@/features/picture/usePicture'
import ImageChoise from '@/features/utils/ImageChoise'
import { useGoBack } from '@/hooks/useGoBack'
import { Divider } from '@/styles/styles'
import { isPictureArray } from '@/types'

const ChoosePictures = () => {
	const params = useParams()
	const albumId = Number(params.id)
	const { data: Album } = useAlbum(albumId)
	const { data: Pictures } = usePictures()
	const { data: AllAlbumPics } = useAlbumPictures()
	const { mutate: addPicture } = useAddAlbumPicture()
	const { mutate: deleteAPic } = useDeleteAlbumPicture()
	const goBack = useGoBack()

	if (Pictures && AllAlbumPics && Album) {
		const { title, pictures: albumPics } = Album
		console.log({ Album, albumPics })
		// ::::::::::: actions ::::::::::::::::::::::::: //
		const handleSelected = addPictureToAlbum(
			albumId,
			addPicture
		)

		const handleDelete = deletePictureFromAlbum(
			albumId,
			deleteAPic
		)

		// ::::::::: handle pictures ::::::::::::::::: //
		const unChosenPics =
			albumPics === undefined || albumPics.length === 0
				? Pictures
				: Pictures.map((pic) =>
						albumPics.some((aPic) => aPic.id === pic.id)
							? null
							: pic
					).filter((p) => p !== null)

		const chosenPics = albumPics.map((p) => (
			<div key={p.id}>
				<ImageChoise
					picture={p}
					btnTxt='Poista kuva'
					btnColor='red'
					handleChoise={handleDelete}
				/>
			</div>
		))

		const chooseablePics =
			isPictureArray(unChosenPics) &&
			unChosenPics.map((p) => (
				<div key={p.id}>
					<ImageChoise
						picture={p}
						btnTxt='Valitse kuva'
						btnColor='green'
						handleChoise={handleSelected}
					/>
				</div>
			))

		const showChosen = albumPics.length ? (
			chosenPics
		) : (
			<h4>No pictures yet.</h4>
		)

		// :::::::::::::::::::::::::::::::::::: //
		return (
			<>
				<Button onClick={goBack}>...takaisin</Button>

				<h2 style={{ marginLeft: '20px' }}>
					{title}{' '}
					<span className='h3'>- valitse kuvia</span>
				</h2>

				<Divider />

				<h4 style={{ margin: '10px 0 0 20px' }}>
					VALITUT KUVAT:
				</h4>
				<ImgContainerDb>
					<ImgGridDb
						$width={180}
						$imgheight={180}
						$gap='.8rem'
					>
						{showChosen}
					</ImgGridDb>
				</ImgContainerDb>

				<Divider />

				<h4 style={{ marginLeft: '20px' }}>
					VALITTAVAT KUVAT:
				</h4>
				<ImgContainerDb>
					<ImgGridDb $width={190} $imgheight={160}>
						{chooseablePics}
					</ImgGridDb>
				</ImgContainerDb>
			</>
		)
	}
	return <p>No data here.</p>
}

export default ChoosePictures
