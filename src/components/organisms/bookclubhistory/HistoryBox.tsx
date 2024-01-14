import { Link } from 'react-router-dom';
import { cutLetter, getLocaleDateTime, getMonthNm } from 'util/index';
import { IBookClubInfo } from 'data/documentsAtom';
import { FiBook } from 'react-icons/fi';
import { HiMiniArrowUpRight } from 'react-icons/hi2';
import styled from 'styled-components';
import device from 'theme/mediaQueries';
import BookThumbnailImg from 'components/atoms/BookThumbnailImg';
import Tag from 'components/atoms/Tag';

interface PropsType {
  document: IBookClubInfo;
}

const HistoryBox = ({ document }: PropsType) => {
  const {
    id,
    book: { thumbnail, title },
    meeting: { time, place },
  } = document;

  return (
    <li>
      <BookBox to={id} state={{ document }}>
        {thumbnail ? (
          <BookThumbnailImg thumbnail={thumbnail} title={title} />
        ) : (
          <div className='no_thumbnail'>
            <FiBook fontSize={34} />
          </div>
        )}
        <div>
          <Tag name={`${getMonthNm(id)}월의 책`} bgColor='#ffe0e0' />
          <h3>{title ? cutLetter(title, 20) : '이벤트'}</h3>
          <span>{getLocaleDateTime(new Date(time))}</span>
          <span>{place}</span>
        </div>

        <HiMiniArrowUpRight
          fill='#aaa'
          style={{ position: 'absolute', bottom: '10px', right: '10px' }}
        />
      </BookBox>
    </li>
  );
};

const BookBox = styled(Link)`
  position: relative;
  width: 100%;
  height: 135px;
  display: flex;
  gap: 20px;
  padding: 15px 10px;
  border-radius: 10px;
  background-color: ${(props) => props.theme.container.default};
  box-shadow: ${(props) => props.theme.boxShadow};
  cursor: pointer;
  .no_thumbnail {
    width: 76px;
    max-width: 100px;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: ${(props) => props.theme.boxShadow};
    background-color: #eee;
    border-radius: 8px;
  }
  > div {
    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: space-between;

    h3 {
      margin-top: 8px;
      padding-left: 4px;
      text-align: center;
      font-size: 16px;
      display: flex;
      align-items: center;
      justify-content: start;
      flex: 1;
    }

    span {
      padding-left: 4px;
      font-size: 13px;
      color: #aaa;
      margin-top: 7px;
    }
  }

  @media ${device.tablet} {
    padding: 20px 10px;
  }
`;

export default HistoryBox;
