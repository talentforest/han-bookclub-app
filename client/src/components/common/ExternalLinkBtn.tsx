import { FiExternalLink } from 'react-icons/fi';

interface ExternalLinkBtnProps {
  url: string;
  title?: string;
  className?: string;
}

export default function ExternalLinkBtn({
  url,
  title,
  className = '',
}: ExternalLinkBtnProps) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noreferrer"
      className={`p-2 text-[15px] text-gray1 ${title ? 'flex items-center gap-1' : 'inline-block'} ${className}`}
    >
      <FiExternalLink className="size-full" />
      {title && <span className="truncate">{title}</span>}
    </a>
  );
}
