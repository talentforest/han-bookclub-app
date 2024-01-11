import styled from 'styled-components';
import device from 'theme/mediaQueries';

interface IAddDocButtonProps {
  onModalClick: () => void;
  title: string;
  description: string;
}

const AddDocButton = ({
  onModalClick,
  title,
  description,
}: IAddDocButtonProps) => {
  return (
    <>
      <Button onClick={onModalClick}>
        <span>{title}</span>
      </Button>
      <Desc>{description}</Desc>
    </>
  );
};

const Button = styled.button`
  display: flex;
  align-items: center;
  margin: 40px auto 0;
  border: none;
  background-color: transparent;
  span {
    color: ${(props) => props.theme.text.accent};
    font-size: 16px;
    font-weight: 700;
  }
  svg {
    fill: ${(props) => props.theme.text.accent};
    width: 22px;
    height: 22px;
    margin-right: 3px;
  }
  @media ${device.tablet} {
    span {
      font-size: 18px;
    }
    svg {
      fill: ${(props) => props.theme.text.accent};
      width: 25px;
      height: 25px;
      margin-right: 5px;
    }
  }
`;

const Desc = styled.p`
  width: fit-content;
  margin: 5px auto 20px;
  font-size: 13px;
  color: ${(props) => props.theme.text.gray};
`;

export default AddDocButton;
