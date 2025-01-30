import { ISentence } from 'data/bookAtom';
import { currentUserState } from 'data/userAtom';
import { useRecoilValue } from 'recoil';

import LikeBtnWithPeopleInfo from '../common/LikeBtnWithPeopleInfo';
import { SENTENCES2024 } from 'appConstants';
import { BiSolidQuoteLeft, BiSolidQuoteRight } from 'react-icons/bi';

import BookThumbnail from 'components/common/book/BookThumbnail';
import EditorContent from 'components/common/editor/EditorContent';
import UserName from 'components/common/user/UserName';
import PostHandleBtns from 'components/post/PostHandleBtns';

interface Props {
  sentence: ISentence;
}

export default function PostSentenceBox({ sentence }: Props) {
  const currentUser = useRecoilValue(currentUserState);

  const { text, thumbnail, title, creatorId, page } = sentence;

  return (
    <div>
      <div>
        <BookThumbnail thumbnail={thumbnail} title={title} />
        <div>
          <h4>{title}</h4>
          {creatorId === currentUser.uid && (
            <PostHandleBtns
              collName={SENTENCES2024}
              postType="공유하고 싶은 문구"
              post={sentence}
            />
          )}
        </div>

        <BiSolidQuoteLeft className="quote-left" />
        <EditorContent text={text} />
        <BiSolidQuoteRight className="quote-right" />
      </div>

      <span>p.{page}</span>

      <div>
        <UserName tag userId={creatorId} />
        <LikeBtnWithPeopleInfo post={sentence} collName={SENTENCES2024} />
      </div>
    </div>
  );
}
