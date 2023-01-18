import { IUserRecord } from 'data/userAtom';
import { cutLetter, getFbRoute, getLocalDate } from 'util/index';
import { IDocument } from 'data/documentsAtom';
import {
  BookImg,
  BookTitle,
  Box,
  BoxFooter,
  ClubBookInfo,
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

  const handleModal = () => {
    setOpenModal((prev) => !prev);
  };

  useEffect(() => {
    getDocument(getFbRoute(monthId).RECOMMEND, docId, setData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Record>
        <BookImg src={data.recommendBookThumbnail} alt='thumbnail' />
        <BookTitle>
          {data.recommendBookTitle
            ? cutLetter(data.recommendBookTitle, 6)
            : data.title}
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
              <UsernameBox creatorId={data.creatorId} />
              <RecommendedBookInfo>
                <img
                  src={data.recommendBookThumbnail}
                  alt={`${data.recommendBookTitle} thumbnail`}
                />
                <span>{data.recommendBookTitle}</span>
              </RecommendedBookInfo>
              <HTMLContent dangerouslySetInnerHTML={{ __html: data.text }} />
              <BoxFooter>
                <ClubBookInfo>
                  {data.thumbnail && (
                    <img src={data.thumbnail} alt={`${data.title} thumbnail`} />
                  )}
                  {data.title && <span>{data.title}</span>}
                </ClubBookInfo>
                <span>{getLocalDate(data.createdAt)}</span>
              </BoxFooter>
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
