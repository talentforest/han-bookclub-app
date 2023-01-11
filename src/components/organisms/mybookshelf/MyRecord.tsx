import { useRecoilValue } from 'recoil';
import { currentUserState } from 'data/userAtom';
import { cutLetter, getLocalDate } from 'util/index';
import { Book, Chat, LibraryBooks } from '@mui/icons-material';
import { IBookClubMonthInfo } from 'data/documentsAtom';
import { RegisterTime } from '../RecordBox';
import { Modal } from '../bookclubthismonth/SubjectCreateModal';
import styled from 'styled-components';
import device from 'theme/mediaQueries';
import useFilterMyRecords from 'hooks/useFilterMyRecords';
import Overlay from 'components/atoms/Overlay';
import UsernameBox from '../UsernameBox';

interface PropsType {
  bookMeeting: IBookClubMonthInfo;
}

const MyRecord = ({ bookMeeting }: PropsType) => {
  const userData = useRecoilValue(currentUserState);
  const { id, book } = bookMeeting;
  const {
    mySubjects,
    myReviews,
    mySubjectsByBook,
    myReviewsByBook,
    openModal,
    setOpenModal,
    onSubjectClick,
    onReviewClick,
  } = useFilterMyRecords(id, userData.uid);

  return (
    (mySubjects.length || myReviews.length) !== 0 && (
      <>
        <Record>
          {book.thumbnail ? (
            <BookImg src={book.thumbnail} alt={`${book.title} thumbnail`} />
          ) : (
            <Book />
          )}
          <BookTitle>
            {book.title ? cutLetter(book.title, 5) : '이벤트'}
          </BookTitle>
          <Category>
            {!!myReviews.length && (
              <button onClick={() => onReviewClick(book.title)}>
                <Chat />
              </button>
            )}
            {!!mySubjects.length && (
              <button onClick={() => onSubjectClick(book.title)}>
                <LibraryBooks />
              </button>
            )}
          </Category>
        </Record>
        {openModal && (
          <>
            <Overlay
              onModalClick={() => {
                setOpenModal((prev) => !prev);
              }}
            />
            <MyRecordModal>
              {mySubjectsByBook?.map((subject) => (
                <Box key={id}>
                  <UsernameBox creatorId={subject.creatorId} />
                  <div dangerouslySetInnerHTML={{ __html: subject.text }} />
                  <RegisterTime>{getLocalDate(subject.createdAt)}</RegisterTime>
                </Box>
              ))}
              {myReviewsByBook?.map((review) => (
                <Box key={id}>
                  <UsernameBox creatorId={review.creatorId} />
                  <div dangerouslySetInnerHTML={{ __html: review.text }} />
                  <RegisterTime>{getLocalDate(review.createdAt)}</RegisterTime>
                </Box>
              ))}
            </MyRecordModal>
          </>
        )}
      </>
    )
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
export const Category = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  width: 100%;
  padding: 0;
  > button {
    height: 14px;
    > svg {
      width: 16px;
      height: 16px;
      fill: ${(props) => props.theme.text.gray};
      &:hover {
        fill: ${(props) => props.theme.container.yellow};
      }
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
export const Box = styled.div`
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

export default MyRecord;
