import { useRef } from 'react';
import JoditEditor from 'jodit-react';
import { configMinimal } from './configsForEditor';

const MyEditor = ( ) => {
  const editor = useRef(null)
  const config = configMinimal;
  // const value = per ? per : ''
  // console.log({per})
  return (
    <div>
      <JoditEditor
        ref={editor}
        value={''} // You can set initial content here
        config={config}
        // biome-ignore lint/a11y/noPositiveTabindex: <explanation>
        tabIndex={1} // tabIndex for focus management
        onChange={(newContent) => {
          console.log(newContent);
        }}
      />
    </div>
  );
};

export default MyEditor;
