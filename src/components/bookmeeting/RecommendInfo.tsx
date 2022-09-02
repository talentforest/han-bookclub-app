import { recommendBookState } from "data/bookAtom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";

interface PropsType {
  smSize?: string;
}

const RecommendInfo = ({ smSize }: PropsType) => {
  const myRecommendBook = useRecoilValue(recommendBookState);

  return (
    <Recommend smSize={smSize}>
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

export default RecommendInfo;
