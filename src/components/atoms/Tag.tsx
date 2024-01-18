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

const InfoTag = styled.h1<{ $rounded: boolean; $color: TagColor }>`
  padding: 6px 12px 4px;
  height: fit-content;
  width: fit-content;
  box-shadow: ${(props) => props.theme.boxShadow};
  border-radius: ${(props) => (props.$rounded ? '30px' : '8px')};
  color: ${(props) =>
    props.$color === 'blue'
      ? '#3d70a0'
      : props.$color === 'yellow'
      ? '#9f8116'
      : props.$color === 'purple'
      ? '#695ac8'
      : props.$color === 'green'
      ? '#379a32'
      : ''};
  background-color: ${(props) =>
    props.$color === 'blue'
      ? '#d1e9ff'
      : props.$color === 'yellow'
      ? '#ffe69d'
      : props.$color === 'purple'
      ? '#e3defd'
      : props.$color === 'green'
      ? '#bcf5d5'
      : ''};
  font-size: 14px;
`;
