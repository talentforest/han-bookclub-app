import { BigBox } from "theme/globalStyle";
import styled from "styled-components";

const BookDescBox = () => {
  return (
    <Book>
      <img src={require("assets/떨림과_울림.jpeg")} alt="Book" />
      <div>
        <h3>떨림과 울림</h3>
        <span>김상욱</span>
        <BookDesc>
          <span>분야: 소설</span>
          <span>출판사: 동아시아</span>
          <span>출간일: 2018년 11월 07일</span>
        </BookDesc>
      </div>
    </Book>
  );
};

const Book = styled(BigBox)`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto 40px;
  img {
    height: 135px;
    width: auto;
    margin-right: 20px;
  }
  > div {
    margin-left: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    h3 {
      font-size: 15px;
      margin-bottom: 8px;
    }
    > span {
      font-size: 13px;
    }
  }
`;

const BookDesc = styled.div`
  margin-top: 30px;
  span {
    font-size: 12px;
    display: block;
    margin: 5px 0 0;
  }
`;

export default BookDescBox;
