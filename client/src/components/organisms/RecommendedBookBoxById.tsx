import { getDocument } from 'api/getFbDoc';
import { useEffect, useState } from 'react';
import { IDocument } from 'data/documentsAtom';
import { IBookClub } from 'data/bookClubAtom';
import { Link } from 'react-router-dom';
import { getLocaleDate } from 'util/index';
import { HiMiniArrowUpRight } from 'react-icons/hi2';
import PostRecommendedBookBox from './PostRecommendedBookBox';
import BookThumbnail from 'components/atoms/book/BookThumbnail';
import BookAuthorPublisher from 'components/atoms/book/BookAuthorPublisher';
import styled from 'styled-components';

interface Props {
  docIds: { docId: string; monthId: string };
}

export default function RecommendedBookBoxById({
  docIds: { docId, monthId },
}: Props) {
  const [recommendedBookDoc, setRecommendedBookDoc] = useState<IDocument>();
  const [clubBookDoc, setClubBookDoc] = useState<IBookClub>();

  const year = monthId.slice(0, 4);

  const collection = `BookClub-${year}/${monthId}/RecommendedBooks/`;

  useEffect(() => {
    getDocument(`BookClub-${year}`, monthId, setClubBookDoc);
    getDocument(collection, docId, setRecommendedBookDoc);
  }, []);

  return (
    <>
      {recommendedBookDoc && (
        <PostRecommendedBookBox
          recommendedBookDoc={recommendedBookDoc}
          collName={collection}
        >
          <Date>{getLocaleDate(recommendedBookDoc.createdAt)}</Date>
          <Title>추천책이 나왔던 모임책</Title>
          <ClubBookBox
            to={`/history/${monthId}`}
            state={{ document: clubBookDoc }}
          >
            <BookThumbnail
              thumbnail={clubBookDoc.book.thumbnail}
              title={clubBookDoc.book.title}
            />
            <div>
              <h5 className='title'>{clubBookDoc.book.title}</h5>
              <BookAuthorPublisher
                authors={clubBookDoc.book.authors}
                publisher={clubBookDoc.book.publisher}
                fontSize={13}
              />
            </div>
            <HiMiniArrowUpRight className='arrow-right' />
          </ClubBookBox>
        </PostRecommendedBookBox>
      )}
    </>
  );
}

const Date = styled.span`
  font-size: 14px;
  color: ${({ theme }) => theme.text.gray3};
  text-align: end;
`;

const Title = styled.h5`
  font-size: 15px;
  font-weight: 500;
`;

const ClubBookBox = styled(Link)`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 10px;
  border: 1px solid ${({ theme }) => theme.container.gray};
  box-shadow: ${({ theme }) => theme.boxShadow};
  border-radius: 12px;
  padding: 6px 10px;
  background-color: ${({ theme }) => theme.container.blue1};
  img {
    height: 45px;
  }
  > div {
    flex: 1;
    .title {
      font-size: 14px;
      font-weight: 500;
    }
  }
  .arrow-right {
    align-self: flex-end;
    fill: ${({ theme }) => theme.text.gray3};
  }
`;
