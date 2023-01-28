import { IUserRecord } from 'data/userAtom';
import { cutLetter, getFbRoute, getLocalDate, existDocObj } from 'util/index';
import { IDocument } from 'data/documentsAtom';
import {
  BookImg,
  BookTitle,
  Box,
  Btn,
  Header,
  MyRecordModal,
  Record,
} from './MyRecord';
import { Footer, Likes, ScrollContent } from '../RecordBox';
import { useEffect, useState } from 'react';
import { getDocument } from 'api/getFbDoc';
import { ArrowForwardIos, Favorite } from '@mui/icons-material';
import Overlay from 'components/atoms/Overlay';
import UsernameBox from '../UsernameBox';
import styled from 'styled-components';
import BookImgTitle from 'components/atoms/BookImgTitle';

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
    text,
    likes,
    likeUsers,
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
        <Record onClick={handleModal}>
          <BookImg src={recommendedBook?.thumbnail} alt='thumbnail' />
          <BookTitle>
            {recommendedBook?.title
              ? cutLetter(recommendedBook?.title, 12)
              : title}
          </BookTitle>
          <Btn>
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
              <ScrollContent dangerouslySetInnerHTML={{ __html: text }} />
              <Footer>
                <BookImgTitle thumbnail={thumbnail} title={title} smSize />
                <Likes $nonClick>
                  {!!likes && (
                    <>
                      <span>{likeUsers?.length || 0}명이 좋아합니다</span>
                      <Favorite />
                    </>
                  )}
                </Likes>
              </Footer>
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
  background-color: #f4f4f4;
  box-shadow: ${(props) => props.theme.boxShadow};
  img {
    height: 50px;
    width: auto;
    margin-right: 8px;
    box-shadow: ${(props) => props.theme.boxShadow};
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
