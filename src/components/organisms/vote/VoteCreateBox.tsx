import { useState } from 'react';
import useCreateVoteBox from 'hooks/useCreateVoteBox';
import Guide from 'components/atoms/Guide';
import 'react-datepicker/dist/react-datepicker.css';
import device from 'theme/mediaQueries';
import styled from 'styled-components';
import VoteDeadLine from './VoteDeadLine';
import VoteItems from './VoteItems';
import AddVoteItem from './AddVoteItem';
import SubmitBtn from 'components/atoms/buttons/SubmitBtn';
import Subtitle from 'components/atoms/Subtitle';

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
      <Section>
        <Subtitle title='투표 제목' />
        <TitleInput
          type='text'
          placeholder='투표의 제목을 적어주세요.'
          value={vote.title}
          onChange={onTitleChange}
          name='title'
          required
        />
      </Section>
      <Guide
        text='투표항목으로 선정한 이유에 대한 작성은 선택사항입니다. 하지만 만약 책을 투표에 올렸다면, 왜 이 책을 선정했는지를 각 항목에
          작성해주세요.'
      />
      <Section>
        <Subtitle title='투표 항목' />
        <VoteItems
          vote={vote}
          onTitleChange={onTitleChange}
          onItemDeleteClick={onItemDeleteClick}
        />
        <AddVoteItem vote={vote} onItemPlusClick={onItemPlusClick} />
      </Section>
      <Section>
        <VoteDeadLine endDate={endDate} setEndDate={setEndDate} />
      </Section>
      <SubmitBtn children='투표 등록하기' />
    </CreateBox>
  );
};

const CreateBox = styled.form`
  z-index: 2;
  overflow: scroll;
  position: fixed;
  top: 30px;
  right: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 30vh;
  max-height: 80vh;
  width: 90vw;
  margin: 0 auto;
  padding: 20px 15px;
  border-radius: 15px;
  background-color: ${(props) => props.theme.container.default};
  @media ${device.tablet} {
    width: 70%;
    margin: 0 auto;
    border-radius: 10px;
    top: 80px;
  }
`;
const Section = styled.section`
  margin-bottom: 30px;
`;
const TitleInput = styled.input`
  font-size: 16px;
  width: 100%;
  padding: 10px 5px;
  border-radius: 10px;
  border: 1px solid ${(props) => props.theme.text.lightGray};
  box-shadow: ${(props) => props.theme.boxShadow};
  margin-bottom: 10px;
  &:focus {
    outline: none;
  }
  @media ${device.tablet} {
    margin-bottom: 20px;
  }
`;

export default VoteCreateBox;
