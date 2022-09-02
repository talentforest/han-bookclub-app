import { Add, CheckCircleOutline, Close, Info } from "@mui/icons-material";
import React, { useState } from "react";
import useCreateVoteBox from "hooks/useCreateVoteBox";
import styled from "styled-components";
import device from "theme/mediaQueries";
import DatePicker from "react-datepicker";
import { ko } from "date-fns/esm/locale";
import "react-datepicker/dist/react-datepicker.css";
import Guide from "components/common/Guide";

interface PropsType {
  setModalOpen: (modalOpen: boolean) => void;
}

const VoteCreateBox = ({ setModalOpen }: PropsType) => {
  const [endDate, setEndDate] = useState(new Date());

  const {
    vote,
    onRegisterSubmit,
    onTitleChange,
    onItemPlusClick,
    onItemDeleteClick,
  } = useCreateVoteBox(setModalOpen, endDate);

  return (
    <CreateBox onSubmit={onRegisterSubmit}>
      <Vote>
        <h1>투표 제목</h1>
        <TitleInput
          type="text"
          placeholder="투표의 제목을 적어주세요."
          value={vote.title}
          onChange={onTitleChange}
          name="title"
          required
        />
        <h2>투표 항목</h2>
        <Explain>
          <Guide text="투표항목으로 선정한 이유에 대한 작성은 선택사항입니다." />
          <Guide
            text="하지만 만약 책을 투표에 올렸다면, 왜 이 책을 선정했는지를 각 항목에
            작성해주세요."
          />
        </Explain>
        <VoteItems>
          {vote.voteItem?.map((item) => (
            <li key={item.id}>
              <div>
                <CheckCircleOutline />
                <Input
                  type="text"
                  placeholder="투표항목을 적어주세요."
                  name={`vote_item${item.id}`}
                  value={item.item}
                  onChange={(event) => onTitleChange(event, item.id)}
                  required
                />
                {item.id > 2 && (
                  <Close onClick={() => onItemDeleteClick(item.id)} />
                )}
              </div>
              <textarea
                placeholder="투표항목으로 선정한 이유를 작성해주세요."
                value={item.selectReason}
                name={`selectReason${item.id}`}
                onChange={(event) => onTitleChange(event, item.id)}
              />
            </li>
          ))}
        </VoteItems>
        <AddVoteItem onClick={onItemPlusClick}>
          <Add />
          투표항목 추가하기
        </AddVoteItem>
        {vote.voteItem?.length > 5 && (
          <span>
            <Info />
            투표항목은 6개를 넘을 수 없습니다.
          </span>
        )}
      </Vote>
      <Deadline>
        <span>투표 종료일 설정</span>
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
      <button type="submit">투표 등록하기</button>
    </CreateBox>
  );
};

const CreateBox = styled.form`
  z-index: 2;
  overflow: scroll;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  min-height: 30vh;
  max-height: 80vh;
  margin: 40px 25px;
  padding: 20px;
  border-radius: 5px;
  background-color: ${(props) => props.theme.container.blue};
  > button {
    cursor: pointer;
    font-size: 16px;
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

const TitleInput = styled.input`
  font-size: 16px;
  width: 100%;
  padding: 10px 3px;
  border-radius: 5px;
  border: 1px solid ${(props) => props.theme.text.lightGray};
  background-color: transparent;
  margin-bottom: 10px;
  &:focus {
    outline: none;
    border-bottom: 2px solid ${(props) => props.theme.container.yellow};
  }
  @media ${device.tablet} {
    margin-bottom: 20px;
  }
`;

const Input = styled.input`
  font-size: 16px;
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
  padding: 15px;
  width: 100%;
  font-size: 16px;
  border-radius: 5px;
  background-color: ${(props) => props.theme.container.default};
  > h1 {
    display: block;
    margin-bottom: 6px;
    font-weight: 700;
    font-size: 16px;
    color: ${(props) => props.theme.text.default};
  }
  > h2 {
    display: block;
    font-size: 16px;
    margin: 20px 0 6px;
    font-weight: 700;
    color: ${(props) => props.theme.text.default};
  }
  > span {
    font-size: 14px;
    font-weight: 700;
    margin: 5px 0;
    svg {
      float: left;
      margin: 5px 3px 0 0;
      width: 16px;
      height: 16px;
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
  }
`;

const Explain = styled.div`
  border-radius: 5px;
  background-color: ${(props) => props.theme.container.lightBlue};
  margin-bottom: 10px;
  padding: 8px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const VoteItems = styled.div`
  li {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 15px;
    &:last-child {
      margin-bottom: 0;
    }
    > div {
      display: flex;
      width: 100%;
      align-items: center;
      svg {
        margin-right: 5px;
        width: 18px;
        height: 18px;
        fill: ${(props) => props.theme.text.accent};
        &:last-child {
          position: absolute;
          right: 0;
          width: 18px;
          height: 18px;
          cursor: pointer;
        }
      }
      input {
        width: 100%;
        height: 30px;
        font-size: 16px;
      }
    }
    > textarea {
      font-size: 16px;
      width: 100%;
      margin-top: 5px;
      padding: 10px 5px;
      border-radius: 5px;
      border: none;
      border: 1px solid ${(props) => props.theme.text.lightGray};
      resize: none;
      &::placeholder {
        line-height: 22px;
      }
      &:focus {
        outline: none;
      }
    }
  }
  @media ${device.tablet} {
    margin-top: 20px;
    span {
      font-size: 16px;
    }
    li {
      display: flex;
      flex-direction: column;
      div {
      }
      svg {
        width: 18px;
        height: 18px;
      }
      input {
        height: 45px;
      }
    }
  }
`;

const Deadline = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  padding: 15px;
  background-color: ${(props) => props.theme.container.default};
  span {
    display: block;
    font-size: 16px;
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
  padding: 10px 5px;
  border-radius: 5px;
  font-size: 16px;
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
  font-size: 16px;
  margin-top: 20px;
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
