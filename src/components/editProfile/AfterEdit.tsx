import { LogInUserInfo } from "components/App";
import UserIcon from "assets/account_circle.svg";
import styled from "styled-components";
import { extraUserData } from "routes/EditProfile";

interface PropsType {
  loggedInUserObj: LogInUserInfo;
  setEditing: (editing: boolean) => void;
  extraUserData: extraUserData;
}

const AfterEdit = ({
  loggedInUserObj,
  setEditing,
  extraUserData,
}: PropsType) => {
  return (
    <>
      <div>
        <img
          src={
            loggedInUserObj.photoURL === null
              ? UserIcon
              : loggedInUserObj.photoURL
          }
          alt="profileimg"
        />
      </div>
      <EditBtn
        onClick={(prev) => setEditing(true)}
        type="button"
        value="수정하기"
      />
      <UserInfo>
        <List>
          <div>
            <span>이메일</span>
            <span>{loggedInUserObj.email}</span>
          </div>
        </List>
        <List>
          <div>
            <span>별명</span>
            <span>
              {loggedInUserObj.displayName === null
                ? `${loggedInUserObj.email.split("@")[0]}`
                : loggedInUserObj.displayName}
            </span>
          </div>
        </List>
        <List>
          <div>
            <span>좋아하는 분야</span>
            <div>
              {extraUserData?.favoriteBookField.map((item) => (
                <FavFieldItem key={item.name}>{item.name}</FavFieldItem>
              ))}
            </div>
          </div>
        </List>
      </UserInfo>
    </>
  );
};

const UserInfo = styled.ul`
  width: 90%;
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
  > div {
    padding: 10px 0px;
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
