import styled from 'styled-components';

interface Props {
  name: string;
  onClick: () => void;
}

export default function SquareTag({ name, onClick }: Props) {
  return (
    <TagItem>
      <button type='button' onClick={onClick}>
        {name}
      </button>
    </TagItem>
  );
}

const TagItem = styled.li`
  border: 1px solid #f4fab3;
  padding: 8px 12px 6px;
  border-radius: 8px;
  font-size: 15px;
  color: #aaa;
  background-color: ${(props) => props.theme.container.yellow};
`;
