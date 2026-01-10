interface EditorContentProps {
  text: string;
  className?: string;
}

export default function EditorContent({ text, className }: EditorContentProps) {
  const replacedText = text.replaceAll('📍', '');

  return (
    <p
      className={`whitespace-pre-wrap break-all leading-[26px] ${className}`}
      dangerouslySetInnerHTML={{ __html: replacedText }}
    />
  );
}
