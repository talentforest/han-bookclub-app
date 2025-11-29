import { BookWithRank } from '@/types';

import Modal from '@/components/common/Modal';
import Tag from '@/components/common/Tag';
import BookAuthorPublisher from '@/components/common/book/BookAuthorPublisher';
import BookThumbnail from '@/components/common/book/BookThumbnail';
import UserImgName from '@/components/common/user/UserImgName';

interface ChallengeRankedBookProps {
  bookWithRank: BookWithRank;
}

export default function ChallengeRankedBook({
  bookWithRank,
}: ChallengeRankedBookProps) {
  const {
    counts,
    readers,
    title,
    thumbnail,
    authors,
    publisher,
    impressionList,
  } = bookWithRank;

  console.log(impressionList);

  // NOTE: 모든 멤버의 글이 안나옴 미치겠다 ㅋㅋ큐ㅠ

  return (
    <Modal title="많이 재독한 책">
      <div className="mb-5 flex items-center gap-2">
        <BookThumbnail
          title={title}
          thumbnail={thumbnail}
          className="float-left w-14"
        />
        <div>
          <h2 className="mb-0.5 line-clamp-1 w-full font-medium">{title}</h2>
          <BookAuthorPublisher authors={authors} publisher={publisher} />
          <div className="mt-2 flex gap-1">
            <Tag
              text={`📚총 ${counts}번 재독중`}
              color="yellow"
              shape="rounded"
              className="!px-3 !py-1 text-sm"
            />
            <Tag
              text={`🙋🏻${readers}명이 재독중`}
              color="lightBlue"
              shape="rounded"
              className="!px-3 !py-1 text-sm"
            />
          </div>
        </div>
      </div>

      <h3 className="font-bold text-blue1">재독한 멤버의 소감들</h3>
      <ul className="mt-2">
        {impressionList?.map(({ text, id, creatorId, createdAt }) => (
          <li key={id} className="mb-3 gap-2 border-l-4 border-gray3 pl-3">
            <p>{text}</p>

            <div className="mt-3 flex justify-between">
              <UserImgName userId={creatorId} />
              <span className="text-gray2">
                {new Date(createdAt).toLocaleDateString()}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </Modal>
  );
}
