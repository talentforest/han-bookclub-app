import { FiAlertOctagon, FiInfo } from 'react-icons/fi';
import styled from 'styled-components';
import device from 'theme/mediaQueries';

type GuideColor = 'red' | 'green' | 'gray';

interface PropsType {
  text: string;
  color?: GuideColor;
  icon?: boolean;
}

const GuideLine = ({ text, color = 'gray', icon = true }: PropsType) => {
  return (
    <Box $color={color}>
      {icon && (color === 'red' ? <FiAlertOctagon /> : <FiInfo />)}
      <span>{text}</span>
    </Box>
  );
};

const Box = styled.div<{ $color: GuideColor }>`
  margin: 0px 4px 0px;
  > svg {
    width: 14px;
    height: 14px;
    float: left;
    margin: 2px 5px 0 0;
    stroke: ${({ $color, theme }) =>
      $color === 'gray'
        ? theme.text.gray3
        : $color === 'red'
        ? theme.text.red
        : $color === 'green'
        ? theme.text.green
        : theme.text.blue2};
  }
  > span {
    line-height: 1.5;
    font-size: 14px;
    color: ${({ $color, theme }) =>
      $color === 'gray'
        ? theme.text.gray3
        : $color === 'red'
        ? theme.text.red
        : $color === 'green'
        ? theme.text.green
        : theme.text.blue2};
  }

  @media ${device.tablet} {
    margin-bottom: 6px;
    font-size: 16px;
  }
`;

export default GuideLine;
