import { IUserRecord } from 'data/userAtom';
import { cutLetter, getFbRoute, getLocalDate, existDocObj } from 'util/index';
import { IDocument } from 'data/documentsAtom';
import {
  BookImg,
  BookTitle,
  Box,
  Btn,
  ClubBook,
  Header,
  MyRecordModal,
  Record,
} from './MyRecord';
import { HTMLContent } from '../RecordBox';
import { useEffect, useState } from 'react';
import { getDocument } from 'api/getFbDoc';
import { ArrowForwardIos } from '@mui/icons-material';
import Overlay from 'components/atoms/Overlay';
import UsernameBox from '../UsernameBox';
import styled from 'styled-components';

interface PropsType {
  recommendedBookId: IUserRecord;
}

const MyRecommendBook = ({ recommendedBookId }: PropsType) => {
  const { docId, monthId } = recommendedBookId;
  const [myRecommendedBook, setMyRecommendedBook] = useState({} as IDocument);
  const [openModal, setOpenModal] = useState(false);
  const {
    recommendedBook,
    title,
    thumbnail,
    creatorId,
    createdAt,
    text, //
  } = myRecommendedBook;
  const route = getFbRoute(monthId).RECOMMENDED_BOOKS;

  useEffect(() => {
    getDocument(route, docId, setMyRecommendedBook);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleModal = () => setOpenModal((prev) => !prev);

  return (
    <>
      {existDocObj(myRecommendedBook) && (
        <Record>
          <BookImg src={recommendedBook?.thumbnail} alt='thumbnail' />
          <BookTitle>
            {recommendedBook?.title
              ? cutLetter(recommendedBook?.title, 12)
              : title}
          </BookTitle>
          <Btn onClick={handleModal}>
            보기
            <ArrowForwardIos />
          </Btn>
        </Record>
      )}
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
                <Detail>
                  <h5>{recommendedBook?.title}</h5>
                  <span>{recommendedBook?.authors}</span>
                  <a href={recommendedBook?.url}>상세정보 보러가기</a>
                </Detail>
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
    height: 50px;
    width: auto;
    margin-right: 8px;
    box-shadow: 1px 2px 2px rgba(0, 0, 0, 0.4);
  }
`;
const Detail = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  font-size: 11px;
  h5 {
    font-size: 14px;
  }
  a {
    color: ${(props) => props.theme.text.accent};
  }
`;

export default MyRecommendBook;
