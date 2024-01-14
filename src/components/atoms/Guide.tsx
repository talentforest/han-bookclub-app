import styled from 'styled-components';
import device from 'theme/mediaQueries';

interface PropsType {
  text: string;
}

const Guide = ({ text }: PropsType) => {
  return <GuidePar>{text}</GuidePar>;
};

const GuidePar = styled.p`
  margin: 3px 0 8px 0;
  font-size: 14px;
  color: ${(props) => props.theme.text.mediumGray};

  @media ${device.tablet} {
    font-size: 16px;
  }
`;

export default Guide;
