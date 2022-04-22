import { useLocation } from "react-router-dom";
import styled from "styled-components";

interface propsType {
  title: string;
}

const Title = ({ title }: propsType) => {
  const pathname = useLocation().pathname;
  const month = new Date().getMonth() + 1;
  return (
    <H1>
      {pathname === "/" || pathname.includes("profile") ? null : `${month}월`}
      {title}
    </H1>
  );
};

const H1 = styled.h1`
  font-size: 18px;
  font-weight: 700;
`;

export default Title;
