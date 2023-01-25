import { IUserRecord } from 'data/userAtom';
import { cutLetter, getFbRoute, getLocalDate, existDocObj } from 'util/index';
import { ArrowForwardIos, Book } from '@mui/icons-material';
import { IDocument } from 'data/documentsAtom';
import { useEffect, useState } from 'react';
import { getDocument } from 'api/getFbDoc';
import { Modal } from '../bookclubthismonth/SubjectCreateModal';
import { HTMLContent, RegisterTime } from '../RecordBox';
import styled from 'styled-components';
import device from 'theme/mediaQueries';
import Overlay from 'components/atoms/Overlay';
import UsernameBox from '../UsernameBox';

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
    getDocument(getRecordRoute(), docId, setRecord);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleModal = () => setOpenModal((prev) => !prev);

  return (
    <>
      {existDocObj(record) && (
        <Record onClick={handleModal}>
          {record.thumbnail ? (
            <BookImg src={record.thumbnail} alt={`${record.title} thumbnail`} />
          ) : (
            <Book />
          )}
          <BookTitle>
            {record.title ? cutLetter(record.title, 7) : '이벤트'}
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
                <UsernameBox creatorId={record?.creatorId} />
                <RegisterTime>{getLocalDate(record?.createdAt)}</RegisterTime>
              </Header>
              <HTMLContent dangerouslySetInnerHTML={{ __html: record.text }} />
              <ClubBook>
                {record.thumbnail && (
                  <img
                    src={record.thumbnail}
                    alt={`${record.title} thumbnail`}
                  />
                )}
                {record.title && <span>{record.title}</span>}
              </ClubBook>
            </Box>
          </MyRecordModal>
        </>
      )}
    </>
  );
};

export const Record = styled.li`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 100%;
  min-height: 80px;
  height: 140px;
  padding: 10px 5px;
  border-radius: 10px;
  background-color: #fff;
  border: 1px solid ${(props) => props.theme.text.lightGray};
  > svg {
    height: 55px;
    width: 40px;
  }
  @media ${device.tablet} {
    height: 160px;
    margin-bottom: 0;
  }
`;
export const BookImg = styled.img`
  height: 50px;
  box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.5);
  @media ${device.tablet} {
    height: 70px;
  }
`;
export const BookTitle = styled.h1`
  font-weight: 700;
  font-size: 12px;
  @media ${device.tablet} {
    font-size: 16px;
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
    font-size: 16px;
  }
`;
export const MyRecordModal = styled(Modal)`
  max-height: 82vh;
  padding: 0;
  background-color: transparent;
`;
export const Box = styled.article`
  width: 100%;
  background-color: ${(props) => props.theme.container.default};
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  gap: 10px;
  padding: 20px 15px;
  box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.3);
  @media ${device.tablet} {
    padding: 20px;
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
    box-shadow: 1px 3px 5px rgba(0, 0, 0, 0.4);
  }
  span {
    font-size: 13px;
    font-weight: 700;
  }
`;

export default MyRecord;
