import { useEffect } from 'react';
import { clubYearArr } from 'util/index';
import { getCollection } from 'api/getFbDoc';
import { clubInfoByYearState } from 'data/documentsAtom';
import { selectedYearAtom } from 'data/selectedYearAtom';
import { useRecoilState } from 'recoil';
import HistoryBox from 'components/organisms/bookclubhistory/HistoryBox';
import device from 'theme/mediaQueries';
import styled from 'styled-components';
import Tag from 'components/atoms/Tag';

const BookClubHistory = () => {
  const [selectedYear, setSelectedYear] = useRecoilState(selectedYearAtom);
  const [clubInfoDocs, setClubInfoDocs] = useRecoilState(clubInfoByYearState);

  useEffect(() => {
    getCollection(`BookClub-${selectedYear}`, setClubInfoDocs);
  }, [setClubInfoDocs, selectedYear]);

  return (
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
        {clubInfoDocs.length !== 0 ? (
          clubInfoDocs?.map((document) => (
            <HistoryBox key={document.id} document={document} />
          ))
        ) : (
          <EmptyBox>독서모임에 아직 등록된 책이 없습니다.</EmptyBox>
        )}
      </HistoryList>
    </main>
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
  font-size: 14px;
  font-weight: 700;
  text-align: center;
  margin-top: 20px;
  padding: 30px 0;
  border-radius: 10px;
  background-color: ${(props) => props.theme.container.default};
  box-shadow: ${(props) => props.theme.boxShadow};
`;

export default BookClubHistory;
