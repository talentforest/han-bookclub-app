import { getDocument } from 'api/getFbDoc';
import { useEffect, useState } from 'react';
import { CHALLENGE, thisYear } from 'util/index';
import ChallengeBookBox from 'components/atoms/box/ChallengeBookBox';

export default function ChallengeBookContainer() {
  const [challengeBooks, setChallengeBook] = useState({
    id: '',
    challenge: [],
  });

  useEffect(() => {
    getDocument(CHALLENGE, `${thisYear}`, setChallengeBook);
  }, []);

  return (
    <div>
      {challengeBooks.challenge.map((challenge, index) => (
        <ChallengeBookBox key={index} challenge={challenge} />
      ))}
    </div>
  );
}
