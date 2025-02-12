import type { FormInputs } from "@/types";
import JoditEditor from "jodit-react";
import { Controller, type Control } from "react-hook-form";

const config = {
  readonly: false,
  height: 400,
  // toolbarButtonSize: 'middle',
  buttons: ['bold', 'italic', 'underline', 'link', 'unlink', 'source'],
  uploader: {
      insertImageAsBase64URI: true,
  },
  toolbarAdaptive: false,
}

export function textEditorMin(
	control:  Control<FormInputs, unknown>, 
	editorRef: React.MutableRefObject<null>, 
	setContent: React.Dispatch<React.SetStateAction<string>>) {
	return <Controller
		name="content"
		control={control}
		defaultValue=""
		render={({ field: { value } }) => (
			<JoditEditor
				ref={editorRef}
				value={value}
        config={config}
				// biome-ignore lint/a11y/noPositiveTabindex: <explanation>
				tabIndex={1} 
				onBlur={(newContent) => setContent(newContent)}
				onChange={() => { } }
      />
		)} 
	/>
}

// config={{
// 	// Jodit configuration options
// 	readonly: false,
// 	placeholder: 'Start typing...',
// }}