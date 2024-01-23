import { useEffect, useState } from 'react';
import { thisYear, thisYearMonthId } from 'util/index';
import { getCollection } from 'api/getFbDoc';
import { bookClubByYearState } from 'data/bookClubAtom';
import { useRecoilState } from 'recoil';
import { Link } from 'react-router-dom';
import { HiMiniArrowUpRight } from 'react-icons/hi2';
import { clubYearArr } from 'constants/yearOfBookClub';
import HistoryClubBookBox from 'components/molecules/book-box/HistoryClubBookBox';
import device from 'theme/mediaQueries';
import styled from 'styled-components';
import Tag from 'components/atoms/tag/Tag';
import MobileHeader from 'layout/mobile/MobileHeader';

const BookClubHistory = () => {
  const [selectedYear, setSelectedYear] = useState(`${thisYear}`);
  const [clubInfoDocs, setClubInfoDocs] = useRecoilState(bookClubByYearState);

  useEffect(() => {
    getCollection(`BookClub-${selectedYear}`, setClubInfoDocs);
  }, [setClubInfoDocs, selectedYear]);

  const clubHistory = clubInfoDocs?.filter(
    (doc) => doc?.id !== thisYearMonthId
  );

  return (
    <>
      <MobileHeader title='지난 한페이지 모임' />
      <main>
        <YearTagList>
          {clubYearArr.map((year) => (
            <TagItem key={year} $active={year === selectedYear}>
              <button onClick={() => setSelectedYear(year)} type='button'>
                <Tag name={`${year}년`} roundedFull={false} />
              </button>
            </TagItem>
          ))}
        </YearTagList>

        <HistoryList>
          {!!clubHistory?.length ? (
            clubHistory?.map((document) => (
              <li key={document.id}>
                <Link to={document.id} state={{ document }}>
                  {document && <HistoryClubBookBox document={document} />}

                  <HiMiniArrowUpRight
                    fill='#aaa'
                    style={{
                      position: 'absolute',
                      bottom: '10px',
                      right: '10px',
                    }}
                  />
                </Link>
              </li>
            ))
          ) : (
            <EmptyBox>독서모임에 아직 등록된 책이 없습니다.</EmptyBox>
          )}
        </HistoryList>
      </main>
    </>
  );
};

const YearTagList = styled.ul`
  display: flex;
  gap: 8px;
  margin-bottom: 20px;
`;

const TagItem = styled.li<{ $active: boolean }>`
  > button {
    border-radius: 8px;
    background-color: ${({ $active, theme }) =>
      $active ? theme.container.blue3 : '#eee'};
    color: ${({ $active, theme }) => ($active ? '#fff' : theme.text.gray2)};
    box-shadow: ${({ theme }) => theme.boxShadow};
    h4 {
      background-color: inherit;
      color: inherit;
      font-size: 14px;
      padding: 6px 10px;
    }
  }
  @media ${device.tablet} {
    > button {
      h4 {
        font-size: 16px;
      }
    }
  }
`;

const HistoryList = styled.ul`
  width: 100%;
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  li {
    position: relative;
  }
  @media ${device.tablet} {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }
`;

export const EmptyBox = styled.div`
  width: 100%;
  height: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  color: ${({ theme }) => theme.text.gray2};
  border-radius: 10px;
  background-color: ${({ theme }) => theme.container.default};
  box-shadow: ${({ theme }) => theme.boxShadow};
  @media ${device.tablet} {
    height: 180px;
  }
`;

export default BookClubHistory;
