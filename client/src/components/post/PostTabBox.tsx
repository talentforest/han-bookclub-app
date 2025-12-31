import { useEffect, useState } from 'react';

import { useLocation } from 'react-router-dom';

import { SwiperSlide } from 'swiper/react';

import { useRecoilState } from 'recoil';

import { hostReviewState, subjectsState } from '@/data/documentsAtom';

import { getCollection } from '@/api';

import { HOST_REVIEW, SUBJECTS } from '@/appConstants';

import { useAlertAskJoin } from '@/hooks';

import { getFbRouteOfPost } from '@/utils';

import { SubPostTypeValue, UserPost } from '@/types';

import ChevronRightLinkBtn from '@/components/common/button/ChevronRightLinkBtn';
import PlusIconWithTextLink from '@/components/common/button/PlusIconLinkBtn';
import SwiperContainer from '@/components/common/container/SwiperContainer';
import Post from '@/components/post/Post';

interface PostTabBoxProps {
  yearMonthId: string;
}

type TabPostTypeValue = Extract<SubPostTypeValue, '발제문' | '정리 기록'>;

const swiperOptions = {
  spaceBetween: 8,
  pagination: false,
  scrollbar: false,
  navigation: false,
  autoplay: false,
};

export default function PostTabBox({ yearMonthId }: PostTabBoxProps) {
  const [currTab, setCurrTab] = useState<TabPostTypeValue>('발제문');
  const [hostReviewList, setHostReviewList] = useRecoilState(hostReviewState);
  const [subjectList, setSubjectList] = useRecoilState(subjectsState);

  useEffect(() => {
    getCollection(
      getFbRouteOfPost(yearMonthId, HOST_REVIEW),
      setHostReviewList,
    );
    getCollection(getFbRouteOfPost(yearMonthId, SUBJECTS), setSubjectList);
  }, [yearMonthId, subjectList?.length]);

  const { pathname } = useLocation();

  const postsInfo: {
    [key in TabPostTypeValue]: {
      postList: UserPost[];
      linkTo: 'subjects' | 'host-review';
      access: '모두' | '발제자만';
    };
  } = {
    발제문: {
      postList: subjectList,
      linkTo: 'subjects',
      access: '모두',
    },
    '정리 기록': {
      postList: hostReviewList,
      linkTo: 'host-review',
      access: '발제자만',
    },
  };

  const { postList, linkTo, access } = postsInfo[currTab];

  const { blockLinkAndAlertJoinMember } = useAlertAskJoin('see');

  return (
    <div className="w-full">
      <ul className="flex gap-1">
        {(Object.keys(postsInfo) as TabPostTypeValue[]).map(tab => (
          <li key={tab}>
            <button
              onClick={() => setCurrTab(tab)}
              className={`rounded-t-xl px-3 py-2 ${tab === currTab ? 'bg-blue4 font-medium text-blue3' : 'bg-white text-text'}`}
            >
              {tab}
            </button>
          </li>
        ))}
      </ul>

      <div
        className={`flex min-h-48 w-full flex-col items-center justify-center rounded-b-2xl rounded-tr-2xl p-4 shadow-card ${currTab ? 'bg-blue4' : ''}`}
      >
        {postList?.length !== 0 ? (
          <>
            <SwiperContainer options={swiperOptions}>
              {postList?.map((post, index) => (
                <SwiperSlide
                  key={post.id}
                  className={`!mt-0 min-h-fit !py-0 ${postList.length === 1 ? 'w-full' : 'max-w-[70vw]'}`}
                >
                  <div className="mx-auto flex w-full flex-col rounded-xl bg-white p-3">
                    <Post
                      type={currTab}
                      post={post}
                      className="relative [&>p]:line-clamp-[6]"
                    />
                    <span className="absolute right-4 top-3 text-sm text-gray1">
                      {index + 1} / {postList.length}
                    </span>
                    <ChevronRightLinkBtn
                      title="더보기"
                      state={{ postId: post.id }}
                      to={linkTo}
                      onClick={blockLinkAndAlertJoinMember}
                      className="w-fit self-end rounded-xl bg-purple4 px-4 py-3 !text-[15px] text-purple2 shadow-card"
                    />
                  </div>
                </SwiperSlide>
              ))}
            </SwiperContainer>

            <ChevronRightLinkBtn
              title={`전체 ${currTab} 보기`}
              to={linkTo}
              onClick={blockLinkAndAlertJoinMember}
              className="w-fit self-end px-2 !text-[15px] text-blue-500"
            />
          </>
        ) : (
          <>
            {!pathname.includes('previous-club') ? (
              <>
                <PlusIconWithTextLink
                  to={linkTo}
                  name={`${currTab} 추가하러 가기`}
                />
                <span className="text-sm text-gray1">
                  {access} 작성할 수 있어요
                </span>
              </>
            ) : (
              <span className="text-sm text-blue3">
                기록된 {currTab}이 없습니다
              </span>
            )}
          </>
        )}
      </div>
    </div>
  );
}
