import styled from 'styled-components';
import device from 'theme/mediaQueries';

interface ISubtitleProps {
  title: string;
}

const Subtitle = ({ title }: ISubtitleProps) => {
  return <Sub>{title}</Sub>;
};

const Sub = styled.h3`
  display: flex;
  align-items: center;
  width: fit-content;
  margin-bottom: 5px;
  padding-left: 4px;
  @media ${device.tablet} {
    font-size: 18px;
  }
  @media ${device.desktop} {
    font-size: 18px;
  }
`;

export default Subtitle;
