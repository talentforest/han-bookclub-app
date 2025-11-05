import { useEffect } from 'react';

import { useLocation, useNavigate } from 'react-router-dom';

import { FiUsers } from 'react-icons/fi';

import { useRecoilValue } from 'recoil';

import { currUserFcmState } from '@/data/fcmAtom';
import { currAuthUserAtom } from '@/data/userAtom';

import { DEVELOPER_EMAIL } from '@/appConstants';

import { useHandleVoting, useSendPushNotification } from '@/hooks';

import { getDDay, getPercentageNum, todayWithHyphen } from '@/utils';

import { NotificationData } from '@/types';

import MobileHeader from '@/layout/MobileHeader';

import VoteBookItem from '@/components/bookVote/VoteBookItem';
import VoteDetailHeader from '@/components/bookVote/VoteDetailHeader';
import VoteItemReasonBox from '@/components/bookVote/VoteItemReasonBox';
import DDay from '@/components/common/DDay';
import GuideLine from '@/components/common/GuideLine';
import SquareBtn from '@/components/common/button/SquareBtn';
import VoteBookItemBtn from '@/components/common/button/VoteBookItemBtn';
import UserImgName from '@/components/common/user/UserImgName';

type LocationState = {
  state: {
    collName: 'BookVote';
    docId: string;
  };
};

const VoteDetail = () => {
  const { state } = useLocation() as LocationState;

  const { email } = useRecoilValue(currAuthUserAtom);
  const currUserFcm = useRecoilValue(currUserFcmState);

  const navigate = useNavigate();

  useEffect(() => {
    if (!state?.collName || !state?.docId) {
      navigate('/vote');
    }
  }, []);

  const {
    currentVote,
    votedItemsByMember,
    voteCountsById,
    totalVoteCount,
    selectedItem,
    onVotingSubmit,
    onVoteItemClick,
    myVotedItems,
    onVoteDeleteClick,
    isRevote,
    onToggleRevoteClick,
  } = useHandleVoting({ collName: state?.collName, docId: state?.docId });

  const {
    sendPushNotificationToUser,
    sendPushNotificationToAllUser,
    isPending,
  } = useSendPushNotification();

  const isExpiredVote = currentVote?.deadline < todayWithHyphen;

  const highestVoteItemList = voteCountsById?.filter((book, _, arr) => {
    return book.voteCount === Math.max(...arr.map(book => book.voteCount));
  });

  const findHighestVoteItem = (title: string) => {
    return !!highestVoteItemList.find(item => item.title === title);
  };

  const voteDday = getDDay(currentVote.deadline);

  return (
    <>
      <MobileHeader
        title={`${isExpiredVote ? '만료된 ' : ''}모임책 투표함`}
        backBtn
      />

      {currentVote?.voteItems && (
        <main>
          <VoteDetailHeader
            vote={currentVote}
            onVoteDeleteClick={onVoteDeleteClick}
          />
          <VoteItemReasonBox voteItems={currentVote.voteItems} />

          {/* 투표를 완료했거나 만료된 이후 결과 화면 */}
          {isExpiredVote || (myVotedItems && !isRevote) ? (
            <>
              <ul className="mb-6 mt-2 flex h-full flex-wrap items-center justify-center gap-5 max-sm:mb-10">
                {currentVote.voteItems.map(voteItem => (
                  <VoteBookItem
                    key={voteItem.id}
                    voteItem={voteItem}
                    selected={findHighestVoteItem(voteItem.book.title)}
                  />
                ))}
              </ul>

              {voteCountsById.map(({ id, title, voteCount }) => (
                <div
                  key={id}
                  className="relative mx-auto mt-2 flex w-2/3 overflow-hidden rounded-xl bg-white px-3 py-1 shadow-sm max-sm:w-full"
                >
                  <div
                    style={{
                      width: `${getPercentageNum(voteCount, totalVoteCount)}%`,
                    }}
                    className={`absolute inset-y-0 left-0 z-0 rounded-r-lg ${findHighestVoteItem(title) ? 'bg-pointCoral' : 'bg-gray3'}`}
                  />
                  <span
                    className={`z-10 inline-block w-full pt-[1px] text-[15px] ${findHighestVoteItem(title) ? 'font-medium text-white' : 'text-gray2'}`}
                  >
                    {title}
                  </span>
                  <span
                    className={`z-10 pt-[1px] text-sm ${findHighestVoteItem(title) ? 'font-medium text-pointCoral' : 'text-gray2'}`}
                  >
                    {getPercentageNum(voteCount, totalVoteCount)}%
                  </span>
                </div>
              ))}

              <div className="mt-14 flex items-center justify-center gap-4 max-sm:mb-12">
                <SquareBtn
                  name="투표 완료"
                  disabled
                  color="gray"
                  className="px-8"
                />
                {!isExpiredVote && (
                  <SquareBtn
                    disabled={isExpiredVote}
                    type="button"
                    name="다시 투표하기"
                    handleClick={onToggleRevoteClick}
                  />
                )}
              </div>
            </>
          ) : (
            // 투표 화면
            <>
              <GuideLine text="중복 투표도 가능해요" />
              <form
                onSubmit={onVotingSubmit}
                className="mb-10 flex flex-col items-center"
              >
                <ul className="mb-8 flex flex-wrap items-center gap-4 max-sm:justify-center">
                  {currentVote.voteItems.map(voteItem => (
                    <VoteBookItem key={voteItem.id} voteItem={voteItem}>
                      <VoteBookItemBtn
                        selected={!!selectedItem(voteItem.id)}
                        onVoteItemClick={() => onVoteItemClick(voteItem.id)}
                      />
                    </VoteBookItem>
                  ))}
                </ul>
                <SquareBtn
                  type="submit"
                  name="투표하기"
                  className="px-10 py-2 max-sm:px-6"
                />
              </form>
            </>
          )}

          {!isExpiredVote && <DDay hyphenDate={currentVote.deadline} />}

          <div className="mt-10">
            <h4 className="flex items-center gap-2">
              <FiUsers />
              {`투표인원: ${votedItemsByMember?.length}명`}
            </h4>

            <ul className="mt-2 flex flex-wrap gap-x-3 gap-y-2">
              {votedItemsByMember.map(member => (
                <li key={member.id}>
                  <UserImgName userId={member.id} />
                </li>
              ))}
            </ul>
          </div>

          {email === DEVELOPER_EMAIL && +voteDday >= 0 && (
            <SquareBtn
              className="mt-10"
              color="blue"
              name={`투표 임박 알림: ${+voteDday > 0 ? `${voteDday}일` : '오늘 자정'}`}
              handleClick={async () => {
                const notificationData: NotificationData = {
                  title: `🗳️ 투표 임박 알림!`,
                  body: `${+voteDday > 0 ? `${voteDday}일 후` : '오늘 자정에'} 투표가 마감됩니다. 투표를 안하신 분들은 투표를 완료하세요🔥`,
                  notification: currUserFcm.notification,
                };
                await sendPushNotificationToUser(notificationData);
                await sendPushNotificationToAllUser(notificationData);

                window.alert('이번달 투표 임박 알림을 모두에게 보냈습니다!');
              }}
              disabled={isPending}
            />
          )}
        </main>
      )}
    </>
  );
};

export default VoteDetail;
