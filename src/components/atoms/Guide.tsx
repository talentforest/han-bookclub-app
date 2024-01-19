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
  color: ${({ theme }) => theme.text.gray2};
  line-height: 1.5;
  padding-left: 4px;

  @media ${device.tablet} {
    font-size: 15px;
  }
`;

export default Guide;
