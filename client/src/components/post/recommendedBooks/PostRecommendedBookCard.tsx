import { FiUser } from 'react-icons/fi';

import { useHandleModal } from '@/hooks';

import { SubCollection, UserPost } from '@/types';

import BookAuthorPublisher from '@/components/common/book/BookAuthorPublisher';
import BookThumbnail from '@/components/common/book/BookThumbnail';
import UserImgName from '@/components/common/user/UserImgName';
import RecommendedBookModal from '@/components/post/recommendedBooks/RecommendedBookModal';

interface PostRecommendedBookCardProps {
  post: UserPost;
  collName: SubCollection;
}

export default function PostRecommendedBookCard({
  post,
  collName,
}: PostRecommendedBookCardProps) {
  const { showModal } = useHandleModal();

  const onClick = () =>
    showModal({
      element: (
        <RecommendedBookModal
          recommendedBookDetail={post}
          collName={collName}
        />
      ),
    });

  const {
    recommendedBook: { title, thumbnail, authors, publisher },
    creatorId,
  } = post;

  return (
    <button
      type="button"
      onClick={onClick}
      className="relative mt-7 min-h-[102px] w-full rounded-xl bg-white px-4 py-3 shadow-card"
    >
      <BookThumbnail
        title={title}
        thumbnail={thumbnail}
        className="!absolute bottom-4 w-[70px]"
      />

      <div className="ml-[80px] flex h-full flex-col items-start">
        <div className="flex items-center gap-0.5 text-gray1">
          <FiUser fontSize={14} className="text-gray1" />
          <span className="mr-2 text-sm text-gray1">추천인</span>
          <UserImgName userId={creatorId} isLink={false} />
        </div>

        <div className="mb-1 mt-1.5 flex flex-1 flex-col items-start">
          <h4 className="mb-1 line-clamp-2 text-start text-base font-medium leading-[20px]">
            {title}
          </h4>

          <BookAuthorPublisher authors={authors} publisher={publisher} />
        </div>
      </div>
    </button>
  );
}
