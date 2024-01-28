import { challengeState } from 'data/bookAtom';
import { useRecoilState } from 'recoil';
import { getDDay, thisYear } from 'util/index';
import { useEffect, useState } from 'react';
import { FiPlusCircle } from 'react-icons/fi';
import { getCollection } from 'api/getFbDoc';
import { CHALLENGE } from 'constants/index';
import MobileHeader from 'layout/mobile/MobileHeader';
import UserChallengeBox from 'components/molecules/UserChallengeBox';
import Subtitle from 'components/atoms/Subtitle';
import SearchedBookPostAddModal from 'components/organisms/modal/SearchedBookPostAddModal';
import styled from 'styled-components';
import device from 'theme/mediaQueries';

export default function Challenge() {
  const [showChallengeModal, setShowChallengeModal] = useState(false);
  const [userChallenges, setUserChallenges] = useRecoilState(challengeState);

  useEffect(() => {
    if (!userChallenges) {
      getCollection(CHALLENGE, setUserChallenges);
    }
  }, []);

  const onToggleClick = () => setShowChallengeModal((prev) => !prev);

  return (
    <>
      <MobileHeader title={`${thisYear}년 개인별 챌린지`} backBtn />

      <main>
        <AddBox>
          <div>
            <Subtitle title='진행중인 챌린지' />
            <button type='button' onClick={onToggleClick}>
              <FiPlusCircle />
            </button>
          </div>
          <DDay>
            <span>
              디데이: <span className='dday'>{getDDay('2024-12-31')}</span>
            </span>
            <span className='date'>(2024년 12월 31일)</span>
          </DDay>
        </AddBox>

        <UserChallengeList>
          {userChallenges?.map(
            (challenge) =>
              challenge && (
                <UserChallengeBox key={challenge.id} challenge={challenge} />
              )
          )}
        </UserChallengeList>

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

const AddBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: space-between;
  margin-bottom: 30px;
  > div:first-child {
    display: flex;
    align-items: center;
    h3 {
      margin-bottom: 0;
    }
    svg {
      font-size: 20px;
      stroke: ${({ theme }) => theme.text.blue2};
      margin: 2px 0 0 8px;
    }
  }
  span {
    margin-bottom: 2px;
    color: ${({ theme }) => theme.text.gray3};
    .dday {
      color: ${({ theme }) => theme.text.purple};
    }
  }

  @media ${device.tablet} {
    display: flex;
    justify-content: space-between;
    h4 {
      font-size: 16px;
    }
  }
`;

const DDay = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  margin: 6px 0 0 4px;
  .date {
    font-size: 13px;
    margin-top: 2px;
  }
`;

const UserChallengeList = styled.ul`
  @media ${device.tablet} {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 18px;
  }
`;
