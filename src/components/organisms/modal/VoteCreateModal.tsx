import { useState } from 'react';
import { FiCheckCircle } from 'react-icons/fi';
import useCreateVoteBox from 'hooks/useCreateVoteBox';
import 'react-datepicker/dist/react-datepicker.css';
import device from 'theme/mediaQueries';
import styled from 'styled-components';
import VoteModalDeadLine from '../VoteModalDeadLine';
import VoteModalItems from '../VoteModalItems';
import VoteModalAddItem from '../VoteModalAddItem';
import Modal from 'components/atoms/Modal';
import SquareBtn from 'components/atoms/button/SquareBtn';
import GuideLine from 'components/atoms/GuideLine';
import Input from 'components/atoms/input/Input';

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

        <Input
          type='text'
          placeholder='투표의 제목을 적어주세요.'
          value={vote.title}
          onChange={onTitleChange}
          name='title'
          required
        />

        <GuideLine
          text='모임책 선정과 관련된 투표라면, 왜 이 책을 선정했는지를 각 항목에
            작성해주세요!'
          color='green'
        />

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

        <VoteModalItems
          vote={vote}
          onTitleChange={onTitleChange}
          onItemDeleteClick={onItemDeleteClick}
          openTextArea={openTextArea}
        />

        <VoteModalAddItem vote={vote} onItemPlusClick={onItemPlusClick} />

        <VoteModalDeadLine endDate={endDate} setEndDate={setEndDate} />

        <SquareBtn type='submit' name='투표 등록하기' />
      </Form>
    </Modal>
  );
};

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: scroll;
  scroll-behavior: auto;
  padding-bottom: 10px;
  padding: 4px;
  &::-webkit-scrollbar {
    display: none;
  }
  label {
    color: ${({ theme }) => theme.text.blue2};
    font-size: 14px;
    margin: 5px 0 5px 3px;
  }
  @media ${device.tablet} {
  }
`;

const LabelBox = styled.div`
  margin-top: 15px;
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
    font-size: 14px;
    color: ${({ $active, theme }) =>
      $active ? theme.text.gray4 : theme.text.gray2};
  }
`;

export default VoteCreateModal;
