import styled from "styled-components";

interface PropsType {
  category: string;
  setCategory: (category: string) => void;
}

const CategoryButton = ({ category, setCategory }: PropsType) => {
  const borderColor = (categoryName: string) => {
    if (category === categoryName) {
      return "2px solid #5D8AFE";
    }
  };

  return (
    <SortButton>
      <button
        name="byBook"
        onClick={() => setCategory("byBook")}
        style={{
          border: borderColor("byBook"),
        }}
      >
        책별
      </button>
      <button
        name="byRecord"
        onClick={() => setCategory("byRecord")}
        style={{
          border: borderColor("byRecord"),
        }}
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
    background-color: ${(props) => props.theme.container.yellow};
    color: ${(props) => props.theme.text.lightBlue};
    padding: 5px;
    min-width: 50px;
  }
`;

export default CategoryButton;
