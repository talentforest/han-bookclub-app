import { TaskAlt } from '@mui/icons-material';
import styled from 'styled-components';

interface IPostButtonProps {
  value: string;
}

const PostBtn = ({ value }: IPostButtonProps) => {
  return (
    <Button type='submit'>
      {value} <TaskAlt />
    </Button>
  );
};

const Button = styled.button`
  align-self: flex-end;
  display: flex;
  align-items: center;
  justify-content: center;
  width: fit-content;
  border: none;
  background-color: ${(props) => props.theme.container.blue};
  padding: 10px 12px;
  border-radius: 5px;
  color: ${(props) => props.theme.text.white};
  font-size: 14px;
  font-weight: 700;
  svg {
    margin-top: 2px;
    margin-left: 5px;
    width: 18px;
    height: 18px;
    fill: ${(props) => props.theme.text.white};
  }
`;

export default PostBtn;
