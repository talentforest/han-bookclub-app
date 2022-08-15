import { useState } from "react";
import { Container } from "theme/commonStyle";
import { useRecoilValue } from "recoil";
import { bookMeetingDocsState } from "data/documentsAtom";
import { thisYear } from "util/constants";
import { IBookMeeting } from "util/getFirebaseDoc";
import Subtitle from "components/common/Subtitle";
import HistoryBox from "components/clubbookhistory/HistoryBox";
import MobileHeader from "components/header/MobileHeader";
import useGroupedBookByYear from "hooks/useGroupedBookByYear";
import device from "theme/mediaQueries";
import styled from "styled-components";

const ClubHistory = () => {
  const bookMeetingDocs = useRecoilValue(bookMeetingDocsState);
  const [selectedYear, setSelectedYear] = useState(`${thisYear}`);

  const { GroupedBookByYear } = useGroupedBookByYear({ bookMeetingDocs });

  const onYearChange = (event: React.FormEvent<HTMLSelectElement>) => {
    setSelectedYear(event.currentTarget.value);
  };

  return (
    <>
      <MobileHeader title="지난 책모임" />
      <Container>
        <Subtitle title="한페이지 히스토리" />
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
                item.bookMeetingInfo.map((bookMeetingInfo: IBookMeeting) => (
                  <HistoryBox
                    key={bookMeetingInfo.id}
                    bookMeetingInfo={bookMeetingInfo}
                  />
                ))}
            </HistoryList>
          ))
        ) : (
          <EmptyBox>북클럽에 아직 등록된 책이 없습니다.</EmptyBox>
        )}
      </Container>
    </>
  );
};

const HistoryList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const YearSelect = styled.select`
  height: 30px;
  width: fit-content;
  display: flex;
  border-radius: 5px;
  margin-left: 15px;
  font-size: 16px;
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

export default ClubHistory;
