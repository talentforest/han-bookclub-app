import { SENTENCES2024 } from 'constants/index';
import { currentUserState } from 'data/userAtom';
import { ChangeEvent, useState } from 'react';
import { useRecoilValue } from 'recoil';
import Modal from 'components/atoms/Modal';
import SquareBtn from 'components/atoms/button/SquareBtn';
import styled from 'styled-components';
import device from 'theme/mediaQueries';
import useAddDoc from 'hooks/handleFbDoc/useAddDoc';
import Input from 'components/atoms/input/Input';

interface Props {
  onToggleClick: () => void;
  book: { title: string; thumbnail: string };
}

export default function SentenceAddModal({ onToggleClick, book }: Props) {
  const [sentence, setSentence] = useState('');
  const [page, setPage] = useState('');

  const currentUser = useRecoilValue(currentUserState);

  const { title, thumbnail } = book;

  const docData = {
    title,
    thumbnail,
    creatorId: currentUser.uid,
    createdAt: Date.now(),
    text: sentence,
    page: +page,
  };

  const { onAddDocSubmit, onChange } = useAddDoc({
    setText: setSentence,
    collName: SENTENCES2024,
    docData,
  });

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (sentence === '') {
      return window.alert('문구가 작성되지 않았습니다.');
    }

    if (page === '') {
      return window.alert('페이지가 작성되지 않았습니다.');
    }

    onAddDocSubmit(event);

    onToggleClick();
    alert(
      '문구가 추가되었습니다. 공유해주신 좋은 문구를 멤버들이 볼 수 있게 되었어요!'
    );
  };

  const onPageChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPage(event.target.value);
  };

  return (
    <Modal title='공유하고 싶은 문구 등록하기' onToggleClick={onToggleClick}>
      <form onSubmit={onSubmit}>
        <Textarea
          placeholder='공유하고 싶은 문구를 작성해주세요.'
          onChange={onChange}
          value={sentence}
        />

        <PageBox>
          <label htmlFor='페이지'>문구가 적힌 페이지</label>
          <Input
            id='페이지'
            name='sentence-page'
            placeholder='페이지를 작성해주세요.'
            value={`${page}`}
            onChange={onPageChange}
          />
        </PageBox>

        <SquareBtn type='submit' name='등록하기' />
      </form>
    </Modal>
  );
}

const Textarea = styled.textarea`
  width: 100%;
  height: 100px;
  font-size: 16px;
  white-space: pre-wrap;
  word-wrap: break-word;
  resize: none;
  box-shadow: ${({ theme }) => theme.boxShadow};
  border: 1px solid ${({ theme }) => theme.container.gray};
  padding: 6px 8px;
  margin-bottom: 20px;
  border-radius: 10px;
  &::placeholder {
    color: #aaa;
  }
  &:focus {
    outline: none;
  }
  @media ${device.tablet} {
    height: 130px;
  }
`;

const PageBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-bottom: 20px;
  label {
    padding-left: 5px;
    display: block;
    font-size: 14px;
    color: ${({ theme }) => theme.container.blue3};
  }
`;
