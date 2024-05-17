import styled from 'styled-components';

interface Props {
  authors: string[];
  publisher: string;
  fontSize?: number;
}

export default function BookAuthorPublisher({
  authors,
  publisher,
  fontSize = 14,
}: Props) {
  return (
    <Info $fontSize={fontSize}>
      <span>
        {authors[0]}
        {authors.length !== 1 && `(외 ${authors.length - 1}명)`}
      </span>
      {publisher && <span> ・ {publisher}</span>}
    </Info>
  );
}

const Info = styled.div<{ $fontSize: number }>`
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  color: ${({ theme }) => theme.text.gray3};
  > span {
    line-height: 1.4;
    font-size: ${({ $fontSize }) => `${$fontSize}px`};
    padding-top: 3px;
    color: #888;
  }
`;
