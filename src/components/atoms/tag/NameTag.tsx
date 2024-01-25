import UserNameBox from 'components/atoms/UserNameBox';
import styled from 'styled-components';

interface Props {
  name: string;
  color?: string;
}

export default function NameTag({ name, color = '#fff7c8' }: Props) {
  return (
    <TagItem $color={color}>
      <UserNameBox fontSize={14} creatorId={name} />
    </TagItem>
  );
}

const TagItem = styled.li<{ $color: string }>`
  border-radius: 5px;
  padding: 3px 6px 0;
  background-color: ${({ $color }) => $color};
  list-style: none;
  height: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
`;