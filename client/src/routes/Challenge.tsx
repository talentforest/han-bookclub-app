import styled from 'styled-components';
import device from 'theme/mediaQueries';

import { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';

import { CHALLENGE, SENTENCES2024 } from 'constants/index';

import { thisYear } from 'util/index';

import { getCollection } from 'api/getFbDoc';

import { challengeState, sentencesState } from 'data/bookAtom';
import { useRecoilState } from 'recoil';

import { EmptyBox } from './BookClubHistory';
import { FiChevronRight, FiPlusCircle } from 'react-icons/fi';
import { SwiperSlide } from 'swiper/react';

import MobileHeader from 'layout/mobile/MobileHeader';

import DDay from 'components/atoms/DDay';
import GuideLine from 'components/atoms/GuideLine';
import Subtitle from 'components/atoms/Subtitle';
import Tag from 'components/atoms/Tag';
import Section from 'components/atoms/container/Section';
import SwiperContainer from 'components/molecules/SwiperContainer';
import SentenceSlideBox from 'components/organisms/SentenceSlideBox';
import UserChallengeBox from 'components/organisms/UserChallengeBox';
import SearchedBookPostAddModal from 'components/organisms/modal/SearchedBookPostAddModal';

const swiperOptions = {
  slidesPerView: 'auto' as 'auto',
  breakpoints: {
    900: {
      slidesPerView: 3,
    },
    520: {
      slidesPerView: 2,
    },
    320: {
      slidesPerView: 1,
    },
  },
};

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

  const onChallengeModalClick = () => setShowChallengeModal(prev => !prev);

  return (
    <>
      <MobileHeader title={`${thisYear}년 개인별 챌린지`} backBtn />

      <main>
        <Section title="공유하고 싶은 문구들">
          <GuideLine text="아래 개인별 챌린지 박스에서 추가할 수 있어요" />

          <SentenceListBox>
            {sentences?.length !== 0 ? (
              <SwiperContainer options={swiperOptions}>
                {sentences?.slice(0, 4).map(sentence => (
                  <SwiperSlide key={sentence.id}>
                    <SentenceSlideBox
                      key={sentence.createdAt}
                      sentence={sentence}
                    />
                  </SwiperSlide>
                ))}
              </SwiperContainer>
            ) : (
              <EmptyBox>아직 공유한 문구가 없습니다.</EmptyBox>
            )}
          </SentenceListBox>

          <SentenceLink to="/sentence">
            <span>문구 더보기</span>
            <FiChevronRight />
          </SentenceLink>
        </Section>

        <Section>
          <AddBtnBox>
            <Subtitle title="개인별 챌린지 현황" />
            <button type="button" onClick={onChallengeModalClick}>
              <FiPlusCircle />
            </button>
          </AddBtnBox>

          <Tag color="purple">
            <DDay hyphenDate={`${thisYear}-12-31`} />
          </Tag>

          <ChallengeList>
            {userChallenges?.length !== 0 &&
              userChallenges?.map(challenge => (
                <UserChallengeBox key={challenge.id} challenge={challenge} />
              ))}
          </ChallengeList>
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

const AddBtnBox = styled.div`
  display: flex;
  align-items: flex-start;
  svg {
    font-size: 20px;
    stroke: ${({ theme }) => theme.text.blue2};
    margin: 3px 0 8px 4px;
  }
`;

const SentenceListBox = styled.div`
  margin-top: 10px;
`;

const ChallengeList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 20px;
  @media ${device.tablet} {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 25px 20px;
  }
`;

const SentenceLink = styled(Link)`
  display: flex;
  align-items: center;
  align-self: flex-end;
  margin-top: 10px;
  span {
    color: ${({ theme }) => theme.container.blue3};
    margin-top: 3px;
    font-size: 14px;
  }
  svg {
    stroke: ${({ theme }) => theme.container.blue3};
  }
`;
