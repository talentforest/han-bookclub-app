import styled from 'styled-components';
import device from 'theme/mediaQueries';

interface PropsType {
  text: string;
}

const Guide = ({ text }: PropsType) => {
  return (
    <Box>
      <p>{text}</p>
    </Box>
  );
};

const Box = styled.div`
  margin-bottom: 10px;
  p {
    font-size: 14px;
    color: ${(props) => props.theme.text.gray};
  }
  svg {
    float: left;
    width: 16px;
    height: 16px;
    margin: 3px 5px 0 0;
    fill: ${(props) => props.theme.text.lightBlue};
  }
  @media ${device.tablet} {
    font-size: 16px;
    svg {
      width: 18px;
      height: 18px;
    }
  }
`;

export default Guide;
