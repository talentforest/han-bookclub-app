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
          [
            { list: 'ordered' },
            { list: 'bullet' },
            { indent: '-1' },
            { indent: '+1' },
            { align: [] },
          ],
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
  .ql-editor ul,
  .ql-editor ol {
    padding-left: 20px;
    margin-bottom: 10px;
    li {
      margin-bottom: 5px;
    }
    li:before {
      display: none;
    }
    li:not(.ql-direction-rtl) {
      padding-left: 0;
    }
    li:not(.ql-direction-rtl)::before {
      margin: 0;
      padding-left: 0;
      text-align: center;
    }
    .ql-indent-1:not(.ql-direction-rtl) {
      padding-left: 0;
    }
  }
  .ql-editor ul {
    li {
      list-style-type: circle;
    }
  }
  .ql-editor ol {
    li {
      list-style-type: decimal;
    }
  }
  .ql-indent-1 {
    margin-left: 30px;
    padding: 0;
  }
  .ql-indent-2 {
    margin-left: 50px;
    padding: 0;
  }
  @media ${device.desktop} {
    .ql-container {
      height: 55vh;
    }
  }
`;

export default QuillEditor;
