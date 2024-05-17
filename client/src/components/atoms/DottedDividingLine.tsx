import styled from 'styled-components';

export default function DottedDividingLine() {
  return <Line />;
}

const Line = styled.div`
  border-bottom: 2px dotted #ccc;
`;
