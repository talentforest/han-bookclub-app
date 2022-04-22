import styled from "styled-components";

interface propsType {
  title: string;
}

const Subtitle = ({ title }: propsType) => {
  return <Sub>{title}</Sub>;
};

const Sub = styled.h1`
  display: flex;
  align-items: center;
  width: fit-content;
  margin: 30px 15px 5px;
  font-weight: 700;
  cursor: pointer;
`;

export default Subtitle;
