import { getDocument } from 'api/getFbDoc';
import { useEffect, useState } from 'react';
import { CHALLENGE, thisYear } from 'util/index';
import ChallengeBookBox from 'components/atoms/box/ChallengeBookBox';
import styled from 'styled-components';
import device from 'theme/mediaQueries';

export default function ChallengeBookContainer() {
  const [challengeBooks, setChallengeBook] = useState({
    id: '',
    challenge: [],
  });

  useEffect(() => {
    getDocument(CHALLENGE, `${thisYear}`, setChallengeBook);
  }, []);

  return (
    <ChallengeBookList>
      {challengeBooks.challenge.slice(0, 4).map((challenge, index) => (
        <ChallengeBookBox key={index} challenge={challenge} />
      ))}
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
