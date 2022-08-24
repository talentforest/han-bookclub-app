import { useState } from "react";
import { authService, dbService } from "fbase";
import { addDoc, collection } from "firebase/firestore";
import { IBookApi, recommendBookState } from "data/bookAtom";
import { Link, useNavigate } from "react-router-dom";
import { Search } from "@mui/icons-material";
import { useRecoilValue } from "recoil";
import device from "theme/mediaQueries";
import styled from "styled-components";
import BookTitleImgBox from "components/common/BookTitleImgBox";
import RecommendInfo from "./RecommendInfo";

interface PropsType {
  uid: string;
  thisMonthBook: IBookApi;
  docMonth: string;
}

const BookRecomCreateBox = ({ uid, thisMonthBook, docMonth }: PropsType) => {
  const [text, setText] = useState("");
  const myRecommendBook = useRecoilValue(recommendBookState);
  const navigate = useNavigate();

  const moveCreateAccountPage = () => {
    const confirm = window.confirm(
      "한페이지 멤버가 되셔야 글 작성이 가능합니다. 아주 간단하게 가입하시겠어요?"
    );
    if (confirm) {
      navigate("/create_account");
      return;
    }
  };

  const addDocRecomBook = async () => {
    await addDoc(
      collection(dbService, `BookMeeting Info/${docMonth}/recommended book`),
      {
        text: text,
        createdAt: Date.now(),
        creatorId: uid,
        title: thisMonthBook?.title,
        thumbnail: thisMonthBook?.thumbnail,
        recommendBookTitle: myRecommendBook?.title,
        recommendBookThumbnail: myRecommendBook?.thumbnail,
        recommendBookUrl: myRecommendBook?.url,
        recommendBookAuthor: myRecommendBook?.authors,
      }
    );
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (text === "") return;
    if (myRecommendBook.title === "") {
      window.alert("추천책 정보를 찾아서 넣어주세요.");
      return;
    }
    try {
      if (authService.currentUser.isAnonymous) {
        moveCreateAccountPage();
      } else {
        addDocRecomBook();
      }
      setText("");
    } catch (error) {
      console.error("Error adding document:", error);
    }
  };

  const onChange = (event: React.FormEvent<HTMLTextAreaElement>) => {
    setText(event.currentTarget.value);
  };

  return (
    <>
      <Form onSubmit={onSubmit}>
        <Link to="search">
          <Search />
          추천책 정보 찾기
        </Link>
        <textarea
          placeholder="이달의 책과 관련해 추천하고 싶은 책을 작성해주세요. 위에서 추천책 정보를 찾으실 수 있습니다."
          onChange={onChange}
          value={text}
        />

        {myRecommendBook?.thumbnail ? (
          <>
            <h5>추천책 정보</h5>
            <RecommendInfo />
          </>
        ) : (
          <></>
        )}
        <ThisMonthBook>
          <BookTitleImgBox docData={thisMonthBook} smSize={"smSize"} />
          <input type="submit" value="추천하기" />
        </ThisMonthBook>
      </Form>
    </>
  );
};

const Form = styled.form`
  box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.3);
  background-color: ${(props) => props.theme.container.lightBlue};
  padding: 10px;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: 20px;
  h5 {
    font-size: 14px;
    font-weight: 700;
    padding: 10px 0 5px;
  }
  a {
    display: flex;
    align-items: center;
    border-radius: 5px;
    width: fit-content;
    font-size: 16px;
    margin-bottom: 10px;
    color: ${(props) => props.theme.text.accent};
    svg {
      width: 22px;
      height: 22px;
      padding-top: 2px;
      fill: ${(props) => props.theme.text.accent};
    }
  }
  textarea {
    width: 100%;
    height: 100px;
    font-size: 16px;
    border-radius: 5px;
    padding: 5px 10px;
    white-space: pre-wrap;
    word-wrap: break-word;
    resize: none;
    border: none;
    &:focus {
      outline: none;
    }
  }
  @media ${device.tablet} {
    padding: 20px;
    textarea {
      height: 150px;
    }
  }
`;

const ThisMonthBook = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-top: 10px;
  > div {
    margin: 0;
  }
  input {
    cursor: pointer;
    border: none;
    background-color: ${(props) => props.theme.container.blue};
    color: #fff;
    border-radius: 5px;
    padding: 3px 5px;
    font-size: 14px;
    height: 40px;
  }
`;

export default BookRecomCreateBox;
