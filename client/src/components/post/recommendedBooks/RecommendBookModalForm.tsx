import { useState } from 'react';

import useAddDoc from 'hooks/handleFbDoc/useAddDoc';
import useSendPushNotification from 'hooks/useSendPushNotification';

import { recommendBookState } from 'data/bookAtom';
import { thisMonthBookClubState } from 'data/bookClubAtom';
import { currentUserState } from 'data/userAtom';
import { useRecoilValue } from 'recoil';

import { RECOMMENDED_BOOKS } from 'appConstants';
import { getFbRouteOfPost, thisYearMonthId } from 'utils';

import FooterBookCard from 'components/bookCard/FooterBookCard';
import SquareBtn from 'components/common/button/SquareBtn';

interface Props {
  onModalClose: () => void;
}
export default function RecommendBookModalForm({ onModalClose }: Props) {
  const [text, setText] = useState('');
  const userData = useRecoilValue(currentUserState);
  const thisMonthClub = useRecoilValue(thisMonthBookClubState);
  const recommendBook = useRecoilValue(recommendBookState);

  const { sendPostNotification } = useSendPushNotification();

  const { book } = thisMonthClub;

  const { title, thumbnail, authors, url, publisher } = recommendBook;

  const collName = getFbRouteOfPost(thisYearMonthId, RECOMMENDED_BOOKS);

  const docData = {
    text,
    createdAt: Date.now(),
    creatorId: userData.uid,
    title: book.title,
    thumbnail: book.thumbnail,
    recommendedBook: { title, thumbnail, url, authors, publisher },
  };

  const { onAddDocSubmit, onChange } = useAddDoc({
    setText,
    collName,
    docData,
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (title === '') {
      return window.alert('추천하는 책 정보를 찾아서 넣어주세요.');
    }
    onAddDocSubmit(event);
    if (title !== '' && docData.text !== '') {
      sendPostNotification('추천책');
    }
    onModalClose();
  };

  return (
    <form onSubmit={handleSubmit} className="mt-2 sm:mt-0">
      <textarea
        placeholder="추천하고 싶은 이유를 작성해주세요."
        onChange={onChange}
        value={text}
        className="h-32 w-full resize-none rounded-xl border p-3 outline-none"
      />

      <div className="flex items-end justify-between gap-4">
        {thumbnail && <FooterBookCard book={recommendBook} className="h-14" />}
        <SquareBtn
          name="추천하기"
          type="submit"
          className="ml-auto h-fit min-w-max"
        />
      </div>
    </form>
  );
}
