import { IBookApi } from 'data/bookAtom';
import { thisYearMonth } from 'util/constants';
import { useRecoilValue } from 'recoil';
import { bookMeetingsState } from 'data/documentsAtom';
import useHandleClubInfoDoc from 'hooks/useHandleClubInfoDoc';
import styled from 'styled-components';
import { useEffect } from 'react';

interface PropsType {
  searchedBook: IBookApi;
}

const RegisterClubBookButton = ({ searchedBook }: PropsType) => {
  const bookMeetingDocs = useRecoilValue(bookMeetingsState);
  const { toggle, setToggle, onSubmit, onMonthChange } = useHandleClubInfoDoc({
    bookMeetingDocs,
    searchedBook,
  });

  const isClubBook = bookMeetingDocs.some((item) =>
    item.book?.title.includes(searchedBook?.title)
  );

  useEffect(() => {
    isClubBook ? setToggle(true) : setToggle(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return toggle ? (
    <SelectBox onSubmit={onSubmit}>
      <Registered type='submit' value='⭐️ 북클럽 책 선정 ⭐️' />
    </SelectBox>
  ) : (
    <SelectBox onSubmit={onSubmit}>
      <CalenderInput
        type='month'
        defaultValue={thisYearMonth}
        name='thisMonthBook'
        onChange={onMonthChange}
      />
      <RegisterBtn
        type='submit'
        className={isClubBook ? 'isActive' : ''}
        value='북클럽 도서로 등록 ✔️'
      />
    </SelectBox>
  );
};

export const SelectBox = styled.form`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin: 15px auto 10px;
`;

const CalenderInput = styled.input`
  padding: 0 6px;
  border-radius: 8px;
  color: ${(props) => props.theme.text.accent};
  border: 1px solid ${(props) => props.theme.text.gray};
  background-color: ${(props) => props.theme.container.default};
  svg {
    fill: gold;
  }
`;

const RegisterBtn = styled.input`
  cursor: pointer;
  width: fit-content;
  height: 40px;
  border: none;
  border-radius: 8px;
  padding: 0 6px;
  font-weight: 700;
  color: ${(props) => props.theme.text.gray};
  border: 1px solid ${(props) => props.theme.text.gray};
  background-color: ${(props) => props.theme.text.lightGray};
`;

const Registered = styled(RegisterBtn)`
  color: ${(props) => props.theme.text.accent};
  background-color: ${(props) => props.theme.container.default};
`;

export default RegisterClubBookButton;
