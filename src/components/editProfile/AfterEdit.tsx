import { LogInUserInfo } from "components/App";
import UserIcon from "assets/account_circle.svg";
import styled from "styled-components";
import { BookFieldType } from "components/loginForm/UserDataInputForm";

interface PropsType {
  userObj: LogInUserInfo;
  setEditing: (editing: boolean) => void;
  favFields: BookFieldType[];
}

const AfterEdit = ({ userObj, setEditing, favFields }: PropsType) => {
  const onClick = () => {
    setEditing(true);
  };
  return (
    <>
      <div>
        <img
          src={userObj.photoURL === null ? UserIcon : userObj.photoURL}
          alt="profileimg"
        />
      </div>
      <EditBtn onClick={onClick} type="button" value="수정하기" />
      <UserInfo>
        <List>
          <div>
            <span>이메일</span>
            <span>{userObj.email}</span>
          </div>
          <p>이메일은 변경할 수 없습니다.</p>
        </List>

        <List>
          <div>
            <span>별명</span>
            <span>
              {userObj.displayName === null
                ? `${userObj.email.split("@")[0]}`
                : userObj.displayName}
            </span>
          </div>
        </List>
        <List>
          <div>
            <span>좋아하는 분야</span>
            <div>
              {favFields.map((item, index) => (
                <FavFieldItem key={index}>{item.name}</FavFieldItem>
              ))}
            </div>
          </div>
        </List>
      </UserInfo>
    </>
  );
};

const UserInfo = styled.ul`
  width: 100%;
  margin: 20px auto 0;
  > p {
    font-size: 10px;
    color: ${(props) => props.theme.text.lightBlue};
  }
`;

const List = styled.li`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 10px;
  > p {
    font-size: 10px;
    color: ${(props) => props.theme.text.lightBlue};
    margin-top: 5px;
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

const FavFieldItem = styled.span`
  cursor: pointer;
  width: fit-content;
  padding: 2px 3px;
  border-radius: 10px;
  margin: 4px 0px 4px 8px;
  font-size: 10px;
  border: 1px solid ${(props) => props.theme.text.lightGray};
  color: ${(props) => props.theme.text.white};
  background-color: ${(props) => props.theme.text.lightBlue};
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

export default AfterEdit;
