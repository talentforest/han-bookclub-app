import { FiHeart } from 'react-icons/fi';

interface Props {
  collName: string;
  like: boolean;
  onLikeClick: () => void;
}

export default function LikeBtn({ collName, like, onLikeClick }: Props) {
  return (
    <button
      type="button"
      disabled={!collName}
      onClick={onLikeClick}
      className="p-1"
    >
      <FiHeart
        stroke={!collName ? '#aaa' : 'red'}
        fill={!collName ? '#aaa' : !like ? 'transparent' : 'red'}
        fontSize={13}
      />
    </button>
  );
}
