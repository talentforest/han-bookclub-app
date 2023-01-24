import { useEffect } from 'react';
import { clubYearArr } from 'util/index';
import { getCollection } from 'api/getFbDoc';
import { clubInfoByYearState } from 'data/documentsAtom';
import { selectedYearAtom } from 'data/selectedYearAtom';
import { useRecoilState } from 'recoil';
import Subtitle from 'components/atoms/Subtitle';
import HistoryBox from 'components/organisms/bookclubhistory/HistoryBox';
import device from 'theme/mediaQueries';
import styled from 'styled-components';

const BookClubHistory = () => {
  const [selectedYear, setSelectedYear] = useRecoilState(selectedYearAtom);
  const [clubInfoDocs, setClubInfoDocs] = useRecoilState(clubInfoByYearState);

  useEffect(() => {
    getCollection(`BookClub-${selectedYear}`, setClubInfoDocs);
  }, [setClubInfoDocs, selectedYear]);

  const onYearChange = (event: React.FormEvent<HTMLSelectElement>) => {
    setSelectedYear(event.currentTarget.value);
  };

  return (
    <main>
      <Subtitle title='한페이지 히스토리' />
      <YearSelect onChange={onYearChange} value={selectedYear}>
        {clubYearArr?.map((item) => (
          <option key={item} value={item}>
            {item}년의 책
          </option>
        ))}
      </YearSelect>
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

const HistoryList = styled.ul`
  width: 100%;
  margin-top: 10px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
  @media ${device.tablet} {
    margin-top: 20px;
    grid-template-columns: repeat(4, 1fr);
  }
  @media ${device.desktop} {
    margin-top: 20px;
    grid-template-columns: repeat(5, 1fr);
  }
`;
const YearSelect = styled.select`
  cursor: pointer;
  height: 40px;
  padding: 0 10px;
  border-radius: 10px;
  font-size: 16px;
  box-shadow: 1px 2px 2px rgba(0, 0, 0, 0.2);
  border: 1px solid ${(props) => props.theme.text.lightGray};
  background-color: ${(props) => props.theme.container.default};
  &:focus {
    outline: none;
  }
  @media ${device.tablet} {
    margin-top: 20px;
    height: 40px;
    width: 140px;
    font-size: 18px;
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
  box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.3);
`;

export default BookClubHistory;
