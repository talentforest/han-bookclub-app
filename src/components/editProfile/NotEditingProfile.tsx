import { useRecoilValue } from "recoil";
import { currentUserState } from "data/userAtom";
import { AccountCircle } from "@mui/icons-material";
import { extraUserData } from "routes/EditProfile";
import styled from "styled-components";
import device from "theme/mediaQueries";

interface PropsType {
  setEditing: (editing: boolean) => void;
  extraUserData: extraUserData;
}

const NotEditingProfile = ({ setEditing, extraUserData }: PropsType) => {
  const userData = useRecoilValue(currentUserState);
  const onClick = () => {
    setEditing(true);
  };
  return (
    <>
      <UserImg>
        {userData.photoURL ? (
          <img src={userData.photoURL} alt="profileimg" />
        ) : (
          <AccountCircle />
        )}
      </UserImg>
      <EditBtn onClick={onClick} type="button" value="프로필 수정하기" />
      <UserInfo>
        <List>
          <div>
            <span>이메일</span>
            <span>{userData.email}</span>
          </div>
          <p>이메일은 변경할 수 없습니다.</p>
        </List>
        <List>
          <div>
            <span>별명</span>
            <span>{userData.displayName}</span>
          </div>
        </List>
        <List>
          <div>
            <span>좋아하는 분야</span>
            <div>
              {extraUserData?.favoriteBookField?.map((item, index) => (
                <FavFieldItem key={index}>{item.name}</FavFieldItem>
              ))}
            </div>
          </div>
        </List>
      </UserInfo>
    </>
  );
};

const UserImg = styled.div`
  margin: 20px 0;
  img {
    object-fit: cover;
    width: 120px;
    height: 120px;
    border-radius: 50%;
  }
  svg {
    width: 140px;
    height: 140px;
  }
  @media ${device.tablet} {
    img {
      width: 180px;
      height: 180px;
    }
    svg {
      width: 200px;
      height: 200px;
    }
  }
`;

const UserInfo = styled.ul`
  margin-top: 30px;
  width: 100%;
  @media ${device.tablet} {
    width: 80%;
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
  @media ${device.tablet} {
    padding: 15px;
    > p {
      font-size: 16px;
    }
    > div {
      > span:first-child {
        font-weight: 700;
        font-size: 16px;
      }
      > input {
        height: 36px;
        font-size: 18px;
      }
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
  @media ${device.tablet} {
    font-size: 16px;
    padding: 5px 10px;
    border-radius: 30px;
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
  cursor: pointer;
  @media ${device.tablet} {
    top: 40px;
    right: 80px;
    font-size: 18px;
  }
`;

export default NotEditingProfile;
