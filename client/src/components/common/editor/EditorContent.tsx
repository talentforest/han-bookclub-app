interface Props {
  text: string;
  lineClamp?: number;
}

export default function EditorContent({ text, lineClamp }: Props) {
  const lineClampStyle = `line-clamp-[${lineClamp}]`;

  return (
    <p
      className={`min-h-12 w-full truncate whitespace-pre-line leading-7 ${lineClampStyle}`}
      dangerouslySetInnerHTML={{ __html: text }}
    />
  );
}
