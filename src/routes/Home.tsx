import {
  BookCoverTitleBox,
  Container,
  Header,
  ScrollContainer,
} from "theme/commonStyle";
import { deviceSizes } from "theme/mediaQueries";
import { useRecoilValue } from "recoil";
import { useEffect, useState } from "react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { dbService } from "fbase";
import { currentUserState } from "data/userAtom";
import { DocumentType } from "components/bookmeeting/Subjects";
import { Book } from "@mui/icons-material";
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
  const [thisMonthBookDocData, setThisMonthBookDocData] = useState([]);
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
      setThisMonthBookDocData(newArray);
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
          {thisMonthBookDocData.length !== 0 ? (
            <BookCoverTitleBox>
              <img
                src={thisMonthBookDocData[0]?.book.thumbnail}
                alt="Book_Image"
              />
              <h3>{thisMonthBookDocData[0]?.book.title}</h3>
            </BookCoverTitleBox>
          ) : (
            <BookCoverTitleBox>
              <EmptySign>
                <Book />
              </EmptySign>
              <h3>등록된 책이 아직 없습니다.</h3>
            </BookCoverTitleBox>
          )}
          <LinkButton link={"/bookmeeting"} title="발제하러 가기" />
        </section>
        <section>
          <Subtitle title={`${Month}월의 모임 일정`} />
          <p>: 매월 셋째주 일요일</p>
          <MeetingInfoBox data={thisMonthBookDocData[0]} />
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
            <img src={thisMonthBookDocData[0]?.thumbnail} alt="Book_Image" />
            <h3>{thisMonthBookDocData[0]?.title}</h3>
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
  width: 70px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.2);
  background-color: ${(props) => props.theme.container.default};
  font-size: 13px;
  font-weight: 700;
  margin: 0 auto;
`;

export default Home;
