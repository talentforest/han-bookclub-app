import UserName from 'components/atoms/UserName';
import styled from 'styled-components';

interface Props {
  name: string;
  color?: string;
}

export default function NameTag({ name, color = '#fff7c8' }: Props) {
  return (
    <TagItem $color={color}>
      <UserName fontSize={14} creatorId={name} />
    </TagItem>
  );
}

const TagItem = styled.li<{ $color: string }>`
  border-radius: 5px;
  padding: 3px 6px 0;
  background-color: ${({ $color }) => $color};
  list-style: none;
  height: 26px;
  width: fit-content;
  display: flex;
  align-items: center;
  justify-content: center;
`;