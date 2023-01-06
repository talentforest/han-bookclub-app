import { AccessTime, FmdGood } from '@mui/icons-material';
import styled from 'styled-components';
import device from 'theme/mediaQueries';

interface IInfoTagProps {
  tagName: string;
}

const InfoTag = ({ tagName }: IInfoTagProps) => {
  return (
    <Tag>
      <span>{tagName}</span>
      {tagName === '모임 시간' && <AccessTime />}
      {tagName === '모임 장소' && <FmdGood />}
    </Tag>
  );
};

const Tag = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2px;
  width: fit-content;
  padding: 4px 8px;
  border: 1px solid ${(props) => props.theme.container.blue};
  background-color: ${(props) => props.theme.container.lightBlue};
  border-radius: 20px;
  font-size: 13px;
  font-weight: 700;
  > svg {
    padding-top: 1px;
    fill: ${(props) => props.theme.text.lightBlue};
    width: 16px;
    height: 16px;
  }
  @media ${device.tablet} {
    font-size: 14px;
    padding: 5px 8px;
    margin-bottom: 5px;
  }
`;

export default InfoTag;
