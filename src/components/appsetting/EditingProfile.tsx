import { bookFields } from "util/constants";
import { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { currentUserState } from "data/userAtom";
import { extraUserData } from "routes/EditProfile";
import { Check } from "@mui/icons-material";
import styled from "styled-components";
import ProfileImage from "components/common/ProfileImage";
import device from "theme/mediaQueries";

interface PropsType {
  onProfileSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  profileImgUrl: string;
  setProfileImgUrl: (profileImgUrl: string) => void;
  extraUserData: extraUserData;
  newDisplayName: string;
  setNewDisplayName: (newDisplayName: string) => void;
  onHandleClick: (
    index: number,
    event: React.FormEvent<HTMLButtonElement>
  ) => void;
}

const EditingProfile = ({
  onProfileSubmit,
  profileImgUrl,
  setProfileImgUrl,
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
    <Form onSubmit={onProfileSubmit}>
      <ProfileImage
        profileImgUrl={profileImgUrl}
        setProfileImgUrl={setProfileImgUrl}
      />
      <EditBtn>
        <input type="submit" value="수정완료" />
        <Check />
      </EditBtn>
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
              <span>닉네임</span>
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
              {extraUserData?.favoriteBookField.length === 0 ? (
                <EmptySign>변경하실 분야를 하나 이상 선택해주세요</EmptySign>
              ) : (
                <></>
              )}
            </div>
          </AfterFavEdit>
        </Edit>
      </UserInfo>
    </Form>
  );
};

export const EditBtn = styled.div`
  margin: 0 auto;
  cursor: pointer;
  border: 1px solid ${(props) => props.theme.container.lightBlue};
  background-color: ${(props) => props.theme.container.default};
  padding: 2px 10px;
  border-radius: 20px;
  width: fit-content;
  display: flex;
  align-items: center;
  input {
    border: none;
    background-color: transparent;
    color: ${(props) => props.theme.text.lightBlue};
    font-weight: 700;
    font-size: 12px;
  }
  svg {
    width: 14px;
    height: 14px;
    fill: ${(props) => props.theme.text.lightBlue};
  }
  @media ${device.tablet} {
    input {
      font-size: 18px;
    }
  }
`;

const Form = styled.form`
  width: 100%;
`;

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
    font-size: 14px;
    font-weight: 700;
  }
  > div {
    width: 70%;
    display: flex;
    flex-wrap: wrap;
    > button {
      cursor: pointer;
      padding: 3px 5px;
      margin: 0px 0px 8px 8px;
      font-size: 14px;
      border-radius: 20px;
      border: none;
      background-color: ${(props) => props.theme.container.default};
      color: ${(props) => props.theme.text.default};
      &.isActive {
        background-color: #5162ff;
        color: #fff;
      }
    }
  }
  @media ${device.tablet} {
    padding: 15px;
    > span {
      font-size: 16px;
    }
    > div {
      > button {
        font-size: 16px;
        padding: 5px 6px;
        border-radius: 20px;
        margin: 0px 0px 15px 15px;
      }
    }
  }
`;

const EmptySign = styled.span`
  display: block;
  width: 100%;
  text-align: end;
  color: ${(props) => props.theme.text.accent};
  font-size: 13px;
  @media ${device.tablet} {
    font-size: 16px;
  }
`;

const UserInfo = styled.ul`
  margin: 30px auto 0;
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
    margin-top: 5px;
    color: ${(props) => props.theme.text.lightBlue};
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
      width: 70%;
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

export default EditingProfile;
