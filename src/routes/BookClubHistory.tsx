import { useState, useEffect } from 'react';
import { CLUB_INFO, thisYear } from 'util/index';
import { getCollection } from 'api/getFbDoc';
import { clubDocsState, IBookClubMonthInfo } from 'data/documentsAtom';
import { useRecoilState } from 'recoil';
import useGroupedBookByYear from 'hooks/useGroupedBookByYear';
import Subtitle from 'components/atoms/Subtitle';
import HistoryBox from 'components/organisms/bookclubhistory/HistoryBox';
import device from 'theme/mediaQueries';
import styled from 'styled-components';
import Loading from 'components/atoms/Loading';

const BookClubHistory = () => {
  const [selectedYear, setSelectedYear] = useState(`${thisYear}`);
  const [bookMeetings, setBookMeetings] = useRecoilState(clubDocsState);
  const { GroupedBookByYear } = useGroupedBookByYear(bookMeetings);

  useEffect(() => {
    getCollection(CLUB_INFO, setBookMeetings);
  }, [setBookMeetings]);

  const onYearChange = (event: React.FormEvent<HTMLSelectElement>) => {
    setSelectedYear(event.currentTarget.value);
  };

  return bookMeetings?.length === 0 ? (
    <Loading />
  ) : (
    <main>
      <Subtitle title='한페이지 히스토리' />
      <YearSelect onChange={onYearChange} value={selectedYear}>
        {GroupedBookByYear?.map((item) => (
          <option key={item.id} value={item.id}>
            {item.id}년의 책
          </option>
        ))}
      </YearSelect>
      {GroupedBookByYear.length !== 0 ? (
        GroupedBookByYear?.map((item) => (
          <HistoryList key={item.id}>
            {item.id === selectedYear &&
              item.bookMeeting.map((bookMeeting: IBookClubMonthInfo) => (
                <HistoryBox key={bookMeeting.id} bookMeeting={bookMeeting} />
              ))}
          </HistoryList>
        ))
      ) : (
        <EmptyBox>북클럽에 아직 등록된 책이 없습니다.</EmptyBox>
      )}
    </main>
  );
};

const HistoryList = styled.ul`
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 100%;
  @media ${device.tablet} {
    display: grid;
    grid-template-columns: repeat(2, auto);
    gap: 20px;
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
