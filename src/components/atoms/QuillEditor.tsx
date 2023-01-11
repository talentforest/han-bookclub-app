import { useMemo } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import styled from 'styled-components';
import device from 'theme/mediaQueries';

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
  width: 100%;
  .ql-container {
    width: 100%;
    height: 45vh;
    word-break: break-all;
    font-size: 16px;
  }
  @media ${device.desktop} {
    .ql-container {
      height: 55vh;
    }
  }
`;

export default QuillEditor;
