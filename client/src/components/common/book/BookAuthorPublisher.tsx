interface BookAuthorPublisherProps {
  authors: string[];
  publisher: string;
}

export default function BookAuthorPublisher({
  authors,
  publisher,
}: BookAuthorPublisherProps) {
  return (
    <span className="line-clamp-1 truncate whitespace-pre-wrap text-sm tracking-tight text-gray1">
      {authors.length !== 0 ? (
        <span>
          {authors[0]}
          {authors.length !== 1 && `(외 ${authors.length - 1}명)`}
        </span>
      ) : (
        <span className="text-gray1">정보 없음</span>
      )}

      {publisher && <span> ・ {publisher}</span>}
    </span>
  );
}
