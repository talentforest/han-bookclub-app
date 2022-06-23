import { BookDocument } from "data/bookAtom";
import { DocumentType } from "components/bookmeeting/Subjects";
import styled from "styled-components";
import device from "theme/mediaQueries";

interface PropsType {
  docData: BookDocument | DocumentType;
  onModalOpen?: () => void;
  smSize?: string;
}

const BookTitleImgBox = ({ docData, onModalOpen, smSize }: PropsType) => {
  return (
    <>
      {docData ? (
        <BookCoverTitleBox smSize={smSize}>
          <img
            src={docData?.thumbnail}
            alt="Book_Image"
            onClick={onModalOpen}
          />
          <h3>{docData?.title}</h3>
        </BookCoverTitleBox>
      ) : (
        <EmptySign smSize={smSize}>
          <div />
          <span>등록된 책이 없습니다.</span>
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
  width: 100%;
  height: ${(props) => (props.smSize ? "fit-content" : "135px")};
  img {
    width: auto;
    height: ${(props) => (props.smSize ? "24px" : "100px")};
    box-shadow: 2px 3px 5px rgba(0, 0, 0, 0.5);
  }
  h3 {
    text-align: center;
    margin-left: ${(props) => (props.smSize ? "10px" : "0px")};
    font-size: ${(props) => (props.smSize ? "10px" : "14px")};
    font-weight: 700;
  }
  @media ${device.tablet} {
    height: ${(props) => (props.smSize ? "fit-content" : "200px")};
    img {
      height: ${(props) => (props.smSize ? "24px" : "150px")};
    }
    h3 {
      font-size: ${(props) => (props.smSize ? "10px" : "18px")};
    }
  }
  @media ${device.desktop} {
  }
`;

const EmptySign = styled.div<{ smSize: string }>`
  display: flex;
  flex-direction: ${(props) => (props.smSize ? "row" : "column")};
  justify-content: ${(props) =>
    props.smSize ? "flex-start" : "space-between"};
  align-items: center;
  margin: 5px auto 0;
  height: ${(props) => (props.smSize ? "fit-content" : "140px")};
  div {
    display: flex;
    justify-content: center;
    align-items: center;
    width: ${(props) => (props.smSize ? "17px" : "70px")};
    height: ${(props) => (props.smSize ? "24px" : "100px")};
    box-shadow: 2px 3px 5px rgba(0, 0, 0, 0.5);
    background-color: ${(props) => props.theme.container.default};
  }
  span {
    margin-left: 10px;
    font-size: ${(props) => (props.smSize ? "10px" : "14px")};
    font-weight: 700;
  }
`;

export default BookTitleImgBox;
