import { Time } from "util/Time";
import styled from "styled-components";

interface PropsType {
  text: string;
  createdAt: number;
  creatorId: string;
  uid: string;
}

const ByRecord = ({ text, createdAt, creatorId, uid }: PropsType) => {
  return (
    <TextBox>
      <form>
        <Writer>
          <User>
            <ProfileImg />
            <span>username</span>
          </User>
        </Writer>
      </form>
      <div>{text}</div>
      <RegisterTime>{Time(createdAt)}</RegisterTime>
    </TextBox>
  );
};

const TextBox = styled.div`
  box-shadow: 0px 3px 4px rgba(0, 0, 0, 0.3);
  margin: 10px 0;
  padding: 10px;
  background-color: ${(props) => props.theme.container.default};
  border-radius: 5px;
  pre {
    white-space: pre-wrap;
    line-height: 22px;
  }
`;

const Writer = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 5px;
  margin-bottom: 10px;
  border-bottom: 1px solid ${(props) => props.theme.text.lightGray};
`;

const User = styled.div`
  display: flex;
  align-items: center;
`;

const ProfileImg = styled.div`
  width: 26px;
  height: 26px;
  border-radius: 50%;
  background-color: ${(props) => props.theme.container.lightBlue};
  margin-right: 5px;
`;

const RegisterTime = styled.div`
  font-size: 10px;
  color: ${(props) => props.theme.text.gray};
  text-align: end;
  padding: 15px 0 10px;
`;

export default ByRecord;
