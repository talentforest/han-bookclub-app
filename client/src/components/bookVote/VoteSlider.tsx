import { useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import { getCollection } from 'api/firebase/getFbDoc';

import { bookVotesState } from 'data/voteAtom';
import { useRecoilState } from 'recoil';

import VoteProgressCard from './VoteProgressCard';
import { BOOK_VOTE } from 'appConstants';
import { SwiperSlide } from 'swiper/react';
import { todayWithHyphen } from 'utils';

import EmptyCard from 'components/common/container/EmptyCard';
import SwiperContainer from 'components/common/container/SwiperContainer';

const VoteSlider = () => {
  const [bookVotes, setBookVotes] = useRecoilState(bookVotesState);

  const progressVotes = bookVotes?.filter(
    vote => vote.deadline >= todayWithHyphen,
  );

  useEffect(() => {
    if (!bookVotes?.length) {
      getCollection(BOOK_VOTE, setBookVotes);
    }
  }, []);

  const navigate = useNavigate();

  const swiperOptions = {
    slidesPerView: 'auto' as const,
    breakpoints: {
      1024: {
        slidesPerView: 3,
      },
      800: {
        slidesPerView: 2,
      },
      500: {
        slidesPerView: 1,
      },
    },
  };

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
