import { useEffect, useState } from "react";
import { Container, Header } from "theme/commonStyle";
import { getBookMeetingInfoData } from "util/getFirebaseDoc";
import device, { deviceSizes } from "theme/mediaQueries";
import useWindowSize from "hooks/useWindowSize";
import Subtitle from "components/common/Subtitle";
import Title from "components/common/Title";
import styled from "styled-components";
import HistoryBox from "components/clubbookhistory/HistoryBox";

const ClubHistory = () => {
  const thisYear = `${new Date().getFullYear()}`;
  const { windowSize } = useWindowSize();
  const [selectedYear, setSelectedYear] = useState(thisYear);
  const [allBookMeeting, setAllBookMeeting] = useState([]);

  useEffect(() => {
    getBookMeetingInfoData(setAllBookMeeting);

    return () => {
      getBookMeetingInfoData(setAllBookMeeting);
    };
  }, []);

  const yearKey = allBookMeeting?.reduce((acc, current) => {
    acc[current.id.split("-")[0]] = acc[current.id.split("-")[0]] || [];
    acc[current.id.split("-")[0]].push(current);
    return acc;
  }, {});

  const GroupedBySameYear = Object.keys(yearKey).map((key) => {
    return {
      id: key,
      bookMeetingInfo: yearKey[key] || [],
    };
  });

  const onChange = (event: React.FormEvent<HTMLSelectElement>) => {
    setSelectedYear(event.currentTarget.value);
  };

  return (
    <>
      {windowSize.width < +deviceSizes.tablet ? (
        <Header>
          <Title title="지난 책모임" />
        </Header>
      ) : (
        <></>
      )}
      <Container>
        <Subtitle title="한페이지 히스토리" />
        <YearCategory onChange={onChange} value={selectedYear}>
          {GroupedBySameYear.length !== 0 ? (
            GroupedBySameYear?.map((item) => (
              <option key={item.id} value={item.id}>
                {item.id}년의 책
              </option>
            ))
          ) : (
            <option>{`${selectedYear}년의 책`}</option>
          )}
        </YearCategory>
        {GroupedBySameYear.length !== 0 ? (
          GroupedBySameYear?.map((item: any) => (
            <HistoryList key={item.id}>
              {item.id === selectedYear
                ? item?.bookMeetingInfo.map((item: any) => (
                    <HistoryBox item={item} key={item.id} />
                  ))
                : null}
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

const YearCategory = styled.select`
  height: 30px;
  width: 100px;
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
