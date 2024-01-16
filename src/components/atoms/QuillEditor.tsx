import { useMemo } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import device from 'theme/mediaQueries';
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
          [{ size: ['small', false, 'large', 'huge'] }],
          ['italic', 'underline', 'strike', 'blockquote'],
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
  margin-bottom: 8px;
  border: none;
  .ql-editor.ql-blank::before {
    color: #ccc;
  }

  .ql-toolbar {
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    display: flex;
    gap: 5px;
    flex-wrap: wrap;
    &.ql-snow .ql-formats {
      margin: 0px;
    }
  }
  .ql-container {
    border-bottom-right-radius: 10px;
    border-bottom-left-radius: 10px;
    width: 100%;
    height: 55vh;
    word-break: break-all;
    font-size: 16px;
  }
  .ql-editor {
    padding: 8px 10px;
    .ql-indent-1:not(.ql-direction-rtl),
    .ql-indent-2:not(.ql-direction-rtl),
    .ql-indent-3:not(.ql-direction-rtl),
    .ql-indent-4:not(.ql-direction-rtl),
    .ql-indent-5:not(.ql-direction-rtl),
    .ql-indent-6:not(.ql-direction-rtl),
    .ql-indent-7:not(.ql-direction-rtl),
    .ql-indent-8:not(.ql-direction-rtl) {
      padding-left: 0;
      /* border: 1px solid rebeccapurple; */
    }
    p,
    blockquote,
    li {
      margin-bottom: 8px;
    }
    blockquote {
      padding-top: 3px;
      color: #666;
      &.ql-indent-1:not(.ql-direction-rtl),
      &.ql-indent-2:not(.ql-direction-rtl),
      &.ql-indent-3:not(.ql-direction-rtl),
      &.ql-indent-4:not(.ql-direction-rtl),
      &.ql-indent-5:not(.ql-direction-rtl),
      &.ql-indent-6:not(.ql-direction-rtl),
      &.ql-indent-7:not(.ql-direction-rtl),
      &.ql-indent-8:not(.ql-direction-rtl) {
        padding-left: 10px;
      }
    }
    ol,
    ul {
      padding-left: 20px;
      margin-bottom: 10px;
      li {
        &:before {
          display: none;
          border: 1px solid red;
        }
        &:not(.ql-direction-rtl) {
          padding-left: 0;
        }
        &:not(.ql-direction-rtl)::before {
          margin: 0;
          padding-left: 0;
          text-align: center;
        }
      }
    }
    ul {
      li {
        list-style-type: disc;
      }
    }
    ol {
      li {
        list-style-type: decimal;
      }
    }
  }
  .ql-indent-1 {
    margin-left: 20px;
    padding: 0;
  }
  .ql-indent-2 {
    margin-left: 40px;
    padding: 0;
  }
  .ql-indent-3 {
    margin-left: 60px;
    padding: 0;
  }
  .ql-indent-4 {
    margin-left: 80px;
    padding: 0;
  }
  .ql-indent-5 {
    margin-left: 100px;
    padding: 0;
  }
  .ql-indent-6 {
    margin-left: 120px;
    padding: 0;
  }
  .ql-indent-7 {
    margin-left: 140px;
    padding: 0;
  }
  .ql-indent-8 {
    margin-left: 160px;
    padding: 0;
  }

  @media ${device.desktop} {
    .ql-container {
      height: 55vh;
    }
  }
`;

export default QuillEditor;
