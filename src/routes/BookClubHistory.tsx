import { useState, useEffect } from 'react';
import { Container } from 'theme/commonStyle';
import { CLUB_INFO, thisYear } from 'util/constants';
import { IBookMeeting, getCollection } from 'util/getFirebaseDoc';
import { bookMeetingsState } from 'data/documentsAtom';
import { useRecoilState } from 'recoil';
import useGroupedBookByYear from 'hooks/useGroupedBookByYear';
import Subtitle from 'components/common/Subtitle';
import HistoryBox from 'components/bookclubhistory/HistoryBox';
import device from 'theme/mediaQueries';
import styled from 'styled-components';
import Loading from 'components/common/Loading';

const BookClubHistory = () => {
  const [selectedYear, setSelectedYear] = useState(`${thisYear}`);
  const [bookMeetings, setBookMeetings] = useRecoilState(bookMeetingsState);

  const { GroupedBookByYear } = useGroupedBookByYear(bookMeetings);

  useEffect(() => {
    getCollection(CLUB_INFO, setBookMeetings);
  }, [setBookMeetings]);

  const onYearChange = (event: React.FormEvent<HTMLSelectElement>) => {
    setSelectedYear(event.currentTarget.value);
  };

  return (
    <>
      {bookMeetings?.length === 0 ? (
        <Loading />
      ) : (
        <Container>
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
                  item.bookMeeting.map((bookMeeting: IBookMeeting) => (
                    <HistoryBox
                      key={bookMeeting.id}
                      bookMeeting={bookMeeting}
                    />
                  ))}
              </HistoryList>
            ))
          ) : (
            <EmptyBox>북클럽에 아직 등록된 책이 없습니다.</EmptyBox>
          )}
        </Container>
      )}
    </>
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
  width: fit-content;
  height: 40px;
  margin-left: 15px;
  padding: 0 10px;
  border-radius: 5px;
  font-size: 16px;
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
  border-radius: 5px;
  background-color: ${(props) => props.theme.container.default};
  box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.3);
`;

export default BookClubHistory;
