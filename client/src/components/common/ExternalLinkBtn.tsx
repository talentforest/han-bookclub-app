import { FiExternalLink } from 'react-icons/fi';

interface ExternalLinkBtnProps {
  url: string;
  title?: string;
}

export default function ExternalLinkBtn({ url, title }: ExternalLinkBtnProps) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noreferrer"
      className={`text-sm text-gray2 ${title ? 'flex items-center gap-1' : 'inline-block'}`}
    >
      <FiExternalLink />
      {title && <span className="truncate">{title}</span>}
    </a>
  );
}
