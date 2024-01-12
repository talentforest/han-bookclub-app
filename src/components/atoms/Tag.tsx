import styled from 'styled-components';

interface Props {
  name: string;
}

export default function Tag({ name }: Props) {
  return <InfoTag>{name}</InfoTag>;
}

const InfoTag = styled.h1`
  padding: 9px 14px 7px;
  box-shadow: ${(props) => props.theme.boxShadow};
  border-radius: 30px;
  color: #333;
  background-color: #d1e9ff;
  font-size: 15px;
`;
