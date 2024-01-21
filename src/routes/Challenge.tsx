import { challengeState } from 'data/challengeAtom';
import { useRecoilState } from 'recoil';
import { CHALLENGE, getDDay, thisYear } from 'util/index';
import { useEffect, useState } from 'react';
import { FiPlusCircle } from 'react-icons/fi';
import { getCollection } from 'api/getFbDoc';
import MobileHeader from 'layout/mobile/MobileHeader';
import ChallengeBookBox from 'components/atoms/box/ChallengeBookBox';
import Subtitle from 'components/atoms/Subtitle';
import SearchedBookPostAddModal from 'components/organisms/modal/SearchedBookPostAddModal';
import styled from 'styled-components';
import device from 'theme/mediaQueries';
import Tag from 'components/atoms/Tag';

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
          <div>
            <Subtitle title='진행중인 챌린지' />
            <button type='button' onClick={onToggleClick}>
              <FiPlusCircle />
            </button>
          </div>
          <Tag
            color='green'
            name={`디데이: +${getDDay('2024-12-31')} (2024.12.31)`}
          />
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

const AddBox = styled.div`
  margin-bottom: 30px;

  > div {
    display: flex;
    align-items: center;
    svg {
      font-size: 20px;
      stroke: ${({ theme }) => theme.text.blue2};
      margin: 0 8px 5px 8px;
    }
  }
  span {
    color: ${({ theme }) => theme.text.gray3};
    .dday {
      color: ${({ theme }) => theme.text.blue2};
    }
  }
  h4 {
    font-size: 15px;
  }
  @media ${device.tablet} {
    margin-bottom: 0px;
    display: flex;
    justify-content: space-between;
    h4 {
      font-size: 16px;
    }
  }
`;

const ChallengeBookList = styled.ul`
  @media ${device.desktop} {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
  }
`;
