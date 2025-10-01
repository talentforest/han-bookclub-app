import { ChangeEvent, FormEvent } from 'react';

import { useRecoilValue } from 'recoil';

import { clubByMonthSelector } from '@/data/clubAtom';
import { currAuthUserAtom } from '@/data/userAtom';

import {
  useAlertAskJoin,
  useHandleErrorMsg,
  useHandleModal,
  useHandleSchedule,
  useSendPushNotification,
} from '@/hooks';

import { formatDate } from '@/utils';

import { MonthlyBookClub } from '@/types';

import CustomDatePicker from '@/components/common/CustomDatePicker';
import Modal from '@/components/common/Modal';
import Tag from '@/components/common/Tag';
import SquareBtn from '@/components/common/button/SquareBtn';
import Input from '@/components/common/input/Input';

interface MeetingInfoModalProps {
  title: string;
  yearMonthId: string;
  currentValue?: Partial<MonthlyBookClub['meeting']>;
  registerBook?: MonthlyBookClub['book'];
}

export default function NewBookClubModal({
  title,
  currentValue,
  yearMonthId,
  registerBook,
}: MeetingInfoModalProps) {
  const user = useRecoilValue(currAuthUserAtom);

  const monthlyBookClub = useRecoilValue(clubByMonthSelector(yearMonthId));

  const bookClubSchedule = monthlyBookClub
    ? { ...monthlyBookClub.meeting, ...currentValue }
    : (currentValue as MonthlyBookClub['meeting']);

  const {
    currMeeting,
    onMeetingChange,
    savedPlaceList,
    onMeetingEdit,
    onNewBookClubSubmit,
  } = useHandleSchedule(bookClubSchedule, yearMonthId);

  const monthNum = +yearMonthId.slice(-2);

  const { anonymous } = useAlertAskJoin('register');

  const { isPending } = useSendPushNotification();

  const { hideModal } = useHandleModal();

  const { errorMsg, handleErrorMsg } = useHandleErrorMsg();

  const errorMsgObj = {
    place: [
      {
        condition: currMeeting.place === '',
        error: '장소를 작성해주세요.',
      },
    ],
  };

  const { sendPushNotificationToAllUser } = useSendPushNotification();

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const hasError = handleErrorMsg(errorMsgObj);
      if (hasError) return;

      if (!monthlyBookClub) {
        const newBookClub: MonthlyBookClub = {
          meeting: currMeeting,
          createdAt: formatDate(new Date(), "yyyy-MM-dd'T'HH:mm:ss"),
          creatorId: user.uid,
          book: registerBook,
        };
        await onNewBookClubSubmit(newBookClub);
        alert(`${monthNum}월 독서모임 정보가 등록되었습니다!`);
        await sendPushNotificationToAllUser({
          title: `☕️${monthNum}월의 독서모임 정보가 등록되었어요!`,
          body: `${monthNum}월의 모임책은 《${registerBook?.title}》입니다. 🕓${formatDate(currMeeting.time, 'M월 d일 EEEE a h시 mm분')}에 ${currMeeting.place}에서 만나요 👋`,
        });
      } else {
        const updatedMeeting = { meeting: currMeeting };
        await onMeetingEdit(updatedMeeting);
        alert(`${monthNum}월 독서모임 정보가 변경되었습니다!`);
        await sendPushNotificationToAllUser({
          title: `☕️${monthNum}월의 독서모임 정보가 변경되었어요!`,
          body: `🕓${formatDate(currMeeting.time, 'M월 d일 EEEE a h시 mm분')}에 ${currMeeting.place}에서 만나요 👋`,
        });
      }
    } catch (error) {
      window.alert(
        '모임 장소 등록 중 오류가 발생했습니다. 관리자에게 문의해주세요.',
      );
    } finally {
      hideModal();
    }
  };

  return (
    <Modal title={title} className="max-w-96 max-sm:mt-[30%]">
      <form onSubmit={onSubmit} className="flex flex-col gap-y-3">
        {'time' in currentValue && (
          <CustomDatePicker
            id="모임시간"
            label="모임시간"
            placeholderText="정해진 모임시간이 없습니다."
            selectsEnd
            selected={new Date(currMeeting.time)}
            dateFormat="M월 d일 EEEE a hh:mm"
            onChange={(date: Date) => {
              onMeetingChange({
                time: formatDate(date, "yyyy-MM-dd'T'HH:mm:ss"),
              });
            }}
            showTimeInput
          />
        )}

        {'place' in currentValue && (
          <Input
            label="모임장소"
            value={currMeeting.place}
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              onMeetingChange({ place: event.target.value });
            }}
            placeholder="모임 장소를 작성해주세요"
            iconName="FiMapPin"
            errorMsg={errorMsg?.place}
          >
            <ul className="mx-0.5 mt-2 flex flex-wrap gap-2">
              {savedPlaceList?.place?.map(place => (
                <Tag
                  key={place}
                  text={place}
                  shape="square"
                  color="green"
                  className="!px-2.5 !py-1.5 !text-xs"
                  onClick={() => onMeetingChange({ place })}
                />
              ))}
            </ul>
          </Input>
        )}

        <SquareBtn
          type="submit"
          name={
            !monthlyBookClub?.meeting
              ? `${monthNum}월 독서모임 등록하기`
              : '변경하기'
          }
          className="ml-auto"
          disabled={isPending || anonymous}
          color="darkBlue"
        />

        {anonymous && (
          <p className="ml-auto text-sm text-red-500">
            익명의 방문자는 등록할 수 없습니다.
          </p>
        )}
      </form>
    </Modal>
  );
}
