import { IUserRecord } from 'data/userAtom';
import { cutLetter, getFbRoute, getLocalDate } from 'util/index';
import { IDocument } from 'data/documentsAtom';
import {
  BookImg,
  BookTitle,
  Box,
  ClubBook,
  Header,
  MyRecordModal,
  Record,
} from './MyRecord';
import { HTMLContent } from '../RecordBox';
import { useEffect, useState } from 'react';
import { getDocument } from 'api/getFbDoc';
import { ChevronRight } from '@mui/icons-material';
import Overlay from 'components/atoms/Overlay';
import UsernameBox from '../UsernameBox';
import styled from 'styled-components';

interface PropsType {
  recommendedBookId: IUserRecord;
}

const MyRecommendBook = ({ recommendedBookId }: PropsType) => {
  const { docId, monthId } = recommendedBookId;
  const [data, setData] = useState({} as IDocument);
  const [openModal, setOpenModal] = useState(false);

  const { recommendedBook, title, thumbnail, creatorId, createdAt, text } =
    data;

  const handleModal = () => {
    setOpenModal((prev) => !prev);
  };

  useEffect(() => {
    getDocument(getFbRoute(monthId).RECOMMENDED_BOOKS, docId, setData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Record>
        <BookImg src={recommendedBook?.thumbnail} alt='thumbnail' />
        <BookTitle>
          {recommendedBook?.title
            ? cutLetter(recommendedBook?.title, 6)
            : title}
        </BookTitle>
        <button onClick={handleModal}>
          보기
          <ChevronRight />
        </button>
      </Record>
      {openModal && (
        <>
          <Overlay onModalClick={handleModal} />
          <MyRecordModal>
            <Box>
              <Header>
                <UsernameBox creatorId={creatorId} />
                <span>{getLocalDate(createdAt)}</span>
              </Header>
              <RecommendedBookInfo>
                <img
                  src={recommendedBook?.thumbnail}
                  alt={`${recommendedBook?.title} thumbnail`}
                />
                <span>{recommendedBook?.title}</span>
              </RecommendedBookInfo>
              <HTMLContent dangerouslySetInnerHTML={{ __html: text }} />
              <ClubBook>
                {thumbnail && (
                  <img src={thumbnail} alt={`${title} thumbnail`} />
                )}
                {title && <span>{title}</span>}
              </ClubBook>
            </Box>
          </MyRecordModal>
        </>
      )}
    </>
  );
};

const RecommendedBookInfo = styled.div`
  padding: 10px;
  display: flex;
  align-items: center;
  font-size: 14px;
  border-radius: 10px;
  background-color: ${(props) => props.theme.text.lightGray};
  box-shadow: 1px 2px 4px rgba(0, 0, 0, 0.4);
  img {
    height: 40px;
    width: auto;
    margin-right: 8px;
  }
`;

export default MyRecommendBook;
