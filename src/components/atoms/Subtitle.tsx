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
  margin-bottom: 8px;
  padding-left: 4px;
  font-size: 17px;
  font-weight: 500;
  color: ${({ theme }) => theme.text.gray4};
  @media ${device.tablet} {
    font-size: 18px;
  }
  @media ${device.desktop} {
    font-size: 18px;
  }
`;

export default Subtitle;
