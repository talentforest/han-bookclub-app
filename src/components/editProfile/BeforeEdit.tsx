import { bookFields } from "util/constants";
import { useState } from "react";
import { BookFieldType } from "components/loginForm/UserDataInputForm";
import { useRecoilValue } from "recoil";
import { currentUserState } from "data/userAtom";
import styled from "styled-components";

interface PropsType {
  onChange: (event: React.FormEvent<HTMLInputElement>) => void;
  newDisplayName: string;
  onHandleClick: (idx: number, event: React.FormEvent<HTMLDivElement>) => void;
  toggleCheck: boolean[];
  setToggleCheck: (toggleCheck: boolean[]) => void;
  favFields: BookFieldType[];
  setFavFields: (favFields: BookFieldType[]) => void;
}

const BeforeEdit = ({
  onChange,
  newDisplayName,
  onHandleClick,
  toggleCheck,
  setToggleCheck,
  favFields,
  setFavFields,
}: PropsType) => {
  const [editFavField, setEditFavField] = useState(false);
  const userData = useRecoilValue(currentUserState);

  const selectedItemStyle = (index: number) => {
    return {
      backgroundColor: `${toggleCheck[index] ? "#5162FF" : ""}`,
      color: `${toggleCheck[index] ? "#fff" : ""}`,
    };
  };

  return (
    <UserInfo>
      <List>
        <div>
          <span>이메일</span>
          <span>{userData.email}</span>
        </div>
        <p>이메일은 변경할 수 없습니다.</p>
      </List>
      <Edit>
        <List>
          <div>
            <span>별명</span>
            <input
              onChange={onChange}
              type="text"
              placeholder="닉네임을 입력해주세요"
              value={newDisplayName}
              required
              autoFocus
            />
          </div>
        </List>
        <AfterFavEdit>
          <span>좋아하는 분야</span>
          {editFavField ? (
            <div>
              <div>
                {bookFields.map((item, index) => (
                  <div
                    onClick={(event) => onHandleClick(index, event)}
                    style={selectedItemStyle(index)}
                    key={item.id}
                  >
                    {item.name}
                  </div>
                ))}
              </div>
              {favFields.length === 0 ? (
                <span>변경하실 분야를 하나 이상 선택해주세요</span>
              ) : (
                <span onClick={() => setEditFavField(false)}>선택 완료</span>
              )}
            </div>
          ) : (
            <div>
              <div>
                {favFields.map((item, index) => (
                  <span key={index}>{item.name}</span>
                ))}
              </div>
              <span
                onClick={() => {
                  setFavFields([]);
                  setToggleCheck(Array(bookFields.length).fill(false));
                  setEditFavField(true);
                }}
              >
                수정하기
              </span>
            </div>
          )}
        </AfterFavEdit>
      </Edit>
      <EditBtn type="submit" value="수정완료" />
    </UserInfo>
  );
};

const Edit = styled.div`
  border-radius: 5px;
  background-color: ${(props) => props.theme.container.default};
  box-shadow: 1px 2px 3px rgba(0, 0, 0, 0.2);
`;

const AfterFavEdit = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 10px;
  > span {
    font-weight: 700;
    font-size: 12px;
  }
  > div {
    width: 70%;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    > span {
      font-size: 10px;
      color: ${(props) => props.theme.text.lightBlue};
      margin-top: 5px;
    }
    > div {
      display: flex;
      justify-content: end;
      flex-wrap: wrap;
      > span,
      > div {
        cursor: pointer;
        padding: 2px 3px;
        border-radius: 10px;
        margin: 0px 0px 8px 8px;
        font-size: 10px;
        border: 1px solid ${(props) => props.theme.text.lightGray};
        background-color: ${(props) => props.theme.container.default};
        color: ${(props) => props.theme.text.default};
      }
      > span {
        background-color: ${(props) => props.theme.text.lightBlue};
        color: ${(props) => props.theme.text.white};
      }
    }
  }
`;

const UserInfo = styled.ul`
  margin: 20px auto 0;
`;

const List = styled.li`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 10px;
  > p {
    font-size: 10px;
    color: ${(props) => props.theme.text.lightBlue};
    text-align: end;
  }
  > div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    > span:first-child {
      font-weight: 700;
      font-size: 12px;
    }
    > input {
      text-align: end;
      border: none;
      border-bottom: 1px solid ${(props) => props.theme.text.lightGray};
      height: 30px;
      background-color: transparent;
      font-size: 16px;
      color: ${(props) => props.theme.text.gray};
      &:focus {
        outline: none;
      }
    }
    > div:last-child {
      display: flex;
      justify-content: end;
      flex-wrap: wrap;
    }
  }
`;

const EditBtn = styled.input`
  position: absolute;
  top: 15px;
  right: 15px;
  border: none;
  background-color: transparent;
  color: ${(props) => props.theme.text.accent};
  font-weight: 700;
  padding-top: 2px;
  font-size: 12px;
`;

export default BeforeEdit;
