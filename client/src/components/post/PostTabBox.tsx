import { useEffect, useState } from 'react';

import { useLocation } from 'react-router-dom';

import useAlertAskJoin from 'hooks/useAlertAskJoin';

import { getCollection } from 'api/firebase/getFbDoc';

import { hostReviewState, subjectsState } from 'data/documentsAtom';
import { useRecoilState } from 'recoil';

import { HOST_REVIEW, SUBJECTS } from 'appConstants';
import { getFbRouteOfPost } from 'utils';

import ChevronRightLinkBtn from 'components/common/button/ChevronRightLinkBtn';
import PlusIconWithTextLink from 'components/common/button/PlusIconLinkBtn';
import Post from 'components/post/Post';

interface Props {
  yearMonthId: string;
}

type PostType = '발제문' | '정리 기록';

export default function PostTabBox({ yearMonthId }: Props) {
  const [currTab, setCurrTab] = useState<PostType>('발제문');

  const [hostReview, setHostReview] = useRecoilState(hostReviewState);

  const [subjectList, setSubjectList] = useRecoilState(subjectsState);

  useEffect(() => {
    getCollection(getFbRouteOfPost(yearMonthId, HOST_REVIEW), setHostReview);
    getCollection(getFbRouteOfPost(yearMonthId, SUBJECTS), setSubjectList);
  }, [subjectList?.length]);

  const { pathname } = useLocation();

  const post: { [key in PostType]: any } = {
    발제문: {
      post: subjectList?.[0],
      linkTo: 'subjects',
      access: '모두',
    },
    '정리 기록': {
      post: hostReview?.[0],
      linkTo: 'host-review',
      access: '발제자만',
    },
  };

  const { blockLinkAndAlertJoinMember } = useAlertAskJoin('see');

  return (
    <div className="w-full">
      <ul className="flex gap-1">
        {(Object.keys(post) as PostType[]).map(tab => (
          <li key={tab}>
            <button
              onClick={() => setCurrTab(tab)}
              className={`rounded-t-lg border border-b-0 px-3 py-2 ${tab === currTab ? 'bg-blue3 font-medium text-blue1' : 'bg-white text-text'}`}
            >
              {tab}
            </button>
          </li>
        ))}
      </ul>

      <div
        className={`flex min-h-48 flex-col items-center justify-center rounded-b-xl rounded-tr-xl border p-5 shadow-card ${currTab ? 'bg-blue3' : ''}`}
      >
        {post[currTab].post ? (
          <>
            <Post
              type={currTab}
              post={post[currTab].post}
              className="[&>p]:line-clamp-[8]"
            />
            <ChevronRightLinkBtn
              title="더보기"
              state={{ id: yearMonthId, postType: currTab }}
              to={post[currTab].linkTo}
              onClick={blockLinkAndAlertJoinMember}
              className="self-end rounded-xl border bg-green3 px-4 py-3 text-text"
            />
          </>
        ) : (
          <>
            {!pathname.includes('history') ? (
              <>
                <PlusIconWithTextLink
                  to={post[currTab].linkTo}
                  state={{ id: yearMonthId, postType: currTab }}
                  name={`${currTab} 추가하러 가기`}
                />
                <span className="text-sm text-gray1">
                  {post[currTab].access} 작성할 수 있어요
                </span>
              </>
            ) : (
              <span>기록된 {currTab}이 없습니다</span>
            )}
          </>
        )}
      </div>
    </div>
  );
}
