import { FiUserCheck } from 'react-icons/fi';
import UserName from 'components/atoms/UserName';
import styled from 'styled-components';

interface Props {
  creatorId: string;
}

export default function CreatorBox({ creatorId }: Props) {
  return (
    <Box>
      <FiUserCheck
        fontSize={13}
        style={{ stroke: '#888', marginBottom: '3px' }}
      />
      <span className='label'>작성자</span>
      <UserName tag userId={creatorId} />
    </Box>
  );
}

const Box = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  > span {
    font-size: 14px;
    color: #666;
  }
`;
