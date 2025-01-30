import { useEffect, useState } from 'react';

import { getCollection } from 'api/firebase/getFbDoc';

import { challengeState } from 'data/bookAtom';
import { useRecoilState } from 'recoil';

import { CHALLENGE } from 'appConstants';
import { FiPlusCircle } from 'react-icons/fi';
import { thisYear } from 'utils';

import MobileHeader from 'layout/mobile/MobileHeader';

import ChallengeBookCard from 'components/challenge/ChallengeBookCard';
import DDay from 'components/common/DDay';
import Subtitle from 'components/common/Subtitle';
import Section from 'components/common/container/Section';
import SearchedBookPostAddModal from 'components/search/SearchedBookPostAddModal';

export default function Challenge() {
  const [showChallengeModal, setShowChallengeModal] = useState(false);
  const [userChallenges, setUserChallenges] = useRecoilState(challengeState);

  useEffect(() => {
    if (!userChallenges) {
      getCollection(CHALLENGE, setUserChallenges);
    }
  }, []);

  const onChallengeModalClick = () => setShowChallengeModal(prev => !prev);

  return (
    <>
      <MobileHeader title={`${thisYear}년 개인별 챌린지`} backBtn />

      <main>
        <Section>
          <DDay
            hyphenDate={`${thisYear}-12-21`}
            className="mx-auto flex size-60 flex-col items-center justify-center rounded-full border bg-pointGreen p-3 text-2xl font-bold shadow-card"
          />

          <div className="mb-3 mt-16 flex items-start">
            <Subtitle title="개인별 챌린지 현황" />
            <button type="button" onClick={onChallengeModalClick}>
              <FiPlusCircle className="m-1 stroke-blue2 text-xl" />
            </button>
          </div>

          {userChallenges?.length !== 0 && (
            <ul className="grid grid-cols-2 gap-x-6 gap-y-12">
              {userChallenges?.map(challenge => (
                <ChallengeBookCard key={challenge.id} challenge={challenge} />
              ))}
            </ul>
          )}
        </Section>

        {showChallengeModal && (
          <SearchedBookPostAddModal
            title="챌린지 등록하기"
            onToggleClick={onChallengeModalClick}
          />
        )}
      </main>
    </>
  );
}
