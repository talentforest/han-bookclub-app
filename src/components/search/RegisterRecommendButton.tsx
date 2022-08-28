import { IBookApi, recommendBookState } from "data/bookAtom";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";

interface PropsType {
  searchedBook: IBookApi;
}

const RegisterRecommendButton = ({ searchedBook }: PropsType) => {
  const navigator = useNavigate();
  const setRecommendedBook = useSetRecoilState(recommendBookState);

  const onClick = () => {
    setRecommendedBook(searchedBook);
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
