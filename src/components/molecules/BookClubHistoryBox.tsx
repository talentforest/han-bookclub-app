import { cutLetter, getLocaleDate, getMeetingTime } from 'util/index';
import { IBookClub } from 'data/bookClubAtom';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import device from 'theme/mediaQueries';
import BookThumbnail from 'components/atoms/BookThumbnail';
import Tag from 'components/atoms/Tag';
import BookAuthorPublisher from 'components/atoms/BookAuthorPublisher';

interface PropsType {
  document: IBookClub;
}

const BookClubHistoryBox = ({ document }: PropsType) => {
  const { pathname } = useLocation();

  const {
    id,
    book: { thumbnail, title, authors, publisher },
    meeting: { time, place },
  } = document;

  const month = getLocaleDate(id, { month: 'numeric' });

  return (
    <BookBox>
      <BookThumbnail thumbnail={thumbnail} title={title} />

      <DetailInfoBox>
        {pathname === '/history' && (
          <Tag name={`${month}월의 책`} color='yellow' />
        )}
        <div>
          <h3>{title ? cutLetter(title, 40) : '이벤트'}</h3>
          {pathname !== '/history' && !!authors?.length && publisher && (
            <BookAuthorPublisher authors={authors} publisher={publisher} />
          )}
        </div>

        <div className='meeting'>
          <span>
            {!!time ? getMeetingTime(time) : '정해진 모임 시간이 없습니다.'}
          </span>
          <span>{!!place ? place : '정해진 모임 장소가 없습니다.'}</span>
        </div>
      </DetailInfoBox>
    </BookBox>
  );
};

const BookBox = styled.div`
  position: relative;
  width: 100%;
  height: 140px;
  display: flex;
  justify-content: space-between;
  gap: 10px;
  padding: 12px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.container.default};
  box-shadow: ${({ theme }) => theme.boxShadow};
  cursor: pointer;

  .meeting {
    display: flex;
    flex-direction: column;
    span {
      color: #aaa;
    }
  }

  @media ${device.tablet} {
    padding: 10px 10px;
  }
`;

const DetailInfoBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: space-between;
  height: 100%;
  flex: 1;
  h3 {
    line-height: 1.3;
    padding-left: 4px;
    margin: 4px 0;
    font-size: 16px;
    display: flex;
    align-items: start;
    justify-content: space-between;
  }
  span {
    line-height: 1.4;
    padding-left: 4px;
    font-size: 14px;
  }
`;

export default BookClubHistoryBox;
