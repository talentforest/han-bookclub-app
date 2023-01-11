import { useMemo } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import styled from 'styled-components';

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
          [{ size: ['small', false, 'large', 'huge'] }, { color: [] }],
          ['bold', 'italic', 'underline', 'strike', 'blockquote'],
          [{ list: 'ordered' }, { list: 'bullet' }, { align: [] }],
          ['link'],
        ],
      },
    }),
    []
  );

  return (
    <Editor
      value={text}
      onChange={setText}
      modules={modules}
      placeholder={placeholder}
    />
  );
};

const Editor = styled(ReactQuill)`
  background-color: white;
  height: 100%;
  overflow: scroll;
  .ql-container {
    margin-bottom: 0;
    width: 100%;
    word-break: break-all;
    font-size: 16px;
  }
`;

export default QuillEditor;