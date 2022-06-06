import {
  BookCoverTitleBox,
  Container,
  Header,
  ScrollContainer,
} from "theme/commonStyle";
import { deviceSizes } from "theme/mediaQueries";
import { useRecoilState, useRecoilValue } from "recoil";
import { bookDescState } from "data/bookAtom";
import { bookSearchHandler } from "api/api";
import { useEffect, useState } from "react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { dbService } from "fbase";
import { currentUserState } from "data/userAtom";
import { DocumentType } from "components/bookmeeting/Subjects";
import LinkButton from "components/common/LinkButton";
import useWindowSize from "hooks/useWindowSize";
import Subtitle from "components/common/Subtitle";
import MeetingInfoBox from "components/common/MeetingInfoBox";
import VoteBox from "components/common/VoteBox";
import Title from "components/common/Title";
import styled from "styled-components";
import MenuIcon from "@mui/icons-material/Menu";
import BookRecomCreateBox from "components/common/BookRecomCreateBox";
import BookRecomBox from "components/common/BookRecomBox";

const Home = () => {
  const [recommendBook, setRecommendBook] = useState<DocumentType[]>([]);
  const [bookInfo, setBookInfo] = useRecoilState(bookDescState);
  const userData = useRecoilValue(currentUserState);
  const { windowSize } = useWindowSize();
  const Month = new Date().getMonth() + 1;

  useEffect(() => {
    getThisMonthBook();
    getAllRecommends();

    return () => {
      getThisMonthBook();
      getAllRecommends();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getThisMonthBook = async () => {
    const q = query(
      collection(dbService, "Book of the Month"),
      orderBy("createdAt", "desc")
    );

    onSnapshot(q, (querySnapshot) => {
      const newArray = querySnapshot.docs.map((doc) => {
        return {
          ...doc.data(),
        };
      });
      if (newArray.length) {
        bookSearchHandler(newArray[0]?.bookTitle, true, setBookInfo);
      }
    });
  };

  const getAllRecommends = async () => {
    const q = query(
      collection(dbService, "Recommened_Book"),
      orderBy("createdAt", "desc")
    );

    onSnapshot(q, (querySnapshot) => {
      const newArray = querySnapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });
      setRecommendBook(newArray as DocumentType[]);
    });
  };

  return (
    <>
      {windowSize.width < +deviceSizes.tablet ? (
        <NewHeader>
          <Title title="독서모임 한 페이지" />
          <MenuIcon />
        </NewHeader>
      ) : (
        <></>
      )}
      <NewContainer>
        <section>
          <Subtitle title={`${Month}월의 책`} />
          {bookInfo.length !== 0 ? (
            <BookCoverTitleBox>
              <img src={bookInfo[0]?.thumbnail} alt="Book_Image" />
              <h3>{bookInfo[0]?.title}</h3>
            </BookCoverTitleBox>
          ) : (
            <EmptySign>
              <span>등록된 책이 없습니다.</span>
            </EmptySign>
          )}
          <LinkButton link={"/bookmeeting"} title="발제하러 가기" />
        </section>
        <section>
          <Subtitle title={`${Month}월의 모임 일정`} />
          <p>: 매월 셋째주 일요일</p>
          <MeetingInfoBox />
          <LinkButton
            link={"/bookmeeting/review"}
            title="모임 후기 작성하러 가기"
          />
        </section>
        <section>
          <Subtitle title={`${Month}월의 투표`} />
          <ScrollContainer>
            <div>
              <VoteBox />
              <VoteBox />
            </div>
          </ScrollContainer>
          <LinkButton link={"/vote"} title="투표하러 가기" />
        </section>
        <section>
          <Subtitle title="같은 분야의 추천책" />
          <BookCoverTitleBox>
            <img src={bookInfo[0]?.thumbnail} alt="Book_Image" />
            <h3>{bookInfo[0]?.title}</h3>
          </BookCoverTitleBox>
          <BookRecomCreateBox uid={userData?.uid} />
          {recommendBook.map((item) => (
            <BookRecomBox key={item.id} item={item} />
          ))}
        </section>
      </NewContainer>
    </>
  );
};

const NewHeader = styled(Header)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 40px;
  > div {
    display: flex;
    align-items: center;
    > svg {
      margin-left: 5px;
      fill: ${(props) => props.theme.text.gray};
      cursor: pointer;
      width: 24px;
      height: 24px;
    }
  }
`;

const NewContainer = styled(Container)`
  > section {
    margin: 0 auto;
    > h1 {
      margin-top: 20px;
    }
    > p {
      font-size: 12px;
      font-weight: 700;
      margin: 0 15px 10px;
      color: ${(props) => props.theme.text.lightBlue};
    }
    > a {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      svg {
        padding-top: 2px;
        fill: ${(props) => props.theme.text.lightBlue};
      }
    }
  }
  > section:first-child {
    > h1 {
      margin-top: 0;
    }
  }
`;

const EmptySign = styled.div`
  text-align: center;
  height: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.2);
  background-color: ${(props) => props.theme.container.default};
  font-size: 13px;
  font-weight: 700;
`;

export default Home;
