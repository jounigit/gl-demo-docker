import { configMinimal } from "@/components/editor/configsForEditor";
import type { FormInputs } from "@/types";
import JoditEditor from "jodit-react";
import { Controller, type Control } from "react-hook-form";

export function joditTextEditor(
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
				onBlur={(newContent) => setContent(newContent)}
				onChange={() => { } }
				config={configMinimal}
				// biome-ignore lint/a11y/noPositiveTabindex: <explanation>
				tabIndex={1} />
		)} 
	/>
}

// config={{
// 	// Jodit configuration options
// 	readonly: false,
// 	placeholder: 'Start typing...',
// }}