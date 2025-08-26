import { useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import { useRecoilState } from 'recoil';

import { getCollection } from '@/api/firebase/getFbDoc';
import { BOOK_VOTE } from '@/appConstants';
import VoteProgressCard from '@/components/bookVote/VoteProgressCard';
import EmptyCard from '@/components/common/container/EmptyCard';
import SwiperContainer from '@/components/common/container/SwiperContainer';
import { bookVotesState } from '@/data/voteAtom';
import { todayWithHyphen } from '@/utils';
import { SwiperSlide } from 'swiper/react';

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
