import styled from 'styled-components';

interface Props {
  authors: string[];
  publisher: string;
}

export default function BookAuthorPublisher({ authors, publisher }: Props) {
  return (
    <Info>
      <span>
        {authors[0]}
        {authors.length !== 1 && `(외 ${authors.length - 1}명)`}
      </span>
      {publisher && <span> ・ {publisher}</span>}
    </Info>
  );
}

const Info = styled.div`
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  color: ${({ theme }) => theme.text.gray3};
  > span {
    line-height: 1;
    font-size: 14px;
    padding-top: 3px;
    color: #888;
  }
`;
