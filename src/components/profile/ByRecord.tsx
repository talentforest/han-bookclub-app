import { Time } from "util/Time";
import styled from "styled-components";
import { DocumentType } from "components/book/SubjectBox";

const ByRecord = ({ text, createdAt }: DocumentType) => {
  return (
    <TextBox>
      <h4>발제문</h4>
      <p>{text}</p>
      <div>
        <BookInfo>
          <img src={require("assets/떨림과_울림.jpeg")} alt="Book" />
          <h3>떨림과 울림</h3>
        </BookInfo>
        <RegisterTime>{Time(createdAt)}</RegisterTime>
      </div>
    </TextBox>
  );
};

const TextBox = styled.div`
  box-shadow: 0px 3px 4px rgba(0, 0, 0, 0.3);
  margin: 10px 0;
  padding: 10px;
  background-color: ${(props) => props.theme.container.default};
  border-radius: 5px;
  h4 {
    font-size: 10px;
    color: ${(props) => props.theme.text.gray};
    padding-bottom: 5px;
  }
  p {
    white-space: pre-wrap;
    line-height: 22px;
    font-size: 14px;
  }
  div {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

const BookInfo = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;
  img {
    height: 25px;
    width: auto;
    margin-right: 8px;
  }
  h3 {
    font-size: 10px;
  }
`;

const RegisterTime = styled.div`
  font-size: 10px;
  color: ${(props) => props.theme.text.gray};
  text-align: end;
  padding-top: 15px;
`;

export default ByRecord;
