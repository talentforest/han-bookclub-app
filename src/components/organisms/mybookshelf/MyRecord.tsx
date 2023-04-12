import { IUserRecord } from 'data/userAtom';
import { cutLetter, getFbRoute, getLocalDate, existDocObj } from 'util/index';
import { ArrowForwardIos, Book } from '@mui/icons-material';
import { IDocument } from 'data/documentsAtom';
import { useEffect, useState } from 'react';
import { getDocument } from 'api/getFbDoc';
import { Modal } from '../bookclubthismonth/SubjectCreateModal';
import { ScrollContent, RegisterTime } from '../RecordBox';
import { skeletonAnimation } from 'theme/skeleton';
import styled from 'styled-components';
import device from 'theme/mediaQueries';
import Overlay from 'components/atoms/Overlay';
import UsernameBox from '../UsernameBox';
import RecordFooter from 'components/atoms/RecordFooter';
import BookRatingBox from '../BookRatingBox';

interface PropsType {
  recordId: IUserRecord;
  recordSort?: string;
}

const MyRecord = ({ recordId, recordSort }: PropsType) => {
  const { docId, monthId } = recordId;
  const [record, setRecord] = useState({} as IDocument);
  const [openModal, setOpenModal] = useState(false);

  const getRecordRoute = () => {
    if (recordSort === 'subjects') return getFbRoute(monthId).SUBJECTS;
    if (recordSort === 'reviews') return getFbRoute(monthId).REVIEWS;
    if (recordSort === 'hostReview') return getFbRoute(monthId).HOST_REVIEW;
  };

  useEffect(() => {
    if (docId) {
      getDocument(getRecordRoute(), docId, setRecord);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleModal = () => setOpenModal((prev) => !prev);

  return (
    <>
      {existDocObj(record) ? (
        <>
          <Record onClick={handleModal}>
            {record.thumbnail ? (
              <BookImg
                src={record.thumbnail}
                alt={`${record.title} thumbnail`}
              />
            ) : (
              <Book />
            )}
            <BookTitle>
              {record.title ? cutLetter(record.title, 15) : '이벤트'}
            </BookTitle>
            <Btn>
              보기
              <ArrowForwardIos />
            </Btn>
          </Record>
          {openModal && (
            <>
              <Overlay onModalClick={handleModal} />
              <MyRecordModal>
                <Box>
                  <Header>
                    <UsernameBox creatorId={record?.creatorId} />
                    <RegisterTime>
                      {getLocalDate(record?.createdAt)}
                    </RegisterTime>
                  </Header>
                  {!!record.rating && (
                    <BookRatingBox
                      thumbnail={record.thumbnail}
                      title={record.title}
                      rating={record.rating}
                      readOnly
                    />
                  )}
                  <ScrollContent
                    dangerouslySetInnerHTML={{ __html: record.text }}
                  />
                  <RecordFooter record={record} />
                </Box>
              </MyRecordModal>
            </>
          )}
        </>
      ) : (
        <Record $skeleton>
          <svg></svg>
          <span></span>
          <span></span>
        </Record>
      )}
    </>
  );
};

export const Record = styled.li<{ $skeleton?: boolean }>`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 140px;
  padding: 10px 5px;
  border-radius: 10px;
  background-color: #fff;
  border: 1px solid ${(props) => props.theme.text.lightGray};
  box-shadow: ${(props) => props.theme.boxShadow};
  &:hover {
    background-color: ${(props) => props.theme.container.lightBlue};
  }
  > svg {
    border-radius: 5px;
    height: 55px;
    width: 60px;
    ${(props) => (props.$skeleton ? skeletonAnimation : '')};
  }
  > span {
    height: 20px;
    border-radius: 5px;
    width: 80%;
    ${(props) => (props.$skeleton ? skeletonAnimation : '')};
  }

  @media ${device.tablet} {
    padding: 10px;
    height: 170px;
  }
`;
export const BookImg = styled.img`
  margin-bottom: 5px;
  height: 50px;
  box-shadow: ${(props) => props.theme.boxShadow};
  @media ${device.tablet} {
    height: 70px;
  }
`;
export const BookTitle = styled.h4`
  font-weight: 700;
  font-size: 12px;
  text-align: center;
  @media ${device.tablet} {
    font-size: 14px;
  }
`;
export const Btn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2px;
  font-size: 12px;
  margin-left: 2px;
  svg {
    margin-top: 1px;
    height: 12px;
    width: 12px;
  }
  &:hover {
    color: ${(props) => props.theme.container.blue};
    svg {
      fill: ${(props) => props.theme.container.blue};
    }
  }
  @media ${device.tablet} {
    font-size: 14px;
  }
`;
export const MyRecordModal = styled(Modal)`
  max-height: 82vh;
  border: 1px solid red;
  padding: 0;
  background-color: transparent;
`;
export const Box = styled.article`
  width: 100%;
  background-color: ${(props) => props.theme.container.default};
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  gap: 8px;
  padding: 12px 15px;
  box-shadow: ${(props) => props.theme.boxShadow};
  @media ${device.tablet} {
    padding: 20px;
    gap: 15px;
  }
`;
export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
`;
export const ClubBook = styled.div`
  margin-top: 10px;
  display: flex;
  align-items: center;
  img {
    height: 22px;
    width: auto;
    margin-right: 10px;
    box-shadow: ${(props) => props.theme.boxShadow};
  }
  span {
    font-size: 13px;
    font-weight: 700;
  }
`;

export default MyRecord;
