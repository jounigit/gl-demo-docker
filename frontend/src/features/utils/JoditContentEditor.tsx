import type { FormInputs } from "@/types"
import JoditEditor from "jodit-react"
import type { SetStateAction } from "react"
import { Controller, type Control } from "react-hook-form"

type EditorProps = {
	control: Control<FormInputs, unknown>
	editorRef: React.MutableRefObject<null>
	setContent: React.Dispatch<React.SetStateAction<string>>
	buttons: Buttons
}

type Buttons = 'FULL' | 'SEMI' | 'MINIMAL'

export function JoditContentEditor({ control, editorRef, setContent, buttons }: EditorProps) {
	const fullOrNot = !!(buttons === 'FULL')
	return <Controller
		name="content"
		control={control}
		defaultValue=""
		render={({ field: { value } }) => (
			<JoditEditor
				ref={editorRef}
				value={value}
				onBlur={(newContent: SetStateAction<string>) => setContent(newContent)}
				onChange={() => { } }
				config={{
					buttons: setEditorsButtons(buttons),
					readonly: false,
					toolbarAdaptive: fullOrNot,
					placeholder: 'Start typing...',
				}}
				// biome-ignore lint/a11y/noPositiveTabindex: <explanation>
				tabIndex={1} />
		)} />
}

function setEditorsButtons(button: Buttons) {
    switch (button) {
        case 'FULL':
            return []
        case 'SEMI':
            return semiButtons
        case 'MINIMAL':
            return minimalButtons
    }
}

const semiButtons = [
	'bold', 
	'italic',
	'underline',
	'strikethrough',
	'|',
	'font',
	'fontsize',
	'|',
	'paragraph',
	'ul',
	'ol',
	'|',
	'table',
	'link',
	'|',
	'clean',
	'source',
]

const minimalButtons = [
	'bold', 
	'italic',
	'underline',
	'strikethrough',
	'|',
	'fontsize',
	'|',
	'paragraph',
	'|',
	'link',
	'|',
	'clean',
	'source',
]