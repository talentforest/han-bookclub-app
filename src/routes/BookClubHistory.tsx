import { useEffect } from 'react';
import { clubYearArr, thisYearMonthId } from 'util/index';
import { getCollection } from 'api/getFbDoc';
import { clubInfoByYearState } from 'data/documentsAtom';
import { selectedYearAtom } from 'data/selectedYearAtom';
import { useRecoilState } from 'recoil';
import { Link } from 'react-router-dom';
import { HiMiniArrowUpRight } from 'react-icons/hi2';
import HistoryClubBookBox from 'components/atoms/box/HistoryClubBookBox';
import device from 'theme/mediaQueries';
import styled from 'styled-components';
import Tag from 'components/atoms/Tag';
import Header from 'layout/mobile/Header';

const BookClubHistory = () => {
  const [selectedYear, setSelectedYear] = useRecoilState(selectedYearAtom);
  const [clubInfoDocs, setClubInfoDocs] = useRecoilState(clubInfoByYearState);

  useEffect(() => {
    getCollection(`BookClub-${selectedYear}`, setClubInfoDocs);
  }, [setClubInfoDocs, selectedYear]);

  const clubHistory = clubInfoDocs?.filter(
    (doc) => doc?.id !== thisYearMonthId
  );

  return (
    <>
      <Header title='지난 한페이지 모임' />
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
  gap: 10px;
  margin-bottom: 20px;
`;

const TagItem = styled.li<{ $active: boolean }>`
  border-radius: 8px;
  h1 {
    background-color: ${(props) =>
      props.$active ? props.theme.container.blue : '#eee'};
    color: ${(props) => (props.$active ? props.theme.text.white : '#aaa')};
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
    margin-top: 20px;
    grid-template-columns: repeat(4, 1fr);
  }
  @media ${device.desktop} {
    display: grid;
    margin-top: 20px;
    grid-template-columns: repeat(5, 1fr);
  }
`;

const EmptyBox = styled.div`
  width: 100%;
  height: 135px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 15px;
  color: #aaa;
  border-radius: 10px;
  background-color: ${(props) => props.theme.container.default};
  box-shadow: ${(props) => props.theme.boxShadow};
`;

export default BookClubHistory;
