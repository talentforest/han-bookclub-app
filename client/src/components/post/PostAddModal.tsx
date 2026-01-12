import { FormEvent } from 'react';

import { useRecoilValue } from 'recoil';

import { clubByMonthSelector } from '@/data/clubAtom';
import { currAuthUserAtom } from '@/data/userAtom';

import { HOST_REVIEW, SUBJECTS, postNameObj } from '@/appConstants';

import {
  useAddDoc,
  useHandleModal,
  useHandlePenalty,
  useSendPushNotification,
} from '@/hooks';

import { getFbRouteOfPost, thisYearMonthId } from '@/utils';

import { PenaltyType, PostTypeKey, UserPost } from '@/types';

import Modal from '@/components/common/Modal';
import SquareBtn from '@/components/common/button/SquareBtn';
import QuillEditor from '@/components/common/editor/QuillEditor';

type PostType = Extract<PostTypeKey, typeof SUBJECTS | typeof HOST_REVIEW>;

interface PostAddModalProps {
  postType: PostType;
}

const PostAddModal = ({ postType }: PostAddModalProps) => {
  const { data: thisMonthClub } = useRecoilValue(
    clubByMonthSelector(thisYearMonthId),
  );

  const {
    data: { uid },
  } = useRecoilValue(currAuthUserAtom);

  const { sendPostPushNotification, isPending } = useSendPushNotification();

  const { penaltyCheck, updatePenalty } = useHandlePenalty();

  const { docId: yearMonthId, book } = thisMonthClub;

  const postName = postNameObj.subCollection[postType];

  const collName = getFbRouteOfPost(yearMonthId, postType);

  const initialDocData = {
    text: '',
    createdAt: '',
    creatorId: uid,
    clubBook: book,
  };

  const { onAddDocSubmit, newDocData, onDataChange } = useAddDoc<
    Partial<UserPost>
  >({ collName, initialDocData });

  const { hideModal } = useHandleModal();

  const penaltyByTypeObj: {
    [postType in PostType]: PenaltyType;
  } = {
    [SUBJECTS]: 'LATE_SUBJECT',
    [HOST_REVIEW]: 'LATE_HOST_REVIEW',
  };

  const penaltyType = penaltyByTypeObj[postType];

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { text } = newDocData;
    if (text === '') return;

    try {
      const { postId, createdAt } = await onAddDocSubmit(event);

      alert('성공적으로 등록되었습니다.');

      const penalty = penaltyCheck(penaltyType, createdAt);
      if (penalty.isOverdue) {
        updatePenalty({ penaltyType, postId, createdAt });
      }

      await sendPostPushNotification(postName);

      hideModal();
    } catch (error) {
      window.alert('등록 중 오류가 발생했습니다.');
    }
  };

  return (
    <Modal title={`${postName} 작성하기`}>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col overflow-scroll scrollbar-hide"
      >
        <QuillEditor
          placeholder={`${postName}을 작성해주세요`}
          text={newDocData.text}
          setText={text => onDataChange({ text })}
        />
        <SquareBtn
          name="작성 완료"
          type="submit"
          className="ml-auto px-7 !shadow-none max-sm:px-4"
          disabled={isPending}
          color="blue"
        />
      </form>
    </Modal>
  );
};

export default PostAddModal;
