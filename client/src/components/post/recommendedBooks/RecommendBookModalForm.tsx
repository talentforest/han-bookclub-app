import { useRecoilValue } from 'recoil';

import { recommendedBookAtom } from '@/data/bookAtom';
import { clubByMonthSelector } from '@/data/clubAtom';
import { currAuthUserAtom } from '@/data/userAtom';

import { RECOMMENDED_BOOKS } from '@/appConstants';

import { useAddDoc, useHandleModal, useSendPushNotification } from '@/hooks';

import { getFbRouteOfPost, thisYearMonthId } from '@/utils';

import { UserPost } from '@/types';

import FooterBookCard from '@/components/bookCard/FooterBookCard';
import SquareBtn from '@/components/common/button/SquareBtn';

export default function RecommendBookModalForm() {
  const {
    data: { book },
  } = useRecoilValue(clubByMonthSelector(thisYearMonthId));

  const recommendedBook = useRecoilValue(recommendedBookAtom);

  const { uid } = useRecoilValue(currAuthUserAtom);

  const { sendPostPushNotification, isPending } = useSendPushNotification();

  const collName = getFbRouteOfPost(thisYearMonthId, RECOMMENDED_BOOKS);

  const initialDocData: UserPost = {
    text: '',
    createdAt: '',
    creatorId: uid,
    clubBook: book || null,
    recommendedBook,
  };

  const { onAddDocSubmit, onDataChange, newDocData } = useAddDoc<
    Partial<UserPost>
  >({ collName, initialDocData });

  const { hideModal } = useHandleModal();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (recommendedBook.title === '') {
      return window.alert('추천하는 책 정보를 찾아서 넣어주세요.');
    }
    if (newDocData.text === '') {
      return window.alert('추천 이유를 작성해주세요.');
    }
    try {
      await onAddDocSubmit(event);
      onDataChange({ text: '' });
      await sendPostPushNotification('추천책');
    } catch (error) {
      window.alert('추천책 등록 중 문제가 발생했습니다. 다시 시도해주세요.');
    } finally {
      hideModal();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        placeholder="추천하고 싶은 이유를 작성해주세요."
        onChange={e => onDataChange({ text: e.target.value })}
        value={newDocData.text}
        className="h-32 w-full resize-none rounded-xl border border-gray2 p-3 outline-none"
      />

      <div className="mt-3 flex items-end justify-between gap-3">
        {recommendedBook.thumbnail && (
          <FooterBookCard book={recommendedBook} className="h-14" />
        )}
        <SquareBtn
          name="추천하기"
          type="submit"
          className="ml-auto h-fit min-w-max"
          disabled={isPending}
        />
      </div>
    </form>
  );
}
