import Subtitle from "components/common/Subtitle";
import styled from "styled-components";

const BookDescBox = () => {
  return (
    <Box>
      <Subtitle title="도서 정보 보기" />
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum,
        similique quam vitae veniam ad consectetur cum harum quaerat maiores
        quia earum fugit provident, officia qui voluptatem totam exercitationem
        laborum et!
      </p>
      <li>저자: 김상욱(지은이)</li>
      <li>출판사: 동아시아</li>
      <li>출간일: 2018년 11월 07일</li>
      <li>페이지: 333p</li>
      <li>분야: 소설</li>
    </Box>
  );
};

const Box = styled.div`
  padding: 0px 10px;
  > h1:first-child {
    margin: 0;
    border-bottom: 1px solid #c5c5c5;
    display: block;
    width: 100%;
    font-size: 14px;
    padding-bottom: 5px;
  }
  p {
    font-size: 13px;
    margin: 5px 0;
    word-break: break-all;
    line-height: 20px;
  }
  li {
    font-size: 12px;
    display: block;
    margin: 3px 0 0;
  }
`;

export default BookDescBox;
