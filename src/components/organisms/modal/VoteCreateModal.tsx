import { useState } from 'react';
import useCreateVoteBox from 'hooks/useCreateVoteBox';
import { FiCheckCircle, FiInfo } from 'react-icons/fi';
import 'react-datepicker/dist/react-datepicker.css';
import device from 'theme/mediaQueries';
import styled from 'styled-components';
import VoteDeadLine from '../vote/VoteDeadLine';
import VoteItems from '../vote/VoteItems';
import AddVoteItem from '../vote/AddVoteItem';
import Modal from 'components/atoms/Modal';
import SquareBtn from 'components/atoms/buttons/SquareBtn';

interface PropsType {
  onModalClick: () => void;
}

const VoteCreateModal = ({ onModalClick }: PropsType) => {
  const [endDate, setEndDate] = useState(new Date());
  const [openTextArea, setOpenTextArea] = useState(false);

  const {
    vote,
    onRegisterSubmit,
    onTitleChange,
    onItemPlusClick,
    onItemDeleteClick,
  } = useCreateVoteBox({ endDate, onModalClick });

  return (
    <Modal title='투표 생성' onToggleClick={onModalClick}>
      <Form onSubmit={onRegisterSubmit}>
        <label>투표 제목</label>
        <VoteTitleInput
          type='text'
          placeholder='투표의 제목을 적어주세요.'
          value={vote.title}
          onChange={onTitleChange}
          name='title'
          required
        />

        <GuideBox>
          <FiInfo fontSize={14} stroke='#198d66' />
          <p>
            모임책 선정과 관련된 투표라면, 왜 이 책을 선정했는지를 각 항목에
            작성해주세요!
          </p>
        </GuideBox>

        <LabelBox>
          <label>투표 항목</label>

          <AddTextAreaBtn
            $active={openTextArea}
            type='button'
            onClick={() => setOpenTextArea((prev) => !prev)}
          >
            <FiCheckCircle
              fontSize={12}
              stroke={openTextArea ? '#6884ff' : '#aaa'}
            />
            <span>선정 이유 작성</span>
          </AddTextAreaBtn>
        </LabelBox>

        <VoteItems
          vote={vote}
          onTitleChange={onTitleChange}
          onItemDeleteClick={onItemDeleteClick}
          openTextArea={openTextArea}
        />

        <AddVoteItem vote={vote} onItemPlusClick={onItemPlusClick} />

        <VoteDeadLine endDate={endDate} setEndDate={setEndDate} />

        <SquareBtn type='submit' name='투표 등록하기' />
      </Form>
    </Modal>
  );
};

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 30vh;

  label {
    color: ${({ theme }) => theme.text.blue1};
    font-size: 14px;
    margin: 5px 0 5px 3px;
  }

  @media ${device.tablet} {
  }
`;

const GuideBox = styled.div`
  margin: 5px 0 10px;
  svg {
    float: left;
    margin-right: 4px;
    padding-top: 2px;
  }
  p {
    font-size: 13px;
    color: #198d66;
  }
`;

const VoteTitleInput = styled.input`
  font-size: 16px;
  width: 100%;
  height: 40px;
  padding: 10px 8px;
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.text.gray1};
  box-shadow: 2px 2px 2px 2px rgba(200, 200, 200, 0.2);
  margin-bottom: 5px;
  @media ${device.tablet} {
    margin-bottom: 20px;
  }
`;

const LabelBox = styled.div`
  margin-top: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const AddTextAreaBtn = styled.button<{ $active: boolean }>`
  display: flex;
  align-items: center;
  gap: 4px;
  span {
    padding-top: 2px;
    font-size: 13px;
    color: ${({ $active, theme }) =>
      $active ? theme.container.blue2 : theme.text.gray2};
  }
`;

export default VoteCreateModal;
