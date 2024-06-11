import { useRecoilState, useRecoilValue } from 'recoil';
import { IUserDataDoc, allUsersState, currentUserState } from 'data/userAtom';
import { useEffect } from 'react';
import { Section } from './Home';
import { useLocation } from 'react-router-dom';
import {
  ABSENCE_MEMBERS,
  PENALTY,
  THIS_YEAR_BOOKCLUB,
  USER_DATA,
} from 'constants/index';
import { getCollection, getDocument } from 'api/getFbDoc';
import { PostType } from 'components/molecules/PostHandleBtns';
import { EmptyBox } from './BookClubHistory';
import { existDocObj, thisMonth, thisYear } from 'util/index';
import { absenceListState } from 'data/absenceAtom';
import { OverduePenaltyMonths, penaltyDocState } from 'data/penaltyAtom';
import Subtitle from 'components/atoms/Subtitle';
import Tag from 'components/atoms/Tag';
import MobileHeader from 'layout/mobile/MobileHeader';
import GuideLine from 'components/atoms/GuideLine';
import UserImgName from 'components/molecules/UserImgName';
import BookshelfPostList from 'components/organisms/BookshelfPostList';
import PenaltyBox from 'components/molecules/PenaltyBox';
import device from 'theme/mediaQueries';
import styled from 'styled-components';
import Loading from 'components/atoms/Loading';
import PenaltyCostReceipt from 'components/molecules/PenaltyCostReceipt';

const Bookshelf = () => {
  const [penaltyDoc, setPenaltyDoc] = useRecoilState(penaltyDocState);
  const [absenceList, setAbsenceList] = useRecoilState(absenceListState);
  const [allUserDocs, setAllUserDocs] = useRecoilState(allUsersState);
  const currentUser = useRecoilValue(currentUserState);

  const { state } = useLocation();
  const userId = state ? state.userId : currentUser;
  const userData = allUserDocs.find((user) => user.id === userId);

  useEffect(() => {
    if (allUserDocs.length === 0) {
      getCollection(USER_DATA, setAllUserDocs);
    }
    if (!existDocObj(absenceList)) {
      getDocument(THIS_YEAR_BOOKCLUB, ABSENCE_MEMBERS, setAbsenceList);
    }
    if (!existDocObj(penaltyDoc)) {
      getDocument(PENALTY, thisYear, setPenaltyDoc);
    }
  }, []);

  const isAbsenceThisMonth = () => {
    if (absenceList.absenceMembers) {
      const thisMonthAbsence = absenceList.absenceMembers.find(
        (absence) => absence.month === +thisMonth
      );
      const isBreak = thisMonthAbsence.breakMembers.includes(state?.userId);
      const onceAbsence = thisMonthAbsence.onceAbsenceMembers.includes(
        state?.userId
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
  const myPenalty = penaltyDoc[id] as OverduePenaltyMonths;

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
          <AttendanceBox>
            {isAbsenceThisMonth() ? (
              <Tag color='red' roundedFull={false}>
                <span>🔴 이번달 불참</span>
              </Tag>
            ) : (
              <Tag color='green' roundedFull={false}>
                <span>✅ 이번달 출석</span>
              </Tag>
            )}
          </AttendanceBox>
        </Section>

        <Section>
          <Subtitle title={`${userName}의 독서 분야 취향`} />
          <FavBookFieldList>
            {favoriteBookField && favoriteBookField?.length !== 0 ? (
              favoriteBookField.map((field) => (
                <Tag key={field.id} color='purple'>
                  <span>{field.name}</span>
                </Tag>
              ))
            ) : (
              <Loading height='12vh' />
            )}
          </FavBookFieldList>
        </Section>

        <Section>
          <Subtitle title={`${userName}의 페널티 현황`} />
          {myPenalty && (
            <PenaltyContainer>
              <PenaltyBox
                title='의무 발제달'
                subjectDutyMonths={myPenalty.overdueHostReviewMonths}
              />
              <PenaltyBox
                title='총 페널티비'
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
            </PenaltyContainer>
          )}
        </Section>

        {(['정리 기록', '발제문', '모임 후기'] as PostType[]).map(
          (postType) => (
            <Section key={postType}>
              <Subtitle title={`${userName}의 ${postType}`} />
              <GuideLine text='2022년 6월 이후의 기록이 제공됩니다.' />
              <BookshelfPostList
                userRecords={userRecords}
                postType={postType}
              />
            </Section>
          )
        )}
      </main>
    </>
  );
};

export const FavBookFieldList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  min-height: 60px;
`;

export const AttendanceBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  margin-top: 10px;
  > button {
  }
`;

export const PostList = styled.ul`
  min-height: 15vh;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  justify-content: space-between;
  gap: 12px 10px;
  margin-top: 10px;
  @media ${device.tablet} {
    gap: 20px 15px;
    grid-template-columns: repeat(6, 1fr);
  }
  @media ${device.desktop} {
    grid-template-columns: repeat(7, 1fr);
  }
`;

export const EmptyBookShelfBox = styled(EmptyBox)`
  grid-column: 1 / span 4;
  @media ${device.tablet} {
    height: 200px;
    grid-column: 1 / span 6;
  }
  @media ${device.desktop} {
    grid-column: 1 / span 7;
  }
`;

export const PenaltyContainer = styled.div`
  @media ${device.desktop} {
    width: 50%;
  }
`;

export default Bookshelf;
