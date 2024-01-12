import styled from 'styled-components';
import BookThumbnail from '../BookThumbnailImg';
import { IBookApi } from 'data/bookAtom';

interface Props {
  book: IBookApi;
}

export default function ChallengeBookBox({ book }: Props) {
  const { title, thumbnail } = book;

  return (
    <Box>
      <BookThumbnail title={title} thumbnail={thumbnail} />
      <div>
        <h1>{title}</h1>
      </div>
    </Box>
  );
}

const Box = styled.div`
  border-radius: 10px;
  background-color: #fff;
  padding: 10px;
`;
