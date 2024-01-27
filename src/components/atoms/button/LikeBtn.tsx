import { FiHeart } from 'react-icons/fi';
import styled from 'styled-components';

interface Props {
  collName: string;
  like: boolean;
  onLikeClick: () => void;
}

export default function LikeBtn({ collName, like, onLikeClick }: Props) {
  return (
    <Btn type='button' disabled={!collName} onClick={onLikeClick}>
      <FiHeart
        stroke={!collName ? '#aaa' : 'red'}
        fill={!collName ? '#aaa' : !like ? 'transparent' : 'red'}
        fontSize={13}
      />
    </Btn>
  );
}

const Btn = styled.button`
  line-height: 0;
  padding: 2px;
`;
