import styled from 'styled-components';

interface Props {
  name: string;
}

export default function Tag({ name }: Props) {
  return <InfoTag>{name}</InfoTag>;
}

const InfoTag = styled.div`
  padding: 8px 14px;
  place-self: start;
  box-shadow: ${(props) => props.theme.boxShadow};
  border-radius: 30px;
  background-color: #ffc5c5;
`;
