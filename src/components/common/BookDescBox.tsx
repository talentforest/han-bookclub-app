import styled from "styled-components";

const BookDescBox = () => {
  return (
    <Box>
      <Details open>
        <summary>도서 정보 보기</summary>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum,
          similique quam vitae veniam ad consectetur cum harum quaerat maiores
          quia earum fugit provident, officia qui voluptatem totam
          exercitationem laborum et!
        </p>
        <li>저자: 김상욱(지은이)</li>
        <li>출판사: 동아시아</li>
        <li>출간일: 2018년 11월 07일</li>
        <li>페이지: 333p</li>
        <li>분야: 소설</li>
      </Details>
    </Box>
  );
};

const Box = styled.div`
  padding: 0px 10px;
`;

const Details = styled.details`
  margin-bottom: 20px;
  summary {
    font-size: 13px;
    font-weight: 700;
  }
  p {
    font-size: 12px;
    margin: 8px 0;
    word-break: break-all;
  }
  li {
    font-size: 12px;
    display: block;
    margin: 3px 0 0;
  }
`;

export default BookDescBox;
