import styled from "styled-components";

interface PropsType {
  category: string;
  setCategory: (category: string) => void;
}

const CategoryButton = ({ category, setCategory }: PropsType) => {
  const selectedBtnStyle = (categoryName: string) => {
    if (category === categoryName) {
      return {
        backgroundColor: "#5D8AFE",
        color: "white",
      };
    }
  };

  return (
    <SortButton>
      <button
        name="byBook"
        onClick={() => setCategory("byBook")}
        style={selectedBtnStyle("byBook")}
      >
        책별
      </button>
      <button
        name="byRecord"
        onClick={() => setCategory("byRecord")}
        style={selectedBtnStyle("byRecord")}
      >
        기록별
      </button>
    </SortButton>
  );
};

const SortButton = styled.div`
  margin-bottom: 10px;
  box-sizing: border-box;
  button {
    font-size: 11px;
    margin-right: 5px;
    border: none;
    border-radius: 5px;
    background-color: ${(props) => props.theme.text.lightGray};
    color: ${(props) => props.theme.text.gray};
    padding: 5px;
    min-width: 50px;
  }
`;

export default CategoryButton;
