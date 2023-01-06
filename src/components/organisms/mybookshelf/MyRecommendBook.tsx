import { currentUserState } from 'data/userAtom';
import { useRecoilValue } from 'recoil';
import { cutLetter, getLocalDate } from 'util/index';
import { IBookClubMonthInfo } from 'data/documentsAtom';
import { BookImg, BookTitle, Box, Modal, Record } from './MyRecord';
import { RegisterTime } from '../RecordBox';
import { ChevronRight } from '@mui/icons-material';
import Overlay from 'components/atoms/Overlay';
import UsernameBox from '../UsernameBox';
import useFilterMyRecords from 'hooks/useFilterMyRecords';

interface PropsType {
  bookMeeting: IBookClubMonthInfo;
}

const MyRecommendBook = ({ bookMeeting }: PropsType) => {
  const userData = useRecoilValue(currentUserState);
  const { id } = bookMeeting;
  const { uid } = userData;
  const {
    myRecommendBooks,
    myRecommendByBook,
    openRecommendModal,
    setOpenRecommendModal,
    onRecommendBookClick,
  } = useFilterMyRecords(id, uid);

  return (
    !!myRecommendBooks.length && (
      <>
        {myRecommendBooks.map((item) => (
          <Record key={item.id}>
            <BookImg src={item.recommendBookThumbnail} alt='thumbnail' />
            <BookTitle>
              {item.recommendBookTitle
                ? cutLetter(item.recommendBookTitle, 6)
                : item.title}
            </BookTitle>
            <button
              onClick={() => onRecommendBookClick(item.recommendBookThumbnail)}
            >
              보기
              <ChevronRight />
            </button>
          </Record>
        ))}
        {openRecommendModal && (
          <>
            <Overlay
              onModalClick={() => {
                setOpenRecommendModal((prev) => !prev);
              }}
            />
            <Modal>
              {myRecommendByBook.map((recommend) => (
                <Box key={recommend.id}>
                  <UsernameBox creatorId={recommend.creatorId} />
                  <div dangerouslySetInnerHTML={{ __html: recommend.text }} />
                  <RegisterTime>
                    {getLocalDate(recommend.createdAt)}
                  </RegisterTime>
                </Box>
              ))}
            </Modal>
          </>
        )}
      </>
    )
  );
};

export default MyRecommendBook;
