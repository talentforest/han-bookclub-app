import { ISearchedBook } from 'data/bookAtom';
import { getLocaleDate } from 'util/index';
import { LabeledBox } from 'components/atoms/input/BoxLabeledInput';
import styled from 'styled-components';
import device from 'theme/mediaQueries';

interface PropsType {
  detailInfo: ISearchedBook;
}

const SearchedBookDesc = ({ detailInfo }: PropsType) => {
  const {
    url,
    authors,
    publisher,
    datetime,
    price,
    contents, //
  } = detailInfo;

  const detailArr = [
    { label: '저자', info: authors.join(', ') },
    { label: '출판', info: publisher },
    { label: '출간일', info: getLocaleDate(datetime) },
    { label: '정가', info: `${price.toLocaleString()}원` },
  ];

  return (
    <BookDetail>
      {detailArr.map(({ label, info }) => (
        <InfoBox key={label}>
          <div className='label'>{label}</div>
          <div className='info'>{info}</div>
        </InfoBox>
      ))}

      <p dangerouslySetInnerHTML={{ __html: `${contents}...` }} />

      {url && (
        <a href={url} target='_blank' rel='noreferrer'>
          상세정보 보러가기
        </a>
      )}
    </BookDetail>
  );
};

const BookDetail = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  width: 100%;
  p {
    margin: 15px 0;
  }
  a {
    align-self: flex-end;
    font-size: 15px;
    text-decoration: underline;
    color: ${({ theme }) => theme.text.blue2};
  }
  @media ${device.tablet} {
    min-height: 40vh;
    padding: 30px;
  }
`;

const InfoBox = styled(LabeledBox)`
  width: 100%;
  margin-bottom: 8px;
  div.label {
    width: 70px;
    font-size: 15px;
  }
  div.info {
    background-color: #fff;
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    padding-left: 6px;
    font-size: 15px;
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
    border: 1px solid ${({ theme }) => theme.text.gray1};
  }
`;

export default SearchedBookDesc;
