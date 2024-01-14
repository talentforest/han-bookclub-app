import UsernameBox from 'components/organisms/UsernameBox';
import styled from 'styled-components';

interface Props {
  name: string;
}

export default function NameTag({ name }: Props) {
  return (
    <TagItem>
      <UsernameBox fontSize={14} creatorId={name} />
    </TagItem>
  );
}

const TagItem = styled.li`
  border-radius: 5px;
  padding: 0 8px;
  background-color: #eee;
  list-style: none;
  height: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
