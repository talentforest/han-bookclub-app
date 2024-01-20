import { challengeState } from 'data/challengeAtom';
import { useRecoilState } from 'recoil';
import { CHALLENGE, thisYear } from 'util/index';
import { AddBox } from './Vote';
import { useEffect, useState } from 'react';
import { FiPlusCircle } from 'react-icons/fi';
import MobileHeader from 'layout/mobile/MobileHeader';
import ChallengeBookBox from 'components/atoms/box/ChallengeBookBox';
import Subtitle from 'components/atoms/Subtitle';
import SearchedBookPostAddModal from 'components/organisms/modal/SearchedBookPostAddModal';
import { getCollection } from 'api/getFbDoc';
import styled from 'styled-components';
import device from 'theme/mediaQueries';

export default function Challenge() {
  const [showChallengeModal, setShowChallengeModal] = useState(false);

  const [challengeBooks, setChallengeBook] = useRecoilState(challengeState);

  useEffect(() => {
    if (!challengeBooks) {
      getCollection(CHALLENGE, setChallengeBook);
    }
  }, []);

  const onToggleClick = () => setShowChallengeModal((prev) => !prev);

  return (
    <>
      <MobileHeader title={`${thisYear}년 개인별 챌린지`} backBtn />

      <main>
        <AddBox>
          <Subtitle title='진행중인 챌린지' />
          <button type='button' onClick={onToggleClick}>
            <FiPlusCircle />
          </button>
        </AddBox>

        <ChallengeBookList>
          {challengeBooks?.map(
            (challenge, index) =>
              challenge && (
                <ChallengeBookBox key={index} challenge={challenge} />
              )
          )}
        </ChallengeBookList>

        {showChallengeModal && (
          <SearchedBookPostAddModal
            title='챌린지 등록하기'
            onToggleClick={onToggleClick}
          />
        )}
      </main>
    </>
  );
}

const ChallengeBookList = styled.ul`
  @media ${device.desktop} {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
  }
`;
