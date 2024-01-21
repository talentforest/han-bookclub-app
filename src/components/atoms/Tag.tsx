import styled from 'styled-components';

type TagColor = 'green' | 'purple' | 'blue' | 'yellow';

interface Props {
  name: string;
  roundedFull?: boolean;
  color?: TagColor;
}

export default function Tag({
  name,
  roundedFull = true,
  color = 'blue',
}: Props) {
  return (
    <InfoTag $rounded={roundedFull} $color={color}>
      {name}
    </InfoTag>
  );
}

const InfoTag = styled.h4<{ $rounded: boolean; $color: TagColor }>`
  padding: 6px 12px 4px;
  height: fit-content;
  width: fit-content;
  box-shadow: ${({ theme }) => theme.boxShadow};
  border-radius: ${({ $rounded }) => ($rounded ? '30px' : '8px')};
  color: ${({ $color }) =>
    $color === 'blue'
      ? '#3d70a0'
      : $color === 'yellow'
      ? '#9f8116'
      : $color === 'purple'
      ? '#695ac8'
      : $color === 'green'
      ? '#379a32'
      : ''};
  background-color: ${({ $color }) =>
    $color === 'blue'
      ? '#d1e9ff'
      : $color === 'yellow'
      ? '#ffe69d'
      : $color === 'purple'
      ? '#e3defd'
      : $color === 'green'
      ? '#bcf5d5'
      : ''};
  font-size: 14px;
`;
