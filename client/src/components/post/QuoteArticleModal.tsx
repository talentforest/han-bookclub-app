import { SwiperSlide } from 'swiper/react';

import { UserPost } from '@/types';

import FooterBookCard from '@/components/bookCard/FooterBookCard';
import Modal from '@/components/common/Modal';
import Tag from '@/components/common/Tag';
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
  pagination: false,
  spaceBetween: 0,
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
          {postList.map((post, index) => (
            <SwiperSlide key={post.docId} className="!h-full !pb-6 !pt-0">
              <Post post={post} index={`${index + 1} / ${postList.length}`} />
            </SwiperSlide>
          ))}
        </SwiperContainer>
      )}
    </Modal>
  );
}

const Post = ({
  post,
  index,
  yearMonthId,
}: {
  post: UserPost;
  index?: string;
  yearMonthId?: string;
}) => {
  return (
    <div className={`flex flex-col`}>
      <div className="mb-2 items-start justify-between gap-x-2">
        {post?.clubBook && (
          <FooterBookCard
            book={post?.recommendedBook || post.clubBook}
            className="flex-1"
            yearMonthId={yearMonthId}
          />
        )}

        <div className="flex items-center justify-between gap-x-0.5">
          {index && (
            <Tag
              text={index}
              color="yellow"
              className="!px-2 !py-1 font-medium"
            />
          )}
        </div>
      </div>

      <QuoteArticle
        subject={post.text}
        className="!max-h-[50vh] w-full rounded-xl bg-gray-100 p-1.5"
      />

      <PostFooter createdAt={post.createdAt} footerType="like" post={post} />
    </div>
  );
};
