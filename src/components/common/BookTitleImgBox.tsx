import { IBookApi } from "data/bookAtom";
import { useState } from "react";
import Overlay from "./Overlay";
import BookDesc from "./BookDesc";
import styled from "styled-components";
import device from "theme/mediaQueries";

interface PropsType {
  thumbnail: string;
  title: string;
  detailInfo?: IBookApi;
  smSize?: string;
}

const BookTitleImgBox = ({
  thumbnail,
  title,
  detailInfo,
  smSize,
}: PropsType) => {
  const [showBookDetail, setShowBookDetail] = useState(false);

  const onModalClick = () => {
    setShowBookDetail((prev) => !prev);
  };

  return (
    <>
      {thumbnail && title ? (
        <BookCoverTitleBox smSize={smSize}>
          <img
            src={thumbnail}
            alt={`${title}Book_Image`}
            onClick={onModalClick}
          />
          <h3>{title}</h3>
          {detailInfo && showBookDetail && (
            <BookDetail>
              <Overlay onModalClick={onModalClick} />
              <BookDesc detailInfo={detailInfo} onModalClick={onModalClick} />
            </BookDetail>
          )}
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
  justify-content: ${(props) => (props.smSize ? "flex-start" : "space-around")};
  gap: 5px;
  align-items: center;
  margin: 0 auto 10px;
  width: 100%;
  height: ${(props) => (props.smSize ? "fit-content" : "200px")};
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

const BookDetail = styled.div`
  z-index: 1;
  position: fixed;
  height: 100vh;
  top: 0px;
  bottom: 0px;
  right: 0;
  left: 0;
  > ul {
    z-index: 2;
    position: fixed;
    top: 30px;
    right: 0;
    left: 0;
    width: 80%;
    margin: 0 auto;
    border-radius: 5px;
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
    width: ${(props) => (props.smSize ? "30px" : "95px")};
    height: ${(props) => (props.smSize ? "46px" : "130px")};
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
