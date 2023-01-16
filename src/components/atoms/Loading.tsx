import { CircularProgress } from '@mui/material';
import styled from 'styled-components';
import device from 'theme/mediaQueries';

const Loading = ({ full }: { full: boolean }) => {
  return (
    <Load $full={full}>
      <CircularProgress size={40} />
    </Load>
  );
};

const Load = styled.div<{ $full: boolean }>`
  width: ${(props) => (props.$full ? '100vw' : '100%')};
  height: ${(props) => (props.$full ? '70vh' : '40vh')};
  display: flex;
  justify-content: center;
  align-items: center;
  @media ${device.tablet} {
  }
`;

export default Loading;
