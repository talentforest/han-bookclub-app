import { Link } from "react-router-dom";
import { ReactComponent as ArrowRight } from "assets/chevron_right.svg";
import styled from "styled-components";

interface propsType {
  link: string;
  title: string;
}

const LinkButton = ({ link, title }: propsType) => {
  return (
    <Link to={link}>
      <Button>{title}</Button>
      <ArrowRight width={16} height={18} />
    </Link>
  );
};

const Button = styled.button`
  padding: 5px 0;
  border: none;
  background-color: transparent;
  font-size: 11px;
  color: ${(props) => props.theme.text.lightBlue};
`;

export default LinkButton;
