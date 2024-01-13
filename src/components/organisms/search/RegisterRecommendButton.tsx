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

  return (
    <Container>
      <RegisterButton onClick={onClick}>나의 추천책으로 등록</RegisterButton>
      <RegisterButton onClick={onChallengeClick}>
        나의 챌린지 책으로 등록
      </RegisterButton>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;
const RegisterButton = styled.button`
  font-size: 14px;
  border: none;
  border-radius: 10px;
  padding: 3px 10px;
  margin: 10px auto 15px;
  width: fit-content;
  height: 40px;
  font-weight: 700;
  color: ${(props) => props.theme.text.accent};
  background-color: ${(props) => props.theme.container.lightBlue};
  cursor: pointer;
  &.isActive {
    pointer-events: none;
  }
`;

export default RegisterRecommendButton;
