import { useMemo } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import styled from "styled-components";

interface QuillEditorProps {
  editing: boolean;
  placeholder?: string;
  content: string;
  setContent: (content: string) => void;
}

const QuillEditor = ({
  editing,
  placeholder,
  content,
  setContent,
}: QuillEditorProps) => {
  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ size: ["small", false, "large", "huge"] }, { color: [] }],
          ["bold", "italic", "underline", "strike", "blockquote"],
          [{ list: "ordered" }, { list: "bullet" }, { align: [] }],
        ],
      },
    }),
    []
  );
  return (
    <>
      {editing ? (
        <Editor
          value={content}
          onChange={setContent}
          modules={modules}
          placeholder={placeholder}
        />
      ) : (
        <HTMLContent
          className="view ql-editor"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      )}
    </>
  );
};

const Editor = styled(ReactQuill)`
  background-color: white;
  margin-bottom: 10px;
  width: 100%;
  .ql-container {
    width: 100%;
    word-break: break-all;
    height: 60vh;
    font-size: 16px;
  }
`;

const HTMLContent = styled.div`
  margin-bottom: 10px;
  padding: 0;
`;

export default QuillEditor;
