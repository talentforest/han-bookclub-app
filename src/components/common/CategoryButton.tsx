import { useMatch } from "react-router-dom";
import styled from "styled-components";
import device from "theme/mediaQueries";

interface PropsType {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}

const CategoryButton = ({
  selectedCategory,
  setSelectedCategory,
}: PropsType) => {
  const historyCategoryMatch = useMatch("/history/*");

  const onButtonClick = (category: string) => {
    if (category) return setSelectedCategory(category);
  };

  function setButtonName() {
    const historyName = {
      recommends: "추천했던 책",
      subjects: "발제문 기록",
      reviews: "모임 기록",
    };

    const currentName = {
      recommends: "추천책 작성",
      subjects: "발제문 작성",
      reviews: "모임후기 작성",
    };

    if (historyCategoryMatch) return historyName;
    return currentName;
  }

  return (
    <Categories>
      <button
        onClick={() => onButtonClick("recommends")}
        className={selectedCategory === "recommends" ? "isActive" : ""}
      >
        {setButtonName().recommends}
      </button>
      <button
        onClick={() => onButtonClick("subjects")}
        className={selectedCategory === "subjects" ? "isActive" : ""}
      >
        {setButtonName().subjects}
      </button>
      <button
        onClick={() => onButtonClick("reviews")}
        className={selectedCategory === "reviews" ? "isActive" : ""}
      >
        {setButtonName().reviews}
      </button>
    </Categories>
  );
};

const Categories = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 5px;
  padding: 5px;
  margin: 20px 0;
  border-radius: 60px;
  background-color: ${(props) => props.theme.container.lightBlue};
  > button {
    cursor: pointer;
    width: 100%;
    padding: 8px;
    font-size: 13px;
    font-weight: 700;
    border: none;
    border-radius: 30px;
    background-color: #eaeaea;
    color: #aaa;
    &.isActive {
      background-color: ${(props) => props.theme.container.blue};
      color: ${(props) => props.theme.text.white};
    }
  }
  @media ${device.tablet} {
    height: 50px;
    border-radius: 30px;
    > a {
      height: 100%;
      font-size: 16px;
    }
  }
`;

export default CategoryButton;
