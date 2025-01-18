// import { useEffect } from 'react';
// import { getCollection } from 'api/firebase/getFbDoc';
// import { challengeState } from 'data/bookAtom';
// import { useRecoilState } from 'recoil';
// import { CHALLENGE } from 'appConstants';
// import { thisYear } from 'utils';
import Footer from 'layout/Footer';
import MobileHeader from 'layout/mobile/MobileHeader';

import NextMonthBookClub from 'components/bookClub/NextMonthBookClub';
import ThisMonthBookClub from 'components/bookClub/ThisMonthBookClub';
import VoteSlider from 'components/bookVote/VoteSlider';
import AllowNotificationModalBox from 'components/bookshelf/AllowNotificationModalBox';
// import ChallengeBookCard from 'components/challenge/ChallengeBookCard';
import GuideLine from 'components/common/GuideLine';
// import Loading from 'components/common/Loading';
// import ChevronRightLinkBtn from 'components/common/button/ChevronRightLinkBtn';
import Section from 'components/common/container/Section';
import RecommendedBookSwiperContainer from 'components/post/recommendedBooks/RecommendedBookSwiperContainer';

const Home = () => {
  // const [challengeBooks, setChallengeBook] = useRecoilState(challengeState);

  // useEffect(() => {
  //   if (!challengeBooks) {
  //     getCollection(CHALLENGE, setChallengeBook);
  //   }
  // }, []);

  return (
    <>
      <MobileHeader title="독서모임 한페이지" />

      <main>
        <Section title="이달의 한페이지">
          <GuideLine text="매월 1일에 업데이트 됩니다" />
          <ThisMonthBookClub />
          <NextMonthBookClub />
        </Section>

        {/* <Section title={`${thisYear}년 개인별 챌린지`}>
          {!challengeBooks ? (
            <Loading className="h-[40vh]" />
          ) : (
            <ul className="grid grid-cols-2 gap-8">
              {challengeBooks?.length ? (
                challengeBooks
                  ?.slice(0, 4)
                  ?.map(challenge => (
                    <ChallengeBookCard
                      key={challenge.id}
                      challenge={challenge}
                    />
                  ))
              ) : (
                <span>챌린지 책이 아직 없습니다.</span>
              )}
            </ul>
          )}
          <ChevronRightLinkBtn title="챌린지 더보기" to="/challenge" />
        </Section> */}

        <Section title="한페이지 멤버들이 소개했던 책">
          <RecommendedBookSwiperContainer />
        </Section>

        <Section title="투표함">
          <VoteSlider />
        </Section>
      </main>

      <Footer />

      <AllowNotificationModalBox />
    </>
  );
};

export default Home;
