import { BookDocument, recommendBookState } from "data/bookAtom";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";

interface PropsType {
  findbookData: BookDocument;
}

const RegisterRecommendButton = ({ findbookData }: PropsType) => {
  const navigator = useNavigate();
  const setRecommendedBook = useSetRecoilState(recommendBookState);

  const onClick = () => {
    setRecommendedBook(findbookData);
    const confirm = window.confirm(
      "추천책 정보가 등록되었어요. 작성 페이지로 돌아갈게요!"
    );
    if (confirm) {
      navigator("/bookmeeting");
    } else {
      return;
    }
  };
  return (
    <Container>
      <RegisterButton onClick={onClick}>나의 추천책으로 등록</RegisterButton>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const RegisterButton = styled.button`
  font-size: 13px;
  border: none;
  border-radius: 5px;
  padding: 3px 6px;
  margin: 15px auto;
  width: fit-content;
  height: 30px;
  font-weight: 700;
  color: ${(props) => props.theme.text.accent};
  background-color: ${(props) => props.theme.container.lightBlue};
  cursor: pointer;
  &.isActive {
    pointer-events: none;
  }
`;

export default RegisterRecommendButton;
