import { useState } from "react";
import { IBookApi, recommendBookState } from "data/bookAtom";
import { Link } from "react-router-dom";
import { Search } from "@mui/icons-material";
import { currentUserState } from "data/userAtom";
import { useRecoilValue } from "recoil";
import BookTitleImgBox from "components/common/BookTitleImgBox";
import useAddDoc from "hooks/useAddDoc";
import device from "theme/mediaQueries";
import styled from "styled-components";

interface PropsType {
  uid: string;
  thisMonthBook: IBookApi;
  docMonth: string;
}

const RecommendCreateBox = ({ thisMonthBook, docMonth }: PropsType) => {
  const [text, setText] = useState("");
  const myRecommendBook = useRecoilValue(recommendBookState);
  const userData = useRecoilValue(currentUserState);
  const collectionName = `BookMeeting Info/${docMonth}/recommended book`;

  const docData = {
    text: text,
    createdAt: Date.now(),
    creatorId: userData.uid,
    title: thisMonthBook?.title,
    thumbnail: thisMonthBook?.thumbnail,
    recommendBookTitle: myRecommendBook?.title,
    recommendBookThumbnail: myRecommendBook?.thumbnail,
    recommendBookUrl: myRecommendBook?.url,
    recommendBookAuthor: myRecommendBook?.authors,
  };

  const { onAddDocSubmit, onTextChange } = useAddDoc({
    text,
    setText,
    collectionName,
    docData,
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (myRecommendBook?.title === "") {
      window.alert("추천책 정보를 찾아서 넣어주세요.");
      return;
    }
    onAddDocSubmit(event);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Link to="/search">
        <Search />
        추천책 정보 찾기
      </Link>
      <textarea
        placeholder="이달의 책과 관련해 추천하고 싶은 책을 작성해주세요. 위에서 추천책 정보를 찾으실 수 있습니다."
        onChange={onTextChange}
        value={text}
      />
      {myRecommendBook?.thumbnail ? (
        <>
          <h5>추천책 정보</h5>
          <Recommend smSize="smSize">
            <img src={myRecommendBook.thumbnail} alt="recommend book" />
            <div>
              <h5>{myRecommendBook.title}</h5>
              <span>{myRecommendBook?.authors?.join(", ")}</span>
              {myRecommendBook.url && (
                <a href={myRecommendBook.url} target="_blank" rel="noreferrer">
                  상세정보 보러가기
                </a>
              )}
            </div>
          </Recommend>
        </>
      ) : (
        <></>
      )}
      <ThisMonthBook>
        <BookTitleImgBox
          thumbnail={thisMonthBook.thumbnail}
          title={thisMonthBook.title}
          smSize={"smSize"}
        />
        <input type="submit" value="추천하기" />
      </ThisMonthBook>
    </Form>
  );
};

export const Recommend = styled.div<{ smSize: string }>`
  display: flex;
  align-items: center;
  background-color: ${(props) => props.theme.container.default};
  padding: 5px 10px;
  border-radius: 5px;
  > img {
    width: auto;
    height: ${(props) => (props.smSize ? "40px" : "70px")};
    margin-right: 15px;
    box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.5);
  }
  > div {
    font-size: 12px;
    height: min-content;

    > h5 {
      font-weight: 700;
    }
    > span {
      margin-right: 10px;
    }
    > a {
      font-size: 12px;
      color: ${(props) => props.theme.text.accent};
    }
  }
`;

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
    padding: 15px 20px;
    textarea {
      height: 130px;
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

export default RecommendCreateBox;
