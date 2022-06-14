import { BookDocument } from "data/bookAtom";
import { DocumentType } from "components/bookmeeting/Subjects";
import styled from "styled-components";

interface PropsType {
  docData: BookDocument | DocumentType;
  onModalOpen?: () => void;
  smSize?: string;
}

const BookTitleImgBox = ({ docData, onModalOpen, smSize }: PropsType) => {
  return (
    <>
      {docData ? (
        <BookCoverTitleBox onClick={onModalOpen} smSize={smSize}>
          <img src={docData?.thumbnail} alt="Book_Image" />
          <h3>{docData?.title}</h3>
        </BookCoverTitleBox>
      ) : (
        <EmptySign>
          등록된 책이
          <br />
          없습니다.
        </EmptySign>
      )}
    </>
  );
};

const BookCoverTitleBox = styled.div<{ smSize: string }>`
  display: flex;
  flex-direction: ${(props) => (props.smSize ? "row" : "column")};
  justify-content: ${(props) =>
    props.smSize ? "flex-start" : "space-between"};
  align-items: center;
  margin: 5px auto 0;
  height: ${(props) => (props.smSize ? "fit-content" : "140px")};
  img {
    width: auto;
    height: ${(props) => (props.smSize ? "24px" : "100px")};
    box-shadow: 2px 3px 5px rgba(0, 0, 0, 0.5);
  }
  h3 {
    margin-left: 10px;
    font-size: ${(props) => (props.smSize ? "10px" : "14px")};
    font-weight: 700;
  }
`;

const EmptySign = styled.div`
  text-align: center;
  height: 130px;
  width: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.2);
  background-color: ${(props) => props.theme.container.default};
  font-size: 13px;
  font-weight: 700;
`;

export default BookTitleImgBox;
