import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getCollection } from 'api/getFbDoc';
import { getFbRoute } from 'util/index';
import { useRecoilState } from 'recoil';
import { hostReviewState, subjectsState } from 'data/documentsAtom';
import { TabName } from 'components/molecules/TabListOnTop';
import TabListOnTop from 'components/molecules/TabListOnTop';
import TabContentBox from 'components/molecules/TabContentBox';

interface Props {
  yearMonthId: string;
}

export default function PostTabBox({ yearMonthId }: Props) {
  const [currTab, setCurrTab] = useState<TabName>('발제문');
  const [hostReview, setHostReview] = useRecoilState(hostReviewState);
  const [subjects, setSubjects] = useRecoilState(subjectsState);

  useEffect(() => {
    getCollection(getFbRoute(yearMonthId).HOST_REVIEW, setHostReview);
    getCollection(getFbRoute(yearMonthId).SUBJECTS, setSubjects);
  }, [subjects.length]);

  const { pathname } = useLocation();

  const post = currTab === '발제문' ? subjects[0] : hostReview[0];

  return (
    <div>
      <TabListOnTop
        tabList={['발제문', '정리 기록']}
        currTab={currTab}
        setCurrTab={setCurrTab}
      />

      <TabContentBox
        currTab={currTab}
        post={post}
        yearMonthId={yearMonthId}
        editable={!pathname.includes('history')}
      />
    </div>
  );
}
