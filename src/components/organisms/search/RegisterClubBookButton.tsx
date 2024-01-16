import { IBookApi } from 'data/bookAtom';
import { thisYearMonthId } from 'util/index';
import useSetBookClubDoc from 'hooks/useSetBookClubDoc';
import styled from 'styled-components';

interface PropsType {
  searchedBook: IBookApi;
}

const RegisterClubBookButton = ({ searchedBook }: PropsType) => {
  const {
    toggle,
    onSubmit,
    onMonthChange, //
  } = useSetBookClubDoc({ searchedBook });

  return (
    <SelectBox onSubmit={onSubmit}>
      <CalenderInput
        type='month'
        defaultValue={thisYearMonthId}
        name='thisMonthBook'
        onChange={onMonthChange}
      />
      {toggle ? (
        <Registered type='submit'>
          독서모임 책
          <br />
          선정 완료
        </Registered>
      ) : (
        <RegisterBtn type='submit'>
          독서모임 책으로
          <br />
          선정하기
        </RegisterBtn>
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
  font-size: 14px;
  border-radius: 10px;
  padding: 0 8px;
  width: 120px;
  color: ${(props) => props.theme.text.accent};
  border: 1px solid ${(props) => props.theme.text.gray};
  background-color: ${(props) => props.theme.container.default};
  svg {
    fill: gold;
  }
`;
const RegisterBtn = styled.button`
  width: 120px;
  height: 50px;
  border-radius: 10px;
  background-color: ${(props) => props.theme.text.lightGray};

  font-weight: 700;
`;
const Registered = styled(RegisterBtn)`
  color: ${(props) => props.theme.text.accent};
  background-color: ${(props) => props.theme.container.yellow};
`;

export default RegisterClubBookButton;
