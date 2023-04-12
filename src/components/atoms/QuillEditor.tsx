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
  border-radius: 10px;
  width: 100%;
  border: none;
  .ql-toolbar {
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
  }
  .ql-container {
    border-bottom-right-radius: 10px;
    border-bottom-left-radius: 10px;
    width: 100%;
    height: 50vh;
    word-break: break-all;
    font-size: 16px;
    padding-bottom: 20px;
  }
  .ql-editor p {
    margin-bottom: 5px;
  }
  .ql-editor blockquote {
    margin: 8px 0;
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
  .ql-indent-3 {
    margin-left: 70px;
    padding: 0;
  }
  .ql-indent-4 {
    margin-left: 90px;
    padding: 0;
  }
  .ql-indent-5 {
    margin-left: 110px;
    padding: 0;
  }
  .ql-indent-6 {
    margin-left: 130px;
    padding: 0;
  }
  .ql-indent-7 {
    margin-left: 150px;
    padding: 0;
  }
  .ql-indent-8 {
    margin-left: 170px;
    padding: 0;
  }
  @media ${device.desktop} {
    .ql-container {
      height: 55vh;
    }
  }
`;

export default QuillEditor;
