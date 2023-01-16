import {
  ArrowForwardIosOutlined,
  CheckCircleOutline,
  Help,
  MoreHoriz,
} from '@mui/icons-material';
import { getDDay, cutLetter } from 'util/index';
import { Link } from 'react-router-dom';
import { IVote } from 'data/voteItemAtom';
import device from 'theme/mediaQueries';
import styled from 'styled-components';

interface PropsType {
  voteDetail: IVote;
}

const VoteBox = ({ voteDetail }: PropsType) => {
  const {
    vote: { title, voteItem },
    deadline,
    voteId,
  } = voteDetail;
  return (
    <Vote>
      <Title>
        <Help /> {cutLetter(title, 30)}
      </Title>
      <ItemList>
        {voteItem?.slice(0, 2).map((item) => (
          <Item key={item.id}>
            <CheckCircleOutline />
            <span>{cutLetter(item.item, 15)}</span>
          </Item>
        ))}
        {voteItem.length > 2 && <More />}
      </ItemList>
      <Bottom>
        <p>D-Day: {getDDay(deadline)}</p>
        <Link to={`/vote/${voteId}`} state={{ voteDetail }}>
          투표하러 가기
          <ArrowForwardIosOutlined />
        </Link>
      </Bottom>
    </Vote>
  );
};

const Vote = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 230px;
  width: 100%;
  border-radius: 10px;
  padding: 15px 20px;
  background-color: ${(props) => props.theme.container.default};
  box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.3);
  @media ${device.tablet} {
    min-height: 240px;
  }
`;
const Title = styled.h4`
  font-size: 16px;
  font-weight: 700;
  padding-bottom: 10px;
  margin-bottom: 10px;
  svg {
    float: left;
    margin: 2px 5px 0 0;
    width: 20px;
    height: 20px;
  }
`;
const ItemList = styled.ul`
  display: flex;
  flex-direction: column;
  height: 100%;
  margin-bottom: 10px;
`;
const Item = styled.li`
  display: flex;
  align-items: center;
  margin-bottom: 5px;
  padding: 3px 10px;
  min-height: 40px;
  font-size: 14px;
  border: 1px solid ${(props) => props.theme.container.blue};
  border-radius: 10px;
  background-color: ${(props) => props.theme.container.lightBlue};
  > svg {
    width: 20px;
    height: 20px;
    margin-right: 8px;
    fill: ${(props) => props.theme.container.blue};
  }
  @media ${device.tablet} {
    font-size: 16px;
    min-height: 45px;
  }
`;
const More = styled(MoreHoriz)`
  align-self: center;
`;
const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  font-size: 14px;
  margin-top: 10px;
  > p {
    color: ${(props) => props.theme.text.accent};
  }
  > a {
    display: flex;
    align-items: center;
    color: ${(props) => props.theme.text.accent};
    svg {
      width: 14px;
      height: 14px;
      fill: ${(props) => props.theme.text.accent};
    }
  }
  @media ${device.tablet} {
    > p {
      font-size: 14px;
    }
    > a {
      font-size: 14px;
    }
  }
`;

export default VoteBox;
