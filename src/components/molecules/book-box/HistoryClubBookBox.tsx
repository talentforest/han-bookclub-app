import { cutLetter, getLocaleDate, getMeetingTime } from 'util/index';
import { IBookClub } from 'data/bookClubAtom';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import device from 'theme/mediaQueries';
import BookThumbnailImg from 'components/atoms/BookThumbnailImg';
import Tag from 'components/atoms/tag/Tag';

interface PropsType {
  document: IBookClub;
}

const HistoryClubBookBox = ({ document }: PropsType) => {
  const { pathname } = useLocation();

  const {
    id,
    book: { thumbnail, title, authors, publisher },
    meeting: { time, place },
  } = document;

  const month = getLocaleDate(id, { month: 'numeric' });

  return (
    <BookBox>
      <BookThumbnailImg thumbnail={thumbnail} title={title} />

      <DetailInfoBox>
        {pathname === '/history' && (
          <Tag name={`${month}월의 책`} color='yellow' />
        )}

        <h3>{title ? cutLetter(title, 30) : '이벤트'}</h3>

        {pathname !== '/history' && !!authors?.length && publisher && (
          <div className='authors_publisher'>
            <span>
              {authors.join(', ')}
              {authors.length !== 1 && `(외 ${authors.length - 1}명)`}
            </span>
            <span> ・ {publisher}</span>
          </div>
        )}

        <div className='meeting'>
          <span>{getMeetingTime(new Date(time))}</span>
          <span>{place}</span>
        </div>
      </DetailInfoBox>
    </BookBox>
  );
};

const BookBox = styled.div`
  position: relative;
  width: 100%;
  height: 135px;
  display: flex;
  justify-content: space-between;
  gap: 10px;
  padding: 12px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.container.default};
  box-shadow: ${({ theme }) => theme.boxShadow};
  cursor: pointer;

  .authors_publisher {
    display: flex;
    flex-wrap: wrap;
    gap: 3px;
    align-items: start;
    flex: 1;
    span {
      line-height: 1.1;
      color: #666;
    }
  }
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

export default HistoryClubBookBox;
