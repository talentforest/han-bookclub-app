import styled from 'styled-components';

interface IPostButtonProps {
  value: string;
}

const PostBtn = ({ value }: IPostButtonProps) => {
  return <Button type='submit'>{value}</Button>;
};

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: fit-content;
  height: 100%;
  border: none;
  background-color: ${({ theme }) => theme.container.blue3};
  padding: 12px 14px;
  border-radius: 5px;
  color: #fff;
  font-size: 14px;
`;

export default PostBtn;
