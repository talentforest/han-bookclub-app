import { ChangeEvent, FormEvent, useState } from 'react';

import { dbService } from '@/fbase';
import { doc, updateDoc } from 'firebase/firestore';
import { FiCheckCircle, FiEdit3, FiPlusCircle, FiTrash2 } from 'react-icons/fi';
import { v4 } from 'uuid';

import { useRecoilValue } from 'recoil';

import { clubByMonthSelector } from '@/data/clubAtom';
import { currAuthUserAtom } from '@/data/userAtom';

import { setDocument } from '@/api';

import {
  useAlertAskJoin,
  useHandleErrorMsg,
  useHandleModal,
  useHandleSchedule,
  useSendPushNotification,
} from '@/hooks';

import { formatDate, getThirdSunday } from '@/utils';

import { MonthlyBookClub } from '@/types';

import CustomDatePicker from '@/components/common/CustomDatePicker';
import Modal from '@/components/common/Modal';
import Tag from '@/components/common/Tag';
import SquareBtn from '@/components/common/button/SquareBtn';
import Input from '@/components/common/input/Input';
import SelectHosts from '@/components/common/input/SelectHosts';

interface MeetingInfoModalProps {
  title: string;
  yearMonthId: string;
}

const LAST_STEP = 2;

export default function EventMeetingModal({
  title,
  yearMonthId,
}: MeetingInfoModalProps) {
  const user = useRecoilValue(currAuthUserAtom);

  const [currStep, setCurrStep] = useState(1);

  const [currEdit, setCurrEdit] = useState<{
    id: string;
    isEditing: boolean;
  }>({ id: '', isEditing: false });

  const monthlyBookClub = useRecoilValue(clubByMonthSelector(yearMonthId));

  const year = +yearMonthId.slice(0, 4);
  const month = +yearMonthId.slice(-2);

  const initialEventMeeting: MonthlyBookClub['meeting'] = {
    place: '카페 느티',
    time: formatDate(
      getThirdSunday(year, month, 11, 0),
      "yyyy-MM-dd'T'HH:mm:ss",
    ),
    eventMonth: {
      title: '',
      contents: [
        { id: v4(), title: `${year}년 재독 챌린지 결과` },
        { id: v4(), title: `${year}년 가장 멋진 발제문은?` },
        { id: v4(), title: `${year}년 개근 성실 멤버는?` },
      ],
      hosts: [],
    },
  };

  const bookClubSchedule = monthlyBookClub
    ? { ...monthlyBookClub.meeting, ...initialEventMeeting }
    : (initialEventMeeting as MonthlyBookClub['meeting']);

  const { currMeeting, onMeetingChange, savedPlaceList } = useHandleSchedule(
    bookClubSchedule,
    yearMonthId,
  );

  const { anonymous } = useAlertAskJoin('register');

  const { isPending, sendPushNotificationToAllUser } =
    useSendPushNotification();

  const { hideModal } = useHandleModal();

  const { errorMsg, handleErrorMsg } = useHandleErrorMsg();

  const { eventMonth, time, place } = currMeeting;

  const errorMsgObj = {
    place: [
      {
        condition: currStep === 1 && place === '',
        error: '장소를 작성해주세요.',
      },
    ],
    eventTitle: [
      {
        condition: currStep === 1 && eventMonth.title === '',
        error: '이벤트 제목을 작성해주세요.',
      },
    ],
    hosts: [
      {
        condition: currStep === 2 && eventMonth.hosts.length === 0,
        error: '이벤트 진행자를 선택해주세요.',
      },
    ],
    contents: [
      {
        condition:
          currStep === 2 &&
          eventMonth.contents.some(({ title }) => title === ''),
        error: '이벤트 콘텐츠를 작성해주세요.',
      },
    ],
  };

  const monthNum = +yearMonthId.slice(-2);
  const collName = `BookClub-${yearMonthId.slice(0, 4)}`;

  const onClubEventEdit = async () => {
    const document = doc(dbService, collName, yearMonthId);
    const editInfo = { meeting: currMeeting };

    await updateDoc(document, editInfo);

    alert(`${monthNum}월 독서모임 정보가 변경되었습니다!`);

    await sendPushNotificationToAllUser({
      title: `☕️${currMeeting.eventMonth.title} 변경 안내`,
      body: `${formatDate(time, 'M월 d일 EEEE a h시 mm분')}에 ${place}에서 만나요👋`,
    });
  };

  const onClubEventNewSubmit = async () => {
    const eventMonthlyBookClub: MonthlyBookClub = {
      meeting: currMeeting,
      createdAt: formatDate(new Date(), "yyyy-MM-dd'T'HH:mm:ss"),
      creatorId: user.uid,
    };

    await setDocument(collName, yearMonthId, eventMonthlyBookClub);

    alert(`${monthNum}월 독서모임 정보가 등록되었습니다!`);

    await sendPushNotificationToAllUser({
      title: `☕️${currMeeting.eventMonth.title} 등록 안내`,
      body: `${monthNum}월 이벤트가 등록되었어요! 🕓${formatDate(time, 'M월 d일 EEEE a h시 mm분')}에 📍${place}에서 만나요👋`,
    });
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const hasError = handleErrorMsg(errorMsgObj);
      if (hasError) return;

      monthlyBookClub ? onClubEventEdit() : onClubEventNewSubmit();
      hideModal();
    } catch (error) {
      window.alert(
        '모임 장소 등록 중 오류가 발생했습니다. 관리자에게 문의해주세요.',
      );
      hideModal();
    }
  };

  const changeStep = (direction: 'prev' | 'next', step?: number) => {
    if (step) return setCurrStep(step);

    if (direction === 'next') {
      const hasError = handleErrorMsg(errorMsgObj);

      if (!hasError) {
        const step = currStep === LAST_STEP ? currStep : currStep + 1;
        setCurrStep(step);
      }
    }
    if (direction === 'prev') {
      const step = currStep === 1 ? currStep : currStep - 1;
      setCurrStep(step);
    }
  };

  const handleFocus = (inputId: string) => {
    const el = document.getElementById(inputId);
    el?.focus();
  };

  const isEditingInput = (inputId: string) => {
    return currEdit.id === inputId && currEdit.isEditing;
  };

  return (
    <Modal title={title} className="max-w-96">
      <form
        onSubmit={onSubmit}
        className="flex flex-col gap-y-3 overflow-y-scroll scrollbar-hide"
      >
        {currStep === 1 && (
          <>
            <Input
              label="이벤트 제목"
              placeholder="이벤트달의 제목을 작성해주세요."
              value={eventMonth.title}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                onMeetingChange({
                  eventMonth: {
                    ...eventMonth,
                    title: event.target.value,
                  },
                });
              }}
              errorMsg={errorMsg?.eventTitle}
            />

            <CustomDatePicker
              id="모임시간"
              label="모임시간"
              selectsEnd
              selected={new Date(time)}
              dateFormat="M월 d일 EEEE a hh:mm"
              onChange={(date: Date) => {
                onMeetingChange({
                  time: formatDate(date, "yyyy-MM-dd'T'HH:mm:ss"),
                });
              }}
              showTimeInput
              placeholderText="정해진 모임시간이 없습니다."
            />

            <Input
              label="모임장소"
              value={place}
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
          </>
        )}

        {currStep === 2 && (
          <>
            <SelectHosts
              label="이벤트 진행자"
              selectedHosts={initialEventMeeting.eventMonth.hosts}
              onChange={value => {
                const hosts = value.map(({ value }) => value);
                onMeetingChange({ eventMonth: { ...eventMonth, hosts } });
              }}
              errorMsg={errorMsg.hosts}
            />

            <div className="flex h-[40vh] flex-col gap-y-3 overflow-y-scroll scrollbar-hide">
              {eventMonth?.contents.length > 0 && (
                <ul className="flex flex-col gap-y-3">
                  {eventMonth?.contents?.map(({ id, title }, index) => (
                    <li key={id}>
                      <Input
                        label={index === 0 && '이벤트 콘텐츠 아이디어'}
                        readOnly={!isEditingInput(id)}
                        id={id}
                        iconName="FiHash"
                        value={title}
                        placeholder={
                          isEditingInput(id)
                            ? '이벤트 내용을 작성해주세요.'
                            : ''
                        }
                        className="bg-blue-50 !pr-16 font-medium read-only:cursor-default read-only:border-gray1 read-only:bg-white"
                        onChange={(event: ChangeEvent<HTMLInputElement>) => {
                          const contents = eventMonth.contents.map(content => {
                            return id === content.id
                              ? { ...content, title: event.target.value }
                              : content;
                          });
                          onMeetingChange({
                            eventMonth: { ...eventMonth, contents },
                          });
                        }}
                        errorMsg={title === '' && errorMsg.contents}
                        tailIconChildren={
                          <div className="absolute right-3 top-[15px] flex items-center gap-2">
                            {!isEditingInput(id) ? (
                              <FiEdit3
                                onClick={() => {
                                  setCurrEdit({ id, isEditing: true });
                                  handleFocus(id);
                                }}
                                className="!size-[18px]"
                              />
                            ) : (
                              <FiCheckCircle
                                onClick={() => {
                                  setCurrEdit({ id: '', isEditing: false });
                                }}
                                className="!size-[17px]"
                              />
                            )}

                            {index > 2 && (
                              <FiTrash2
                                className="!size-[18px]"
                                onClick={() => {
                                  if (index === 0) return;
                                  const contents = eventMonth.contents.filter(
                                    content => content.id !== id,
                                  );
                                  onMeetingChange({
                                    eventMonth: { ...eventMonth, contents },
                                  });
                                }}
                              />
                            )}
                          </div>
                        }
                      />
                    </li>
                  ))}
                </ul>
              )}
              <button
                type="button"
                onClick={() => {
                  onMeetingChange({
                    eventMonth: {
                      ...eventMonth,
                      contents: [
                        ...eventMonth.contents,
                        { id: v4(), title: '' },
                      ],
                    },
                  });
                }}
                className="flex min-h-12 w-full items-center justify-center rounded-xl border border-gray1"
              >
                <FiPlusCircle className="size-5 text-blue1" />
              </button>
            </div>
          </>
        )}

        <div className="ml-auto mt-4 flex gap-x-2">
          <SquareBtn
            type="button"
            name="이전"
            handleClick={() => changeStep('prev')}
            disabled={currStep === 1}
            className="!shadow-none"
            color="gray"
          />
          {LAST_STEP !== currStep && (
            <SquareBtn
              type="button"
              name="다음"
              handleClick={() => changeStep('next')}
              className="!shadow-none"
            />
          )}
          {LAST_STEP === currStep && (
            <SquareBtn
              type="submit"
              name={
                !monthlyBookClub?.meeting
                  ? `${monthNum}월 독서모임 등록하기`
                  : '변경하기'
              }
              className="ml-auto"
              disabled={isPending || anonymous}
              color="blue"
            />
          )}
        </div>

        {anonymous && (
          <p className="ml-auto text-sm text-red-500">
            익명의 방문자는 등록할 수 없습니다.
          </p>
        )}
      </form>
    </Modal>
  );
}
