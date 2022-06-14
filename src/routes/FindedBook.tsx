import { bookSearchHandler } from "api/api";
import { useEffect, useState } from "react";
import { useMatch } from "react-router-dom";
import { Container } from "theme/commonStyle";
import { thisYearMonth } from "util/constants";
import { getBookMeetingInfoData } from "util/getFirebaseDoc";
import BookDesc from "components/common/BookDesc";
import styled from "styled-components";
import BackButtonHeader from "components/common/BackButtonHeader";
import useHandleThisMonthDoc from "hooks/useHandleThisMonthDoc";
import BookTitleImgBox from "components/common/BookTitleImgBox";

const FindedBook = () => {
  const [findbookData, setFindBookData] = useState([]);
  const [bookMeetingDocData, setBookMeetingDocData] = useState([]);
  const match = useMatch(`/bookmeeting/find/:id`);

  const { toggle, onSubmit, onMonthChange } = useHandleThisMonthDoc({
    bookMeetingDocData,
    findbookData,
  });

  useEffect(() => {
    bookSearchHandler(match?.params.id, true, setFindBookData);
    getBookMeetingInfoData(setBookMeetingDocData);

    return () => {
      bookSearchHandler(match?.params.id, true, setFindBookData);
      getBookMeetingInfoData(setBookMeetingDocData);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const checkClubBook = bookMeetingDocData
    .map((item) => item.book?.title)
    .includes(findbookData[0]?.title);

  return (
    <>
      <BackButtonHeader title="도서 정보" />
      <Container>
        <BookTitleImgBox docData={findbookData[0]} />
        {toggle ? (
          <Selected onSubmit={onSubmit}>
            <input type="submit" value="북클럽 책 등록 완료" />
          </Selected>
        ) : (
          <SelectBox onSubmit={onSubmit}>
            <input
              type="month"
              defaultValue={thisYearMonth}
              name="thisMonthBook"
              onChange={onMonthChange}
            />
            <input
              type="submit"
              className={checkClubBook ? "isActive" : ""}
              value="북클럽 도서 등록"
            />
          </SelectBox>
        )}
        <BookDesc bookInfo={findbookData[0]} />
      </Container>
    </>
  );
};

const SelectBox = styled.form`
  display: flex;
  justify-content: center;
  margin: 25px auto 0;
  input:last-child {
    display: flex;
    align-items: center;
    font-size: 13px;
    border: none;
    border-radius: 5px;
    padding: 3px 10px;
    margin-left: 10px;
    height: 30px;
    font-weight: 700;
    color: #aaa;
    background-color: ${(props) => props.theme.text.lightGray};
    cursor: pointer;
    &.isActive {
      pointer-events: none;
    }
  }
`;

const Selected = styled(SelectBox)`
  input:last-child {
    color: ${(props) => props.theme.text.accent};
    background-color: ${(props) => props.theme.container.lightBlue};
    svg {
      fill: gold;
    }
  }
`;

export default FindedBook;
