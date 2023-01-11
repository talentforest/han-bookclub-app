import { useRecoilValue } from 'recoil';
import { votesState } from 'data/documentsAtom';
import { isoFormatDate, settings, krCurTime } from 'util/index';
import { ChevronRight } from '@mui/icons-material';
import styled from 'styled-components';
import VoteBox from 'components/organisms/vote/VoteBox';
import Slider from 'react-slick';
import LinkBtn from 'components/atoms/buttons/LinkBtn';

const VoteSlider = () => {
  const votes = useRecoilValue(votesState);
  const progressVotes = votes.filter(
    (item) => item.deadline >= isoFormatDate(krCurTime)
  );

  return progressVotes.length ? (
    <Slider {...settings(progressVotes.length)}>
      {progressVotes?.map((voteDetail) => (
        <VoteBox key={voteDetail.id} voteDetail={voteDetail} />
      ))}
    </Slider>
  ) : (
    <EmptySlider>
      <span>진행중인 투표가 없어요.</span>
      <LinkBtn to='/vote'>
        투표 등록하러 가기
        <ChevronRight />
      </LinkBtn>
    </EmptySlider>
  );
};

const EmptySlider = styled.div`
  width: 100%;
  height: 140px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 25px;
  border-radius: 10px;
  background-color: ${(props) => props.theme.container.default};
  box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.3);
  color: ${(props) => props.theme.text.gray};
  a {
    width: fit-content;
  }
`;

export default VoteSlider;
