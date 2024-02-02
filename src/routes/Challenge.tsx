import { challengeState, sentencesState } from 'data/bookAtom';
import { useRecoilState } from 'recoil';
import { thisYear } from 'util/index';
import { useEffect, useState } from 'react';
import { FiPlusCircle } from 'react-icons/fi';
import { getCollection } from 'api/getFbDoc';
import { CHALLENGE, SENTENCES2024 } from 'constants/index';
import { Section } from './Home';
import { EmptyBox } from './BookClubHistory';
import MobileHeader from 'layout/mobile/MobileHeader';
import UserChallengeBox from 'components/organisms/UserChallengeBox';
import Subtitle from 'components/atoms/Subtitle';
import SearchedBookPostAddModal from 'components/organisms/modal/SearchedBookPostAddModal';
import BookSentenceBox from 'components/organisms/PostSentenceBox';
import styled from 'styled-components';
import device from 'theme/mediaQueries';
import GuideLine from 'components/atoms/GuideLine';
import DDay from 'components/atoms/DDay';
import Tag from 'components/atoms/Tag';

export default function Challenge() {
  const [showChallengeModal, setShowChallengeModal] = useState(false);
  const [userChallenges, setUserChallenges] = useRecoilState(challengeState);
  const [sentences, setSentences] = useRecoilState(sentencesState);

  useEffect(() => {
    if (!userChallenges) {
      getCollection(CHALLENGE, setUserChallenges);
    }
    getCollection(SENTENCES2024, setSentences);
  }, []);

  const onChallengeModalClick = () => setShowChallengeModal((prev) => !prev);

  return (
    <>
      <MobileHeader title={`${thisYear}년 개인별 챌린지`} backBtn />

      <main>
        <Section>
          <Subtitle title='공유하고 싶은 문구들' />

          <SentenceList>
            {sentences?.length !== 0 ? (
              sentences?.map((sentence) => (
                <BookSentenceBox key={sentence.createdAt} sentence={sentence} />
              ))
            ) : (
              <EmptyBox>아직 공유한 문구가 없습니다.</EmptyBox>
            )}
          </SentenceList>

          <GuideLine text='아래 개인별 챌린지 박스에서 추가할 수 있어요' />
        </Section>

        <Section>
          <AddBtnBox>
            <Subtitle title='개인별 챌린지 현황' />
            <button type='button' onClick={onChallengeModalClick}>
              <FiPlusCircle />
            </button>
          </AddBtnBox>

          <Tag color='blue'>
            <DDay hyphenDate={'2024-12-31'} />
          </Tag>

          <ChallengeList>
            {userChallenges?.length !== 0 &&
              userChallenges?.map((challenge) => (
                <UserChallengeBox key={challenge.id} challenge={challenge} />
              ))}
          </ChallengeList>
        </Section>

        {showChallengeModal && (
          <SearchedBookPostAddModal
            title='챌린지 등록하기'
            onToggleClick={onChallengeModalClick}
          />
        )}
      </main>
    </>
  );
}

const AddBtnBox = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  svg {
    font-size: 20px;
    stroke: ${({ theme }) => theme.text.blue2};
    margin: 3px 0 8px 4px;
  }
  > div {
    flex: 1;
    align-items: flex-end;
  }
`;

const SentenceList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 10px;
  @media ${device.tablet} {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 18px;
  }
`;

const ChallengeList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-top: 15px;
  @media ${device.tablet} {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 18px;
  }
`;
