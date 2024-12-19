import { useRef, useState } from 'react'
import { MdCloudUpload, MdDelete } from 'react-icons/md'
import { AiFillFileImage } from 'react-icons/ai'
import { GreenButton } from '@/components/atoms'
import {
	FileFormWrapper,
	FileForm,
	UploadedRow,
	UploadContent
} from './FileForm.style'

type Props = {
	handleFile: (file: File) => void
}

const FileUploader = ({ handleFile }: Props) => {
	const [previewUrl, setPreviewUrl] = useState<
		string | null
	>(null)
	const [fileName, setFileName] = useState(
		'No selected file'
	)
	const [file, setFile] = useState<File>()
	const hiddenFileInput = useRef<HTMLInputElement>(null)

	console.log('Hiddefile: ', hiddenFileInput)

	const handleClick = () => {
		hiddenFileInput.current?.click()
	}

	const uploadFile = () => {
		file && handleFile(file)
	}

	const handleDelete = () => {
		setFileName('No selected file')
		setPreviewUrl(null)
	}

	const handleChange = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		const selectedFiles = event.target.files as FileList
		const fileUploaded = selectedFiles?.[0]
		setFile(fileUploaded)
		setFileName(fileUploaded.name)
		setPreviewUrl(URL.createObjectURL(selectedFiles?.[0]))
	}

	return (
		<FileFormWrapper>
			<FileForm onClick={() => handleClick()}>
				<input
					type='file'
					accept='image/*'
					hidden
					ref={hiddenFileInput}
					onChange={handleChange}
				/>

				{previewUrl ? (
					<img
						src={previewUrl}
						width={250}
						height={250}
						alt={fileName}
					/>
				) : (
					<>
						<MdCloudUpload color='#1475cf' size={60} />
						<p>Browse Files to upload</p>
					</>
				)}
			</FileForm>

			<UploadedRow>
				<AiFillFileImage color='#1475cf' />
				<UploadContent>
					{fileName} -
					<MdDelete
						style={{ cursor: 'pointer' }}
						onClick={() => handleDelete()}
					/>
				</UploadContent>
			</UploadedRow>
			<GreenButton onClick={() => uploadFile()}>
				Upload a file
			</GreenButton>
		</FileFormWrapper>
	)
}

export default FileUploader
