import styled from 'styled-components';

interface ILoadingProps {
  height?: string;
}

const Loading = ({ height }: ILoadingProps) => {
  return <LoadingBox $height={height}>로딩중...</LoadingBox>;
};

const LoadingBox = styled.div<{ $height: string }>`
  column-span: all;
  width: 100%;
  height: ${({ $height }) => ($height ? $height : '70vh')};
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default Loading;
