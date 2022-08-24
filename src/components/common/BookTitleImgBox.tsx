import { IBookApi } from "data/bookAtom";
import { IWrittenDocs } from "components/bookmeeting/Subjects";
import styled from "styled-components";
import device from "theme/mediaQueries";
import { EventAvailable } from "@mui/icons-material";

interface PropsType {
  docData: IBookApi | IWrittenDocs;
  onModalOpen?: () => void;
  smSize?: string;
}

const BookTitleImgBox = ({ docData, onModalOpen, smSize }: PropsType) => {
  return (
    <>
      {docData ? (
        <BookCoverTitleBox smSize={smSize}>
          {docData?.thumbnail !== "" ? (
            <img
              src={docData?.thumbnail}
              alt="Book_Image"
              onClick={onModalOpen}
            />
          ) : (
            <EventAvailable />
          )}
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

export const BookCoverTitleBox = styled.div<{ smSize: string }>`
  display: flex;
  flex-direction: ${(props) => (props.smSize ? "row" : "column")};
  justify-content: ${(props) =>
    props.smSize ? "flex-start" : "space-between"};
  align-items: center;
  margin: 0 auto;
  width: 100%;
  height: ${(props) => (props.smSize ? "fit-content" : "190px")};
  img {
    box-shadow: 2px 3px 5px rgba(0, 0, 0, 0.5);
    width: auto;
    height: ${(props) => (props.smSize ? "30px" : "140px")};
  }
  svg {
    height: ${(props) => (props.smSize ? "24px" : "100%")};
    width: 70px;
  }
  h3 {
    text-align: center;
    margin-left: ${(props) => (props.smSize ? "10px" : "0px")};
    font-size: ${(props) => (props.smSize ? "12px" : "16px")};
    font-weight: 700;
  }
  @media ${device.tablet} {
    height: ${(props) => (props.smSize ? "fit-content" : "200px")};
    svg,
    img {
      height: ${(props) => (props.smSize ? "46px" : "150px")};
    }
    h3 {
      margin-top: 10px;
      font-size: ${(props) => (props.smSize ? "16px" : "18px")};
      margin-left: ${(props) => (props.smSize ? "16px" : "0px")};
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
  height: ${(props) => (props.smSize ? "fit-content" : "200px")};
  div {
    display: flex;
    justify-content: center;
    align-items: center;
    width: ${(props) => (props.smSize ? "30px" : "110px")};
    height: ${(props) => (props.smSize ? "46px" : "150px")};
    box-shadow: 2px 3px 5px rgba(0, 0, 0, 0.5);
    background-color: ${(props) => props.theme.container.default};
  }
  span {
    margin-top: 10px;
    font-size: ${(props) => (props.smSize ? "16px" : "18px")};
    margin-left: ${(props) => (props.smSize ? "16px" : "0px")};
    font-weight: 700;
  }
`;

export default BookTitleImgBox;
