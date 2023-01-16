import { useRecoilValue } from 'recoil';
import { votesState } from 'data/documentsAtom';
import { isoFormatDate, settings, krCurTime } from 'util/index';
import { ChevronRight } from '@mui/icons-material';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styled from 'styled-components';
import VoteBox from 'components/organisms/vote/VoteBox';
import Slider from 'react-slick';
import LinkBtn from 'components/atoms/buttons/LinkBtn';
import device from 'theme/mediaQueries';

const VoteSlider = () => {
  const votes = useRecoilValue(votesState);
  const progressVotes = votes.filter(
    (item) => item.deadline >= isoFormatDate(krCurTime)
  );

  return (
    <>
      {progressVotes.length ? (
        <SliderBox {...settings}>
          {progressVotes?.map((voteDetail) => (
            <VoteBox key={voteDetail.id} voteDetail={voteDetail} />
          ))}
        </SliderBox>
      ) : (
        <EmptySlider>
          <span>진행중인 투표가 없어요.</span>
          <LinkBtn to='/vote'>
            투표 등록하러 가기
            <ChevronRight />
          </LinkBtn>
        </EmptySlider>
      )}
    </>
  );
};

const SliderBox = styled(Slider)`
  .slick-list {
    padding-bottom: 3px;
  }
  .slick-slider {
    margin: 0 -5px;
  }
  .slick-slide {
    padding: 0 5px;
  }
  .slick-dots {
    margin-bottom: 2px;
  }
  @media ${device.tablet} {
    background-color: ${(props) => props.theme.container.default};
    padding: 15px;
    border-radius: 10px;
    border: 1px solid ${(props) => props.theme.text.lightGray};
  }
`;
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
