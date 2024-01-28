import { getCollection } from 'api/getFbDoc';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { challengeState } from 'data/bookAtom';
import { EmptyBox } from 'routes/BookClubHistory';
import { CHALLENGE } from 'constants/fbRouteName';
import UserChallengeBox from 'components/molecules/UserChallengeBox';
import device from 'theme/mediaQueries';
import styled from 'styled-components';

export default function ChallengeBookList() {
  const [challengeBooks, setChallengeBook] = useRecoilState(challengeState);

  useEffect(() => {
    if (!challengeBooks) {
      getCollection(CHALLENGE, setChallengeBook);
    }
  }, []);

  return (
    <ChallengeBooks>
      {!!challengeBooks?.length ? (
        challengeBooks
          ?.slice(0, 4)
          ?.map((challenge, index) => (
            <UserChallengeBox key={index} challenge={challenge} />
          ))
      ) : (
        <EmptyBox>챌린지 책이 아직 없습니다.</EmptyBox>
      )}
    </ChallengeBooks>
  );
}

const ChallengeBooks = styled.ul`
  @media ${device.tablet} {
    display: grid;
    gap: 0 10px;
    grid-template-columns: repeat(2, 1fr);
  }
`;
