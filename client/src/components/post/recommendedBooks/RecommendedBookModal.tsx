import { IDocument } from 'data/documentsAtom';

import { formatDate } from 'utils';

import FooterBookCard from 'components/bookCard/FooterBookCard';
import ExternalLinkBtn from 'components/common/ExternalLinkBtn';
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
    title,
    thumbnail,
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

      <div className="my-4 gap-2 overflow-scroll scrollbar-hide [&>img]:float-left [&>img]:mb-2 [&>img]:mr-4 [&>img]:h-36">
        <BookThumbnail
          title={recommendedBookTitle}
          thumbnail={recommendedBookThumbnail}
        />

        <h4 className="text-lg">
          <span className="pr-1">{recommendedBookTitle}</span>
          {url && <ExternalLinkBtn url={url} />}
        </h4>

        <BookAuthorPublisher authors={authors} publisher={publisher} />

        <h3 className="mt-1 flex items-center border-t-2 border-dotted border-gray3 pt-2">
          <UserName userId={creatorId} />의 추천 이유
        </h3>
        <p
          dangerouslySetInnerHTML={{ __html: text }}
          className="mt-2 whitespace-pre-wrap break-all"
        />
        <span className="ml-auto mt-4 block w-full text-end text-sm text-gray1">
          {formatDate(createdAt)}
        </span>

        <h3 className="text-sm text-gray1">추천책이 나왔던 모임책</h3>
        {recommendedBookDetail.recommendedBook && (
          <FooterBookCard book={{ title, thumbnail }} className="h-14" />
        )}
      </div>
    </Modal>
  );
}
