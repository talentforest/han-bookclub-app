import { useEffect, useState } from 'react';

import { useLocation } from 'react-router-dom';

import useAlertAskJoin from 'hooks/useAlertAskJoin';

import { getCollection } from 'api/firebase/getFbDoc';

import { IDocument, hostReviewState, subjectsState } from 'data/documentsAtom';
import { useRecoilState } from 'recoil';

import { HOST_REVIEW, SUBJECTS } from 'appConstants';
import { SwiperSlide } from 'swiper/react';
import { getFbRouteOfPost } from 'utils';

import ChevronRightLinkBtn from 'components/common/button/ChevronRightLinkBtn';
import PlusIconWithTextLink from 'components/common/button/PlusIconLinkBtn';
import SwiperContainer from 'components/common/container/SwiperContainer';
import Post from 'components/post/Post';

interface Props {
  yearMonthId: string;
}

type PostType = '발제문' | '정리 기록';

const swiperOptions = {
  slidesPerView: 'auto' as const,
  pagination: false,
  spaceBetween: 8,
  scrollbar: false,
  navigation: false,
  autoplay: false,
};

export default function PostTabBox({ yearMonthId }: Props) {
  const [currTab, setCurrTab] = useState<PostType>('발제문');
  const [hostReview, setHostReview] = useRecoilState(hostReviewState);
  const [subjectList, setSubjectList] = useRecoilState(subjectsState);

  useEffect(() => {
    getCollection(getFbRouteOfPost(yearMonthId, HOST_REVIEW), setHostReview);
    getCollection(getFbRouteOfPost(yearMonthId, SUBJECTS), setSubjectList);
  }, [subjectList?.length]);

  const { pathname } = useLocation();

  const postsInfo: {
    [key in PostType]: {
      postList: IDocument[];
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
      postList: hostReview,
      linkTo: 'host-review',
      access: '발제자만',
    },
  };

  const { postList, linkTo, access } = postsInfo[currTab];

  const { blockLinkAndAlertJoinMember } = useAlertAskJoin('see');

  return (
    <div className="w-full">
      <ul className="flex gap-1">
        {(Object.keys(postsInfo) as PostType[]).map(tab => (
          <li key={tab}>
            <button
              onClick={() => setCurrTab(tab)}
              className={`rounded-t-lg border border-b-0 px-3 py-2 ${tab === currTab ? 'bg-blue2 font-medium text-blue1' : 'bg-white text-text'}`}
            >
              {tab}
            </button>
          </li>
        ))}
      </ul>

      <div
        className={`flex min-h-48 w-full flex-col items-center justify-center rounded-b-xl rounded-tr-xl p-3 shadow-card ${currTab ? 'bg-blue2' : ''}`}
      >
        {postList?.length !== 0 ? (
          <>
            <SwiperContainer options={swiperOptions}>
              {postList?.map((post, index) => (
                <SwiperSlide
                  key={post.id}
                  className={`min-h-fit ${postList.length === 1 ? 'w-full' : 'max-w-[70vw]'}`}
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
                      state={{
                        id: yearMonthId,
                        postType: currTab,
                        postId: post.id,
                      }}
                      to={linkTo}
                      onClick={blockLinkAndAlertJoinMember}
                      className="w-fit self-end rounded-xl bg-purple3 px-4 py-3 !text-[15px] text-purple1 shadow-card"
                    />
                  </div>
                </SwiperSlide>
              ))}
            </SwiperContainer>
            <ChevronRightLinkBtn
              title={`전체 ${currTab} 보기`}
              state={{ id: yearMonthId, postType: currTab }}
              to={linkTo}
              onClick={blockLinkAndAlertJoinMember}
              className="w-fit self-end px-3 py-1 !text-[15px] text-darkBlue"
            />
          </>
        ) : (
          <>
            {!pathname.includes('history') ? (
              <>
                <PlusIconWithTextLink
                  to={linkTo}
                  state={{ id: yearMonthId, postType: currTab }}
                  name={`${currTab} 추가하러 가기`}
                />
                <span className="text-sm text-gray1">
                  {access} 작성할 수 있어요
                </span>
              </>
            ) : (
              <span className="text-sm text-blue1">
                기록된 {currTab}이 없습니다
              </span>
            )}
          </>
        )}
      </div>
    </div>
  );
}
