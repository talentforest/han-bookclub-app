import styled from 'styled-components';

interface Props {
  name: string;
}

export default function SquareBtn({ name }: Props) {
  return (
    <Btn>
      <span>{name}</span>
    </Btn>
  );
}

const Btn = styled.button`
  border: 1px solid red;
`;
