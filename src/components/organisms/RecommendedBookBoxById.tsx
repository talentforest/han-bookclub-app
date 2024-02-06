import { getDocument } from 'api/getFbDoc';
import { useEffect, useState } from 'react';
import { cutLetter } from 'util/index';
import { IDocument } from 'data/documentsAtom';
import UserName from 'components/atoms/UserName';
import BookThumbnail from 'components/atoms/BookThumbnail';
import device from 'theme/mediaQueries';
import styled from 'styled-components';

interface Props {
  docIds: { docId: string; monthId: string };
}

export default function RecommendedBookBoxById({ docIds }: Props) {
  const [recommendedBookDoc, setRecommendedBookDoc] = useState<IDocument>();

  const { docId, monthId } = docIds;

  const year = monthId.slice(0, 4);

  useEffect(() => {
    getDocument(
      `BookClub-${year}/${monthId}/RecommendedBooks/`,
      docId,
      setRecommendedBookDoc
    );
  }, []);

  const { creatorId, recommendedBook } = recommendedBookDoc || {};

  const { title, thumbnail } = recommendedBook || {};

  return (
    <RecommendedBookItem>
      <div className='bookimg'>
        <BookThumbnail title={title} thumbnail={thumbnail} />
      </div>

      <div className='title'>{title && <h4>{cutLetter(title, 7)}</h4>}</div>

      <UserName creatorId={creatorId} />
    </RecommendedBookItem>
  );
}

const RecommendedBookItem = styled.li`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  gap: 8px;
  margin-top: 30px;
  width: 120px;
  height: 130px;
  background-color: #fff;
  padding: 5px 3px 7px;
  border-radius: 10px;
  box-shadow: ${({ theme }) => theme.boxShadow};
  .bookimg {
    position: absolute;
    height: 100px;
    top: -25px;
  }
  .title {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 2px;
    h4 {
      font-size: 14px;
      color: #aaa;
      line-height: 1;
    }
  }
  @media ${device.tablet} {
    width: 125px;
    height: 145px;
    gap: 4px;
    .bookimg {
      height: 110px;
    }
    .title {
      margin-bottom: 5px;
      h4 {
        font-size: 15px;
        color: #888;
      }
    }
  }
`;
