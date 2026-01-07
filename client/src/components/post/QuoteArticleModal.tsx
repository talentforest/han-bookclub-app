import { SwiperSlide } from 'swiper/react';

import { UserPost } from '@/types';

import FooterBookCard from '@/components/bookCard/FooterBookCard';
import Modal from '@/components/common/Modal';
import SwiperContainer from '@/components/common/container/SwiperContainer';
import PostFooter from '@/components/post/PostFooter';
import QuoteArticle from '@/components/post/QuoteArticle';

interface QuoteArticleModalProps {
  title: string;
  postList: UserPost[];
  yearMonthId: string;
}

const options = {
  autoplay: false,
  breakpoints: {
    1024: {
      slidesPerView: 3,
    },
    800: {
      slidesPerView: 1,
    },
    320: {
      slidesPerView: 1,
    },
  },
  navigation: false,
  spaceBetween: 0,
  scrollbar: false,
};

export default function QuoteArticleModal({
  title,
  postList,
  yearMonthId,
}: QuoteArticleModalProps) {
  return (
    <Modal title={title} className="!p-4">
      {postList.length === 1 ? (
        <Post post={postList[0]} yearMonthId={yearMonthId} />
      ) : (
        <SwiperContainer options={options}>
          {postList.map(post => (
            <SwiperSlide key={post.docId} className="!h-full !py-0">
              <Post post={post} />
            </SwiperSlide>
          ))}
        </SwiperContainer>
      )}
    </Modal>
  );
}

const Post = ({
  post,
  yearMonthId,
}: {
  post: UserPost;
  yearMonthId?: string;
}) => {
  return (
    <div className={`flex flex-col`}>
      {post?.clubBook && (
        <FooterBookCard
          book={post?.recommendedBook || post.clubBook}
          className="mb-1 mt-0 flex-1 pt-0"
          yearMonthId={yearMonthId}
        />
      )}

      <QuoteArticle
        subject={post.text}
        className="!max-h-[50vh] min-h-[40vh] w-full rounded-xl bg-gray-100 px-1.5 py-2.5"
      />

      <PostFooter createdAt={post.createdAt} footerType="like" post={post} />
    </div>
  );
};
