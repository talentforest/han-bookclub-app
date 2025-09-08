import { ChangeEvent, FormEvent } from 'react';

import { dbService } from '@/fbase';
import { doc, updateDoc } from 'firebase/firestore';
import { FiMapPin } from 'react-icons/fi';

import { useRecoilValue, useSetRecoilState } from 'recoil';

import { clubByMonthSelector, clubByYearAtom } from '@/data/clubAtom';
import { currAuthUserAtom } from '@/data/userAtom';

import { setDocument } from '@/api';

import { BOOKCLUB_THIS_YEAR } from '@/appConstants';

import {
  useAlertAskJoin,
  useHandleModal,
  useHandleSchedule,
  useSendPushNotification,
} from '@/hooks';

import { formatDate, getNextYearMonthId } from '@/utils';

import { BookData, MonthlyBookClub } from '@/types';

import CustomDatePicker from '@/components/common/CustomDatePicker';
import Modal from '@/components/common/Modal';
import Tag from '@/components/common/Tag';
import BookAuthorPublisher from '@/components/common/book/BookAuthorPublisher';
import BookThumbnail from '@/components/common/book/BookThumbnail';
import SquareBtn from '@/components/common/button/SquareBtn';
import Input from '@/components/common/input/Input';

interface MeetingInfoModalProps {
  title: string;
  yearMonthId: string;
  currentValue?: Partial<MonthlyBookClub['meeting']>;
  registerBook?: BookData;
}

export default function MeetingInfoModal({
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
    setCurrMeeting,
    onMeetingSubmit,
    onTagClick,
    savedPlaceList,
  } = useHandleSchedule(bookClubSchedule, yearMonthId);

  const setThisYearClub = useSetRecoilState(clubByYearAtom);

  const { isPending, sendPushNotification } = useSendPushNotification();

  const { hideModal } = useHandleModal();

  const { anonymous } = useAlertAskJoin('register');

  const year = yearMonthId.slice(0, 4);
  const monthNum = +yearMonthId.slice(-2);

  const onNewMonthlyBookClubSubmit = async (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    try {
      if (monthlyBookClub) {
        const document = doc(dbService, BOOKCLUB_THIS_YEAR, yearMonthId);
        const editInfo = { meeting: currMeeting, book: registerBook };

        await updateDoc(document, editInfo);

        alert(`${monthNum}월 독서모임 책으로 변경되었습니다!`);

        setThisYearClub(prev => {
          return prev.map(bookclub =>
            monthlyBookClub.id === yearMonthId
              ? { ...monthlyBookClub, ...editInfo }
              : bookclub,
          );
        });
      } else {
        const defaultMonthlyBookClub: MonthlyBookClub = {
          book: registerBook,
          meeting: currMeeting,
          createdAt: formatDate(new Date(), "yyyy-MM-dd'T'HH:mm:ss"),
          creatorId: user.uid,
        };

        await setDocument(
          BOOKCLUB_THIS_YEAR,
          yearMonthId,
          defaultMonthlyBookClub,
        );

        alert(`${monthNum}월 독서모임 책으로 등록되었습니다!`);
      }

      await sendPushNotification({
        title: `☕️${year}년 ${monthNum}월의 모임 정보가 ${monthlyBookClub.book ? '변경' : '등록'}되었어요!`,
        body: `${year}년 ${monthNum}월의 모임도서는 《${registerBook.title}》입니다. 🕓${formatDate(currMeeting.time, 'M월 d일 EEEE a h시 mm분')}에 📍${currMeeting.place}에서 만나요 👋`,
      });
    } catch (error) {
      window.alert(
        '모임 장소 등록 중 오류가 발생했습니다. 관리자에게 문의해주세요.',
      );
    } finally {
      hideModal();
    }
  };

  return (
    <Modal
      title={title}
      className="bottom-[20%] max-w-96 [&>div]:overflow-visible"
    >
      {yearMonthId === getNextYearMonthId() && (
        <>
          <div className="mb-4 flex gap-x-3">
            <BookThumbnail
              thumbnail={registerBook.thumbnail}
              title={registerBook.title}
              className="w-9"
            />
            <div>
              <h3>{registerBook.title}</h3>
              <BookAuthorPublisher
                authors={registerBook.authors}
                publisher={registerBook.publisher}
              />
            </div>
          </div>
          <p className="text-sm text-gray1">
            다음달 모임시간과 장소도 확인해주세요.
          </p>
        </>
      )}
      <form
        onSubmit={registerBook ? onNewMonthlyBookClubSubmit : onMeetingSubmit}
        className="mt-1 flex flex-col gap-y-4"
      >
        {'time' in currentValue && (
          <CustomDatePicker
            id="모임시간"
            currentDate={new Date(currMeeting.time)}
            onChange={date =>
              setCurrMeeting(prev => ({
                ...prev,
                time: formatDate(date, "yyyy-MM-dd'T'HH:mm:ss"),
              }))
            }
          />
        )}

        {'place' in currentValue && (
          <div>
            <div className="relative">
              <FiMapPin className="absolute left-3 top-3.5 size-[20px]" />
              <Input
                type="text"
                id="모임 장소"
                value={currMeeting.place}
                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                  setCurrMeeting(prev => ({
                    ...prev,
                    place: event.target.value,
                  }));
                }}
                placeholder="모임 장소를 작성해주세요"
                className="!pl-10"
              />
            </div>

            <div className="mx-1 mt-2">
              <span className="text-sm">추천장소</span>
              <ul className="mt-1 flex flex-wrap gap-2">
                {savedPlaceList?.place.slice(0, 4).map(place => (
                  <button
                    key={place}
                    type="button"
                    onClick={() => onTagClick(place)}
                  >
                    <Tag
                      text={place}
                      shape="square"
                      color="green"
                      className="!px-2.5 !py-1.5 !text-sm"
                    />
                  </button>
                ))}
              </ul>
            </div>
          </div>
        )}

        <SquareBtn
          type="submit"
          name={registerBook ? `${monthNum}월 독서모임 등록하기` : '변경하기'}
          className="ml-auto"
          disabled={isPending || anonymous}
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
