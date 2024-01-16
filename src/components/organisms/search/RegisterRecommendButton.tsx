import { IBookApi, recommendBookState } from 'data/bookAtom';
import { categoryState } from 'data/categoryAtom';
import { doc, updateDoc } from 'firebase/firestore';
import { dbService } from 'fbase';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { CHALLENGE, thisYear } from 'util/index';
import { useEffect, useState } from 'react';
import { getDocument } from 'api/getFbDoc';
import styled from 'styled-components';

interface PropsType {
  searchedBook: IBookApi;
}

const RegisterRecommendButton = ({ searchedBook }: PropsType) => {
  const navigator = useNavigate();
  const setRecommendedBook = useSetRecoilState(recommendBookState);
  const setCategory = useSetRecoilState(categoryState);
  const [challengeDoc, setChallengeDoc] = useState({ id: '', challenge: [] });
  const onClick = () => {
    setRecommendedBook(searchedBook);
    const confirm = window.confirm(
      '추천하는 책 정보가 등록되었어요. 작성 페이지로 돌아갈게요!'
    );
    if (confirm) {
      setCategory('recommends');
      navigator('/bookclub');
    } else {
      return;
    }
  };

  useEffect(() => {
    getDocument(CHALLENGE, `${thisYear}`, setChallengeDoc);
  }, []);

  const document = doc(dbService, CHALLENGE, `${thisYear}`);

  const onChallengeClick = async () => {
    const newChallengeBook = { user: '', book: searchedBook };
    await updateDoc(document, {
      challenge: [...challengeDoc.challenge, newChallengeBook],
    });
  };

  return <RegisterButton onClick={onClick}>선택</RegisterButton>;
};

const RegisterButton = styled.button`
  font-size: 13px;
  color: ${(props) => props.theme.text.accent};
  background-color: ${(props) => props.theme.container.lightBlue};
  cursor: pointer;
  &.isActive {
    pointer-events: none;
  }
`;

export default RegisterRecommendButton;
