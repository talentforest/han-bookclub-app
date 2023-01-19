import { CircularProgress } from '@mui/material';
import styled from 'styled-components';
import device from 'theme/mediaQueries';

interface ILoadingProps {
  height?: string;
}

const Loading = ({ height }: ILoadingProps) => {
  return (
    <Load $height={height}>
      <CircularProgress size={40} />
    </Load>
  );
};

const Load = styled.div<{ $height: string }>`
  width: ${(props) => (props.$height ? '100%' : '100vh')};
  height: ${(props) => (props.$height ? props.$height : '70vh')};
  display: flex;
  justify-content: center;
  align-items: center;
  @media ${device.tablet} {
  }
`;

export default Loading;
