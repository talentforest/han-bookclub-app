import { IUserRecord } from 'data/userAtom';
import { cutLetter, getFbRoute, getLocalDate } from 'util/index';
import { Book, Chat } from '@mui/icons-material';
import { IDocument } from 'data/documentsAtom';
import { useEffect, useState } from 'react';
import { getDocument } from 'api/getFbDoc';
import { Modal } from '../bookclubthismonth/SubjectCreateModal';
import { HTMLContent } from '../RecordBox';
import styled from 'styled-components';
import device from 'theme/mediaQueries';
import Overlay from 'components/atoms/Overlay';
import UsernameBox from '../UsernameBox';

interface PropsType {
  recordId: IUserRecord;
  review?: boolean;
}

const MyRecord = ({ recordId, review }: PropsType) => {
  const [record, setRecord] = useState({} as IDocument);
  const { docId, monthId } = recordId;
  const [openModal, setOpenModal] = useState(false);

  const handleModal = () => {
    setOpenModal((prev) => !prev);
  };

  const getRecord = review
    ? getFbRoute(monthId).REVIEW
    : getFbRoute(monthId).SUBJECT;

  useEffect(() => {
    getDocument(getRecord, docId, setRecord);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [docId, monthId]);

  return (
    <>
      <Record>
        {record.thumbnail ? (
          <BookImg src={record.thumbnail} alt={`${record.title} thumbnail`} />
        ) : (
          <Book />
        )}
        <BookTitle>
          {record.title ? cutLetter(record.title, 5) : '이벤트'}
        </BookTitle>
        <Btn onClick={handleModal}>
          <Chat />
        </Btn>
      </Record>
      {openModal && (
        <>
          <Overlay onModalClick={handleModal} />
          <MyRecordModal>
            <Box>
              <UsernameBox creatorId={record.creatorId} />
              <HTMLContent
                dangerouslySetInnerHTML={{
                  __html: cutLetter(record.text, 200),
                }}
              />
              <BoxFooter>
                <ClubBookInfo>
                  {record.thumbnail && (
                    <img
                      src={record.thumbnail}
                      alt={`${record.title} thumbnail`}
                    />
                  )}
                  {record.title && <span>{record.title}</span>}
                </ClubBookInfo>
                <span>{getLocalDate(record.createdAt)}</span>
              </BoxFooter>
            </Box>
          </MyRecordModal>
        </>
      )}
    </>
  );
};

export const Record = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  min-height: 80px;
  height: 120px;
  padding: 5px;
  border-radius: 10px;
  background-color: ${(props) => props.theme.container.default};
  box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.3);
  > svg {
    height: 55px;
    width: 40px;
  }
  > button {
    padding-left: 5px;
    display: flex;
    align-items: center;
    svg {
      width: 18px;
      height: 18px;
      padding-top: 2px;
    }
  }
  @media ${device.tablet} {
    height: 150px;
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
  height: 14px;
  > svg {
    width: 16px;
    height: 16px;
    fill: ${(props) => props.theme.text.gray};
    &:hover {
      fill: ${(props) => props.theme.container.yellow};
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
export const BoxFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 5px;
  font-size: 14px;
`;
export const ClubBookInfo = styled.div`
  display: flex;
  align-items: center;
  img {
    height: 18px;
    width: auto;
    margin-right: 5px;
  }
  span {
    color: ${(props) => props.theme.text.gray};
  }
`;

export default MyRecord;
