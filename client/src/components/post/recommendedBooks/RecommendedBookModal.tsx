import { IDocument } from 'data/documentsAtom';

import { FiExternalLink } from 'react-icons/fi';
import { formatDate } from 'utils';

// import FooterBookCard from 'components/bookCard/FooterBookCard';
import Modal from 'components/common/Modal';
import BookAuthorPublisher from 'components/common/book/BookAuthorPublisher';
import BookThumbnail from 'components/common/book/BookThumbnail';
import UserName from 'components/common/user/UserName';
import PostHeader from 'components/post/PostHeader';

interface RecommendedBookModalProps {
  collName: string;
  onToggleClick: () => void;
  recommendedBookDetail: IDocument;
}

export default function RecommendedBookModal({
  collName,
  onToggleClick,
  recommendedBookDetail,
}: RecommendedBookModalProps) {
  const {
    creatorId,
    createdAt,
    text,
    recommendedBook: {
      url,
      authors,
      publisher,
      title: recommendedBookTitle,
      thumbnail: recommendedBookThumbnail,
    },
  } = recommendedBookDetail;

  return (
    <Modal title="추천책 보기" onToggleClick={onToggleClick}>
      <PostHeader
        collName={collName}
        post={recommendedBookDetail}
        postType="추천책"
      />

      <div className="my-4 gap-2 [&>img]:float-left [&>img]:mb-2 [&>img]:mr-4 [&>img]:h-36">
        <BookThumbnail
          title={recommendedBookTitle}
          thumbnail={recommendedBookThumbnail}
        />
        <a
          href={url}
          target="_blank"
          rel="noreferrer"
          className="mb-1 flex items-center gap-1"
        >
          <span className="font-medium">{recommendedBookTitle}</span>
          <FiExternalLink className="stroke-blue1" fontSize={16} />
        </a>
        <BookAuthorPublisher authors={authors} publisher={publisher} />

        <h3 className="mt-2 flex items-center border-t-2 border-dotted pt-2">
          <UserName userId={creatorId} />의 추천 이유
        </h3>
        <p dangerouslySetInnerHTML={{ __html: text }} className="mt-2" />
        <span className="ml-auto mt-4 block w-full text-end text-sm text-gray1">
          {formatDate(createdAt)}
        </span>
      </div>

      {/* <h3 className="text-sm">추천책이 나왔던 모임책</h3>
      {recommendedBookDetail.recommendedBook && (
        // NOTE: 모임책 데이터로 변경
        <FooterBookCard
          book={recommendedBookDetail.recommendedBook}
          className="h-14"
        />
      )} */}
    </Modal>
  );
}
