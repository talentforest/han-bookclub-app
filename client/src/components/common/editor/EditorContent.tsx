interface EditorContentProps {
  text: string;
  lineClamp?: number;
}

export default function EditorContent({ text, lineClamp }: EditorContentProps) {
  const lineClampStyle = `line-clamp-[${lineClamp}]`;

  const replacedText = text.replaceAll('📍', '');

  return (
    <p
      className={`ql-editor min-h-12 w-full truncate whitespace-pre-line !p-0 leading-7 ${lineClamp ? lineClampStyle : ''}`}
      dangerouslySetInnerHTML={{ __html: replacedText }}
    />
  );
}
