import { useNavigate } from 'react-router-dom';

import { SwiperSlide } from 'swiper/react';

import { useRecoilValue } from 'recoil';

import { bookVotesSelector } from '@/data/voteAtom';

import VoteProgressCard from '@/components/bookVote/VoteProgressCard';
import EmptyCard from '@/components/common/container/EmptyCard';
import SwiperContainer from '@/components/common/container/SwiperContainer';

const swiperOptions = {
  breakpoints: {
    1024: {
      slidesPerView: 3,
    },
    800: {
      slidesPerView: 2,
    },
    320: {
      slidesPerView: 1,
    },
  },
};

const VoteSlider = () => {
  const progressVotes = useRecoilValue(bookVotesSelector('progress'));

  const navigate = useNavigate();

  return (
    <>
      {progressVotes?.length ? (
        <SwiperContainer options={swiperOptions}>
          {progressVotes?.map(voteDetail => (
            <SwiperSlide key={voteDetail.id}>
              <VoteProgressCard voteDetail={voteDetail} />
            </SwiperSlide>
          ))}
        </SwiperContainer>
      ) : (
        <EmptyCard
          text="진행중인 투표가 없어요."
          onCreateClick={() => navigate('/vote')}
          createBtnTitle="투표 생성하러 가기"
        />
      )}
    </>
  );
};

export default VoteSlider;
