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
          [{ size: ['small', false, 'large'] }],
          [{ color: [] }],
          ['italic', 'underline', 'blockquote'],
          [{ list: 'ordered' }, { list: 'bullet' }],
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

    p,
    blockquote,
    li {
      margin-bottom: 8px;
    }

    blockquote {
      padding-left: 8px;
      padding-top: 2px;
      color: #666;
    }

    span {
      font-size: 16px;
    }

    ol,
    ul {
      padding-left: 20px;
      margin-bottom: 5px;
      li {
        &:before {
          display: none;
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
    a {
      font-size: 15px;
      color: ${({ theme }) => theme.text.blue1};
      text-decoration: underline;
    }
  }

  @media ${device.desktop} {
    .ql-container {
      height: 55vh;
    }
  }
`;

export default QuillEditor;
