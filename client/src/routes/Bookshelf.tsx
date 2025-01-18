import { useEffect } from 'react';

import { useLocation } from 'react-router-dom';

import { getCollection, getDocument } from 'api/firebase/getFbDoc';

import { absenceListState } from 'data/absenceAtom';
import { penaltyDocState } from 'data/penaltyAtom';
import { IUserDataDoc, allUsersState, currentUserState } from 'data/userAtom';
import { useRecoilState, useRecoilValue } from 'recoil';

import {
  ABSENCE_MEMBERS,
  BOOKCLUB_THIS_YEAR,
  PENALTY,
  USER,
} from 'appConstants';
import { existDocObj, thisMonth, thisYear } from 'utils';

import MobileHeader from 'layout/mobile/MobileHeader';

import BookshelfPostList from 'components/bookshelf/BookshelfPostList';
import GuideLine from 'components/common/GuideLine';
import Loading from 'components/common/Loading';
import Subtitle from 'components/common/Subtitle';
import Tag from 'components/common/Tag';
import Section from 'components/common/container/Section';
import UserImgName from 'components/common/user/UserImgName';
import { PostType } from 'components/post/PostHandleBtns';

const Bookshelf = () => {
  const [penaltyDoc, setPenaltyDoc] = useRecoilState(penaltyDocState);
  const [absenceList, setAbsenceList] = useRecoilState(absenceListState);
  const [allUserDocs, setAllUserDocs] = useRecoilState(allUsersState);
  const currentUser = useRecoilValue(currentUserState);

  const { state } = useLocation();
  const userId = state ? state.userId : currentUser;
  const userData = allUserDocs.find(user => user.id === userId);

  useEffect(() => {
    if (allUserDocs.length === 0) {
      getCollection(USER, setAllUserDocs);
    }
    if (!existDocObj(absenceList)) {
      getDocument(BOOKCLUB_THIS_YEAR, ABSENCE_MEMBERS, setAbsenceList);
    }
    if (!existDocObj(penaltyDoc)) {
      getDocument(PENALTY, thisYear, setPenaltyDoc);
    }
  }, []);

  const isAbsenceThisMonth = () => {
    if (absenceList.absenceMembers) {
      const thisMonthAbsence = absenceList.absenceMembers.find(
        absence => absence.month === +thisMonth,
      );
      const isBreak = thisMonthAbsence.breakMembers.includes(state?.userId);
      const onceAbsence = thisMonthAbsence.onceAbsenceMembers.includes(
        state?.userId,
      );
      return isBreak || onceAbsence;
    }
  };

  const {
    id,
    photoURL,
    displayName,
    favoriteBookField,
    userRecords, //
  } = (userData as IUserDataDoc) || {};

  const isCurrentUser = currentUser.uid === id;
  const userName = !userData || isCurrentUser ? '나' : displayName;

  return (
    <>
      <MobileHeader
        title={`${userName}의 책장`}
        settingBtn={isCurrentUser}
        backBtn={!isCurrentUser}
      />

      <main>
        <Section>
          <UserImgName photoURL={photoURL} displayName={displayName} />
          <div className="mt-2.5 flex flex-col items-center gap-1">
            {isAbsenceThisMonth() ? (
              <Tag text="🔴 이번달 불참" color="red" shape="square" />
            ) : (
              <Tag text="✅ 이번달 출석" color="green" shape="square" />
            )}
          </div>
        </Section>

        <Section title={`${userName}의 독서 분야 취향`}>
          <ul className="flex min-h-14 flex-wrap gap-2">
            {favoriteBookField && favoriteBookField?.length !== 0 ? (
              favoriteBookField.map(({ id, name }) => (
                <Tag text={name} key={id} color="purple" />
              ))
            ) : (
              <Loading className="h-[12vh]" />
            )}
          </ul>
        </Section>

        {/* <Section title={`${userName}의 페널티 현황`}>
          {myPenalty && (
            <div className="lg:w-1/2">
              <PenaltyBox
                title="의무 발제달"
                subjectDutyMonths={myPenalty.overdueHostReviewMonths}
              />
              <PenaltyBox
                title="총 페널티비"
                totalCost={
                  (myPenalty.overdueSubjectMonths?.length +
                    myPenalty.overdueAbsenceMonths?.length) *
                  7000
                }
              >
                <PenaltyCostReceipt
                  overdueSubjectMonths={myPenalty.overdueSubjectMonths}
                  overdueAbsenceMonths={myPenalty.overdueAbsenceMonths}
                />
              </PenaltyBox>
            </div>
          )}
        </Section> */}

        {(['정리 기록', '발제문'] as PostType[]).map(postType => (
          <Section key={postType}>
            <Subtitle title={`${userName}의 ${postType}`} />
            <GuideLine text="2022년 6월 이후의 기록이 제공됩니다." />
            <BookshelfPostList userRecords={userRecords} postType={postType} />
          </Section>
        ))}
      </main>
    </>
  );
};

export default Bookshelf;
