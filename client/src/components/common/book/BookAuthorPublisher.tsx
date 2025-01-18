interface BookAuthorPublisherProps {
  authors: string[];
  publisher: string;
}

export default function BookAuthorPublisher({
  authors,
  publisher,
}: BookAuthorPublisherProps) {
  return (
    <div className="flex items-center gap-1 truncate text-gray2">
      <span className="text-sm">
        {authors?.[0]}
        {authors?.length !== 1 && `(외 ${authors?.length - 1}명)`}
      </span>

      {publisher && <span className="text-sm"> ・ {publisher}</span>}
    </div>
  );
}
