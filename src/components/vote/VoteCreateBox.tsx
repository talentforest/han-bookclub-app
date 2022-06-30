import { Add, CheckCircleOutline, Close } from "@mui/icons-material";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/esm/locale";
import styled from "styled-components";
import useCreateVoteBox from "hooks/useCreateVoteBox";
import device from "theme/mediaQueries";

interface PropsType {
  setModalOpen: (modalOpen: boolean) => void;
}

const VoteCreateBox = ({ setModalOpen }: PropsType) => {
  const [endDate, setEndDate] = useState(new Date());

  const { vote, onSubmit, onChange, onPlusClick, onDeleteClick } =
    useCreateVoteBox(setModalOpen, endDate);

  return (
    <CreateBox onSubmit={onSubmit}>
      <div>
        <Vote>
          <span>투표 제목</span>
          <Input
            type="text"
            placeholder="등록하실 투표의 제목을 적어주세요."
            value={vote.title}
            onChange={onChange}
            name="title"
            required
          />
          <ul>
            <span>투표 항목</span>
            {vote.voteItem.map((item, index: number) => (
              <li key={index}>
                <CheckCircleOutline />
                <Input
                  type="text"
                  placeholder="투표항목을 적어주세요."
                  name={`vote_item${index}`}
                  value={item.item}
                  onChange={(event) => onChange(event, index)}
                  required
                />
                {index > 1 && <Close onClick={() => onDeleteClick(index)} />}
              </li>
            ))}
          </ul>
          <AddVoteItem onClick={onPlusClick}>
            <Add />
            투표항목 추가하기
          </AddVoteItem>
          {vote.voteItem.length > 7 && (
            <span>투표항목은 8개를 넘을 수 없습니다.</span>
          )}
        </Vote>
        <Deadline>
          <span>투표 종료일</span>
          <DatePick
            name="datepick"
            selected={endDate}
            onChange={(date: Date) => setEndDate(date)}
            selectsEnd
            endDate={endDate}
            minDate={new Date()}
            locale={ko}
            dateFormat="yyyy년 MM월 dd일"
          />
        </Deadline>
      </div>
      <button type="submit">투표 등록하기</button>
    </CreateBox>
  );
};

const CreateBox = styled.form`
  z-index: 2;
  position: fixed;
  overflow: scroll;
  top: 0;
  right: 0;
  left: 0;
  min-height: 30vh;
  max-height: 75vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  margin: 30px;
  padding: 15px;
  border-radius: 5px;
  box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.3);
  background-color: ${(props) => props.theme.container.purple};
  > div {
    width: 100%;
  }
  > button {
    cursor: pointer;
    font-size: 14px;
    font-weight: 700;
    margin-top: 30px;
    padding: 8px;
    border: none;
    border-radius: 5px;
    background-color: ${(props) => props.theme.container.yellow};
    color: ${(props) => props.theme.text.accent};
  }
  @media ${device.tablet} {
    width: 70%;
    margin: 0 auto;
    border-radius: 10px;
    top: 80px;
    > button {
      height: 50px;
      font-size: 16px;
      padding: 10px 12px;
    }
  }
`;

const Input = styled.input`
  font-size: 15px;
  width: 100%;
  height: 30px;
  padding-left: 3px;
  border: none;
  border-bottom: 1px solid ${(props) => props.theme.text.lightGray};
  background-color: transparent;
  &:focus {
    outline: none;
    border-bottom: 2px solid ${(props) => props.theme.container.yellow};
  }
  @media ${device.tablet} {
    font-size: 16px;
    height: 50px;
  }
`;

const Vote = styled.div`
  margin-bottom: 10px;
  padding: 10px;
  width: 100%;
  font-size: 16px;
  border-radius: 5px;
  background-color: ${(props) => props.theme.container.default};
  > span {
    display: block;
    margin-bottom: 6px;
    font-weight: 700;
    font-size: 13px;
  }
  > ul {
    margin-top: 20px;
    span {
      display: block;
      font-size: 14px;
      margin-bottom: 6px;
      font-weight: 700;
    }
    li {
      position: relative;
      display: flex;
      align-items: center;
      margin-bottom: 15px;
      &:last-child {
        margin-bottom: 0;
      }
      svg {
        margin-right: 5px;
        width: 16px;
        height: 16px;
        &:last-child {
          position: absolute;
          right: 0;
          cursor: pointer;
          width: 14px;
          height: 14px;
        }
      }
      input {
        width: 100%;
        height: 30px;
      }
    }
  }
  @media ${device.tablet} {
    font-size: 18px;
    > span {
      display: block;
      margin-bottom: 6px;
      font-size: 16px;
      font-weight: 700;
    }
    > ul {
      margin-top: 20px;
      span {
        font-size: 16px;
      }
      li {
        svg {
          width: 18px;
          height: 18px;
        }
        input {
          height: 45px;
        }
      }
    }
  }
`;

const Deadline = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  padding: 20px;
  background-color: ${(props) => props.theme.container.default};
  span {
    display: block;
    font-size: 14px;
    font-weight: 700;
    margin-bottom: 8px;
  }
  @media ${device.tablet} {
    span {
      font-size: 16px;
      margin-bottom: 12px;
    }
  }
`;

const DatePick = styled(DatePicker)`
  width: 100%;
  height: 32px;
  padding: 10px;
  border-radius: 5px;
  font-size: 15px;
  border: 1px solid ${(props) => props.theme.text.lightGray};
  cursor: pointer;
  &:focus {
    outline: none;
    border: 1px solid ${(props) => props.theme.container.blue};
  }
  @media ${device.tablet} {
    font-size: 16px;
    padding: 15px;
  }
`;

const AddVoteItem = styled.div`
  width: fit-content;
  cursor: pointer;
  display: flex;
  align-items: center;
  font-size: 13px;
  margin-top: 15px;
  color: ${(props) => props.theme.text.accent};
  svg {
    width: 18px;
    height: 18px;
    fill: ${(props) => props.theme.text.accent};
  }
  @media ${device.tablet} {
    font-size: 16px;
    svg {
      width: 20px;
      height: 20px;
      fill: ${(props) => props.theme.text.accent};
    }
  }
`;

export default VoteCreateBox;
