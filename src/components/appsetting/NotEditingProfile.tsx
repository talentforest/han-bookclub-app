import { useRecoilValue } from "recoil";
import { currentUserState } from "data/userAtom";
import { AccountCircle, ModeEditOutline } from "@mui/icons-material";
import { extraUserData } from "routes/EditProfile";
import { EditBtn } from "./EditingProfile";
import { authService } from "fbase";
import styled from "styled-components";
import device from "theme/mediaQueries";

interface PropsType {
  setEditing: (editing: boolean) => void;
  extraUserData: extraUserData;
}

const NotEditingProfile = ({ setEditing, extraUserData }: PropsType) => {
  const userData = useRecoilValue(currentUserState);
  const anonymous = authService.currentUser?.isAnonymous;

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
      {!anonymous && (
        <EditBtn>
          <input onClick={onClick} type="button" value="프로필 수정하기" />
          <ModeEditOutline />
        </EditBtn>
      )}
      <UserInfo>
        <List>
          <div>
            <span>이메일</span>
            <span>{anonymous ? "익명의 방문자" : userData.email}</span>
          </div>
          {!anonymous && <p>이메일은 변경할 수 없습니다.</p>}
        </List>
        <List>
          <div>
            <span>닉네임</span>
            <span>{anonymous ? "익명의 방문자" : userData.displayName}</span>
          </div>
        </List>
        <List>
          <div>
            <span>좋아하는 분야</span>
            <div>
              {anonymous
                ? "익명의 방문자"
                : extraUserData?.favoriteBookField?.map((item) => (
                    <FavFieldItem key={item.id}>{item.name}</FavFieldItem>
                  ))}
            </div>
          </div>
        </List>
      </UserInfo>
    </>
  );
};

const UserImg = styled.div`
  margin-top: 20px;
  img {
    object-fit: cover;
    width: 140px;
    height: 140px;
    padding: 10px;
    border-radius: 50%;
  }
  svg {
    width: 140px;
    height: 140px;
  }
  @media ${device.tablet} {
    img {
      width: 200px;
      height: 200px;
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
    font-size: 14px;
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
      font-size: 14px;
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
      justify-content: flex-end;
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
  padding: 3px 5px;
  border-radius: 20px;
  margin: 4px 0px 4px 8px;
  font-size: 14px;
  border: 1px solid ${(props) => props.theme.text.lightGray};
  color: ${(props) => props.theme.text.white};
  background-color: ${(props) => props.theme.text.lightBlue};
  @media ${device.tablet} {
    font-size: 16px;
    padding: 5px 10px;
    border-radius: 30px;
  }
`;

export default NotEditingProfile;
