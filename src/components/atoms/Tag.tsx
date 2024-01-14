import styled from 'styled-components';

interface Props {
  name: string;
  roundedFull?: boolean;
  bgColor?: string;
}

export default function Tag({
  name,
  roundedFull = true,
  bgColor = '#d1e9ff',
}: Props) {
  return (
    <InfoTag $rounded={roundedFull} $color={bgColor}>
      {name}
    </InfoTag>
  );
}

const InfoTag = styled.h1<{ $rounded: boolean; $color: string }>`
  padding: 7px 14px 5px;
  box-shadow: ${(props) => props.theme.boxShadow};
  border-radius: ${(props) => (props.$rounded ? '30px' : '8px')};
  color: #333;
  background-color: ${(props) => props.$color};
  font-size: 14px;
`;
