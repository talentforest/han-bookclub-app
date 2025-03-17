interface Props {
  text: string;
  lineClamp?: number;
}

export default function EditorContent({ text, lineClamp }: Props) {
  const lineClampStyle = `line-clamp-[${lineClamp}]`;

  return (
    <p
      className={`ql-editor min-h-12 w-full truncate whitespace-pre-line !p-0 leading-7 ${lineClamp ? lineClampStyle : ''}`}
      dangerouslySetInnerHTML={{ __html: text }}
    />
  );
}
