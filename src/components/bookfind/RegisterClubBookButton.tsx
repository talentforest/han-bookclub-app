import { BookDocument } from "data/bookAtom";
import { thisYearMonth } from "util/constants";
import { useRecoilValue } from "recoil";
import { bookMeetingDocsState } from "data/documentsAtom";
import useHandleThisMonthDoc from "hooks/useHandleThisMonthDoc";
import styled from "styled-components";

interface PropsType {
  findbookData: BookDocument;
}

const RegisterClubBookButton = ({ findbookData }: PropsType) => {
  const bookMeetingDocs = useRecoilValue(bookMeetingDocsState);

  const { toggle, onSubmit, onMonthChange } = useHandleThisMonthDoc({
    bookMeetingDocs,
    findbookData,
  });

  const checkClubBook = bookMeetingDocs
    .map((item) => item.book?.title)
    .includes(findbookData?.title);

  return (
    <>
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
    </>
  );
};

export const SelectBox = styled.form`
  display: flex;
  justify-content: center;
  margin: 15px auto 10px;
  input:last-child {
    display: flex;
    align-items: center;
    font-size: 13px;
    border: none;
    border-radius: 5px;
    padding: 3px 6px;
    margin-left: 10px;
    width: fit-content;
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

export default RegisterClubBookButton;
