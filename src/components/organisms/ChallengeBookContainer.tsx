import { getCollection } from 'api/getFbDoc';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { challengeState } from 'data/bookAtom';
import { EmptyBox } from 'routes/BookClubHistory';
import { CHALLENGE } from 'constants/fbRouteName';
import ChallengeBookBox from 'components/molecules/book-box/ChallengeBookBox';
import device from 'theme/mediaQueries';
import styled from 'styled-components';

export default function ChallengeBookContainer() {
  const [challengeBooks, setChallengeBook] = useRecoilState(challengeState);

  useEffect(() => {
    if (!challengeBooks) {
      getCollection(CHALLENGE, setChallengeBook);
    }
  }, []);

  return (
    <ChallengeBookList>
      {!!challengeBooks?.length ? (
        challengeBooks
          ?.slice(0, 4)
          ?.map((challenge, index) => (
            <ChallengeBookBox key={index} challenge={challenge} />
          ))
      ) : (
        <EmptyBox>챌린지 책이 아직 없습니다.</EmptyBox>
      )}
    </ChallengeBookList>
  );
}

const ChallengeBookList = styled.ul`
  @media ${device.tablet} {
    display: grid;
    gap: 0 10px;
    grid-template-columns: repeat(2, 1fr);
  }
`;
