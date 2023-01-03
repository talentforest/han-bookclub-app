import { useState } from 'react';
import useCreateVoteBox from 'hooks/useCreateVoteBox';
import Guide from 'components/common/Guide';
import 'react-datepicker/dist/react-datepicker.css';
import device from 'theme/mediaQueries';
import styled from 'styled-components';
import VoteDeadLine from './VoteDeadLine';
import VoteItems from './VoteItems';
import AddVoteItem from './AddVoteItem';

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
  } = useCreateVoteBox({ setModalOpen, endDate });

  return (
    <CreateBox onSubmit={onRegisterSubmit}>
      <Title>투표함 생성하기</Title>
      <Vote>
        <VoteTitle>투표 제목</VoteTitle>
        <TitleInput
          type='text'
          placeholder='투표의 제목을 적어주세요.'
          value={vote.title}
          onChange={onTitleChange}
          name='title'
          required
        />
        <Guide
          text='투표항목으로 선정한 이유에 대한 작성은 선택사항입니다. 그렇지만 만약 책을 투표에 올렸다면, 왜 이 책을 선정했는지를 각 항목에
          작성해주세요!~'
        />
        <VoteTitle $marginTop={'20px'}>투표 항목</VoteTitle>
        <VoteItems
          vote={vote}
          onTitleChange={onTitleChange}
          onItemDeleteClick={onItemDeleteClick}
        />
        <AddVoteItem vote={vote} onItemPlusClick={onItemPlusClick} />
      </Vote>
      <VoteDeadLine endDate={endDate} setEndDate={setEndDate} />
      <RegisterBtn type='submit'>투표 등록하기</RegisterBtn>
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
  justify-content: space-between;
  min-height: 30vh;
  max-height: 80vh;
  margin: 40px 25px;
  padding: 15px 20px;
  border-radius: 15px;
  background-color: ${(props) => props.theme.container.blue};
  @media ${device.tablet} {
    width: 70%;
    margin: 0 auto;
    border-radius: 10px;
    top: 80px;
  }
`;

const TitleInput = styled.input`
  font-size: 16px;
  width: 100%;
  padding: 10px 3px;
  border-radius: 5px;
  border: 1px solid ${(props) => props.theme.text.lightGray};
  background-color: ${(props) => props.theme.container.default};
  margin-bottom: 10px;
  &:focus {
    outline: none;
    border-bottom: 2px solid ${(props) => props.theme.container.yellow};
  }
  @media ${device.tablet} {
    margin-bottom: 20px;
  }
`;

const Vote = styled.div`
  margin-bottom: 10px;
  padding: 15px;
  width: 100%;
  font-size: 16px;
  border-radius: 10px;
  background-color: ${(props) => props.theme.container.default};
  @media ${device.tablet} {
    font-size: 18px;
  }
`;

const Title = styled.span`
  display: block;
  margin-bottom: 10px;
  font-weight: 700;
  font-size: 18px;
  color: ${(props) => props.theme.text.default};
`;

const VoteTitle = styled.div<{ $marginTop?: string }>`
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 10px;
  margin-top: ${(props) => props.$marginTop};
`;

const RegisterBtn = styled.button`
  cursor: pointer;
  font-size: 16px;
  font-weight: 700;
  margin-top: 30px;
  padding: 8px;
  border: none;
  border-radius: 5px;
  background-color: ${(props) => props.theme.container.yellow};
  color: ${(props) => props.theme.text.accent};
  @media ${device.tablet} {
    height: 50px;
    font-size: 16px;
    padding: 10px 12px;
  }
`;

export default VoteCreateBox;
