import { useMemo } from 'react';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface QuillEditorProps {
  placeholder?: string;
  text: string;
  setText?: (text: string) => void;
}

const QuillEditor = ({ placeholder, text, setText }: QuillEditorProps) => {
  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ size: ['small', false, 'large'] }],
          [{ color: [] as string[] }],
          ['italic', 'underline', 'blockquote'],
          [{ list: 'ordered' }, { list: 'bullet' }],
          ['link'],
        ],
      },
    }),
    [],
  );

  return (
    <ReactQuill
      value={text}
      onChange={setText}
      modules={modules}
      placeholder={placeholder}
      className="mb-2 w-full rounded-xl border-0 bg-white"
    />
  );
};

export default QuillEditor;
