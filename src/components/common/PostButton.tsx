import { TaskAlt } from "@mui/icons-material";
import styled from "styled-components";

interface IPostButtonProps {
  value: string;
}

const PostButton = ({ value }: IPostButtonProps) => {
  return (
    <Button type="submit">
      {value} <TaskAlt />
    </Button>
  );
};

const Button = styled.button`
  align-self: flex-end;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 130px;
  border: none;
  background-color: ${(props) => props.theme.container.blue};
  padding: 8px 10px;
  border-radius: 5px;
  color: ${(props) => props.theme.text.white};
  font-weight: 700;
  svg {
    margin-left: 5px;
    width: 20px;
    height: 20px;
    fill: ${(props) => props.theme.text.white};
  }
`;

export default PostButton;
