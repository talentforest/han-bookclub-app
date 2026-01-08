import { FormEvent } from 'react';

import { useRecoilValue } from 'recoil';

import { clubByMonthSelector } from '@/data/clubAtom';
import { currAuthUserAtom } from '@/data/userAtom';

import { HOST_REVIEW, SUBJECTS } from '@/appConstants';

import { useAddDoc, useHandleModal, useSendPushNotification } from '@/hooks';

import { getFbRouteOfPost, thisYearMonthId } from '@/utils';

import { SubPostTypeValue, UserPost } from '@/types';

import Modal from '@/components/common/Modal';
import SquareBtn from '@/components/common/button/SquareBtn';
import QuillEditor from '@/components/common/editor/QuillEditor';

interface PostAddModalProps {
  postType: SubPostTypeValue;
}

const PostAddModal = ({ postType }: PostAddModalProps) => {
  const { data: thisMonthClub } = useRecoilValue(
    clubByMonthSelector(thisYearMonthId),
  );

  const {
    data: { uid },
  } = useRecoilValue(currAuthUserAtom);

  const { sendPostPushNotification, isPending } = useSendPushNotification();

  const { docId: yearMonthId, book } = thisMonthClub;

  const collName =
    postType === '발제문'
      ? getFbRouteOfPost(yearMonthId, SUBJECTS)
      : getFbRouteOfPost(yearMonthId, HOST_REVIEW);

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

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    if (newDocData.text === '') return;

    try {
      await onAddDocSubmit(event);

      onDataChange({ text: '' });

      alert('성공적으로 등록되었습니다.');

      await sendPostPushNotification(postType);

      hideModal();
    } catch (error) {
      window.alert('등록 중 오류가 발생했습니다.');
    }
  };

  return (
    <Modal title={`${postType} 작성하기`}>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col overflow-scroll scrollbar-hide"
      >
        <QuillEditor
          placeholder={`${postType}을 작성해주세요`}
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
