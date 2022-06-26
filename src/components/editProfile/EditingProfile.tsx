import { bookFields } from "util/constants";
import { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { currentUserState } from "data/userAtom";
import { extraUserData } from "routes/EditProfile";
import styled from "styled-components";

interface PropsType {
  extraUserData: extraUserData;
  newDisplayName: string;
  setNewDisplayName: (newDisplayName: string) => void;
  onHandleClick: (
    index: number,
    event: React.FormEvent<HTMLButtonElement>
  ) => void;
}

const EditingProfile = ({
  extraUserData,
  newDisplayName,
  setNewDisplayName,
  onHandleClick,
}: PropsType) => {
  const userData = useRecoilValue(currentUserState);

  useEffect(() => {
    if (!newDisplayName) {
      setNewDisplayName(userData.displayName);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onChange = (event: React.FormEvent<HTMLInputElement>) => {
    setNewDisplayName(event.currentTarget.value);
  };

  const isSelected = (id: number) => {
    return extraUserData?.favoriteBookField.some((item) => item.id === id);
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
              value={newDisplayName || ""}
              required
              autoFocus
            />
          </div>
        </List>
        <AfterFavEdit>
          <span>좋아하는 분야</span>
          <div>
            <div>
              {bookFields.map((item) => (
                <button
                  onClick={(event) => onHandleClick(item.id, event)}
                  className={isSelected(item.id) ? "isActive" : ""}
                  key={item.id}
                  type="button"
                  name={item.name}
                >
                  {item.name}
                </button>
              ))}
            </div>
            {extraUserData?.favoriteBookField.length === 0 ? (
              <span>변경하실 분야를 하나 이상 선택해주세요</span>
            ) : (
              <></>
            )}
          </div>
        </AfterFavEdit>
      </Edit>
      <EditBtn type="submit" value="수정완료" />
    </UserInfo>
  );
};

const Edit = styled.div`
  cursor: pointer;
  border-radius: 5px;
  background-color: ${(props) => props.theme.container.default};
  box-shadow: 1px 2px 3px rgba(0, 0, 0, 0.2);
`;

const AfterFavEdit = styled.div`
  cursor: pointer;
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
      > button {
        cursor: pointer;
        padding: 2px 3px;
        border-radius: 10px;
        margin: 0px 0px 8px 8px;
        font-size: 10px;
        border: none;
        background-color: ${(props) => props.theme.container.default};
        color: ${(props) => props.theme.text.default};
        &.isActive {
          background-color: #5162ff;
          color: #fff;
        }
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
  cursor: pointer;
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

export default EditingProfile;
