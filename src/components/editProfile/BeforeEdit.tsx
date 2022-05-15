import { LogInUserInfo } from "components/App";
import ProfileImage from "components/common/ProfileImage";
import styled from "styled-components";
import { bookFields } from "util/Constants";

interface PropsType {
  loggedInUserObj: LogInUserInfo;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  refreshUser: () => void;
  profileImgUrl: string;
  setProfileImgUrl: () => void;
  onChange: () => void;
  newDisplayName: () => void;
  onHandleClick: () => void;
  toggleCheck: boolean;
}

const BeforeEdit = ({
  loggedInUserObj,
  onSubmit,
  refreshUser,
  profileImgUrl,
  setProfileImgUrl,
  onChange,
  newDisplayName,
  onHandleClick,
  toggleCheck,
}: PropsType) => {
  // const selectedItemStyle = (index: number) => {
  //   return {
  //     backgroundColor: `${toggleCheck[index] ? "#5162FF" : ""}`,
  //     color: `${toggleCheck[index] ? "#fff" : ""}`,
  //   };
  // };

  return (
    <Form onSubmit={onSubmit}>
      <ProfileImage
        loggedInUserObj={loggedInUserObj}
        refreshUser={refreshUser}
        profileImgUrl={profileImgUrl}
        setProfileImgUrl={setProfileImgUrl}
      />
      <UserInfo>
        <p>
          이메일과 이름은 변경할 수 없습니다.
          <br /> 관리자에게 문의해주세요.
        </p>
        <List>
          <div>
            <span>이메일</span>
            <span>{loggedInUserObj.email}</span>
          </div>
        </List>
        <List>
          <div>
            <span>별명</span>
            <input
              onChange={onChange}
              type="text"
              placeholder="닉네임을 입력해주세요"
              // value={newDisplayName}
              required
              autoFocus
            />
          </div>
        </List>
        <FavBookEdit>
          <span>좋아하는 분야</span>
          <div>
            <span>변경하실 분야를 선택해주세요.</span>
            <FieldContainer>
              {bookFields.map((item, index) => (
                <div
                  // onClick={(event) => onHandleClick(index, event)}
                  // style={selectedItemStyle(index)}
                  key={item.id}
                >
                  {item.name}
                </div>
              ))}
            </FieldContainer>
          </div>
        </FavBookEdit>
        <EditBtn type="submit" value="수정완료" />
      </UserInfo>
    </Form>
  );
};

const FavBookEdit = styled.div`
  display: flex;
  justify-content: space-between;
  > span:first-child {
    padding: 10px 0;
    font-weight: 700;
    font-size: 12px;
  }
  > div {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    width: 70%;
    > span {
      font-size: 10px;
      color: ${(props) => props.theme.text.lightBlue};
      padding: 10px 0;
    }
  }
`;

const FieldContainer = styled.div`
  width: 260px;
  display: flex;
  flex-wrap: wrap;
  justify-content: end;
  > div {
    cursor: pointer;
    padding: 2px 3px;
    border-radius: 10px;
    margin: 0px 0px 8px 8px;
    font-size: 10px;
    border: 1px solid ${(props) => props.theme.text.lightGray};
    background-color: ${(props) => props.theme.container.default};
    &:hover {
      background-color: ${(props) => props.theme.container.yellow};
    }
  }
`;

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

const Form = styled.form`
  width: 100%;
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
