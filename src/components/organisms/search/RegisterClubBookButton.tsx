import { IBookApi } from 'data/bookAtom';
import { useRecoilValue } from 'recoil';
import { clubDocsState } from 'data/documentsAtom';
import { thisYearMonthIso } from 'util/index';
import { useEffect } from 'react';
import useHandleClubInfoDoc from 'hooks/useHandleClubInfoDoc';
import styled from 'styled-components';
import PostBtn from 'components/atoms/buttons/PostBtn';

interface PropsType {
  searchedBook: IBookApi;
}

const RegisterClubBookButton = ({ searchedBook }: PropsType) => {
  const clubDocs = useRecoilValue(clubDocsState);

  const { toggle, setToggle, onSubmit, onMonthChange } = useHandleClubInfoDoc({
    clubDocs,
    searchedBook,
  });

  const isClubBook = clubDocs.some((item) =>
    item.book?.title.includes(searchedBook?.title)
  );

  useEffect(() => {
    isClubBook ? setToggle(true) : setToggle(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SelectBox onSubmit={onSubmit}>
      <CalenderInput
        type='month'
        defaultValue={thisYearMonthIso}
        name='thisMonthBook'
        onChange={onMonthChange}
      />
      {toggle ? (
        <Registered value='⭐️ 북클럽 책 선정 ⭐️' />
      ) : (
        <PostBtn value='북클럽 도서로 등록' />
      )}
    </SelectBox>
  );
};

const SelectBox = styled.form`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin: 15px auto 10px;
`;
const CalenderInput = styled.input`
  font-size: 16px;
  border-radius: 8px;
  color: ${(props) => props.theme.text.accent};
  border: 1px solid ${(props) => props.theme.text.gray};
  background-color: ${(props) => props.theme.container.default};
  svg {
    fill: gold;
  }
`;
const Registered = styled(PostBtn)`
  color: ${(props) => props.theme.text.accent};
  background-color: ${(props) => props.theme.container.default};
`;

export default RegisterClubBookButton;
