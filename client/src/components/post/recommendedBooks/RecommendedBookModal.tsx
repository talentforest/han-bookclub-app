import { Collection, SubCollection, UserPost } from '@/types';

import FooterBookCard from '@/components/bookCard/FooterBookCard';
import Modal from '@/components/common/Modal';
import BookAuthorPublisher from '@/components/common/book/BookAuthorPublisher';
import BookThumbnail from '@/components/common/book/BookThumbnail';
import UserImgName from '@/components/common/user/UserImgName';
import PostFooter from '@/components/post/PostFooter';
import PostHeader from '@/components/post/PostHeader';

interface RecommendedBookModalProps {
  collName: Collection | SubCollection;
  recommendedBookDetail: UserPost;
}

export default function RecommendedBookModal({
  collName,
  recommendedBookDetail,
}: RecommendedBookModalProps) {
  const {
    creatorId,
    createdAt,
    text,
    clubBook,
    recommendedBook: { url, authors, publisher, title, thumbnail },
  } = recommendedBookDetail;

  return (
    <Modal title="추천책 보기" className="w-[40%]">
      <PostHeader
        collName={collName}
        post={recommendedBookDetail}
        postType="추천책"
      />

      <div className="my-4 gap-2 overflow-scroll scrollbar-hide">
        <BookThumbnail
          title={title}
          thumbnail={thumbnail}
          url={url}
          className="float-left mb-2 mr-4 w-20"
        />

        <h4 className="text-lg">
          <span className="pr-1">{title}</span>
        </h4>

        <BookAuthorPublisher authors={authors} publisher={publisher} />

        <h3 className="mt-1 flex items-center border-t-2 border-dotted border-gray3 pt-2">
          <UserImgName userId={creatorId} isLink={false} />의 추천 이유
        </h3>
        <p
          dangerouslySetInnerHTML={{ __html: text }}
          className="mt-2 whitespace-pre-wrap break-all"
        />
        <h3 className="mt-10 text-sm text-gray1">추천책이 나왔던 모임책</h3>
        {recommendedBookDetail.recommendedBook && (
          <FooterBookCard
            book={
              clubBook || {
                title: recommendedBookDetail.title,
                thumbnail: recommendedBookDetail.thumbnail,
              }
            }
            className="mb-10 h-14"
          />
        )}
        <PostFooter
          collName={collName}
          createdAt={createdAt}
          post={recommendedBookDetail}
          footerType="likes"
        />
      </div>
    </Modal>
  );
}
