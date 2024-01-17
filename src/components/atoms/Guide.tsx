import styled from 'styled-components';
import device from 'theme/mediaQueries';

interface PropsType {
  text: string;
}

const Guide = ({ text }: PropsType) => {
  return <GuidePar>{text}</GuidePar>;
};

const GuidePar = styled.p`
  font-size: 13px;
  color: ${(props) => props.theme.text.mediumGray};
  line-height: 1.5;

  @media ${device.tablet} {
    font-size: 15px;
  }
`;

export default Guide;
