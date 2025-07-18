import { ChangeEvent, useEffect, useState } from 'react';

import { useRecoilValue } from 'recoil';

import { getDocument } from '@/api/firebase/getFbDoc';
import { MEETING_PLACE, TAG_LIST } from '@/appConstants';
import CustomDatePicker from '@/components/common/CustomDatePicker';
import Modal from '@/components/common/Modal';
import Tag from '@/components/common/Tag';
import SquareBtn from '@/components/common/button/SquareBtn';
import Input from '@/components/common/input/Input';
import { IBookClub, clubByMonthSelector } from '@/data/clubAtom';
import useHandleSchedule from '@/hooks/useHandleSchedule';
import { thisYearMonthId } from '@/utils';

interface Props {
  title: string;
  value: Partial<IBookClub['meeting']>;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function MeetingInfoModal({
  title,
  value,
  setIsEditing,
}: Props) {
  const { meeting: schedule } = useRecoilValue(
    clubByMonthSelector(thisYearMonthId),
  );

  const [placeDoc, setPlaceDoc] = useState({ id: '', place: [] });

  const meeting = { ...schedule, ...value };

  const {
    time: { time, setTime, onTimeSubmit },
    place: { place, setPlace, onPlaceSubmit, onTagClick },
    onEditClick,
    isPending,
  } = useHandleSchedule(meeting, setIsEditing);

  useEffect(() => {
    getDocument(TAG_LIST, MEETING_PLACE, setPlaceDoc);
  }, []);

  return (
    <Modal
      title={title}
      onToggleClick={onEditClick}
      className="bottom-[30%] max-w-96 [&>div]:overflow-visible"
    >
      {title === '모임시간' && (
        <form onSubmit={onTimeSubmit} className="mt-1 flex flex-col">
          <CustomDatePicker
            id="모임시간"
            currentDate={time}
            onChange={date => setTime(date)}
          />
          <SquareBtn
            type="submit"
            name="설정하기"
            className="ml-auto mt-5"
            disabled={isPending}
          />
        </form>
      )}

      {title === '모임장소' && (
        <form onSubmit={onPlaceSubmit} className="mt-1 flex flex-col">
          <Input
            type="text"
            id="모임 장소"
            value={place as string}
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              setPlace(event.target.value);
            }}
            placeholder="모임 장소를 작성해주세요"
          />

          <div className="mb-6 mt-5">
            <span className="text-sm">추천장소</span>
            <ul className="mt-2 flex flex-wrap gap-2">
              {placeDoc.place.slice(0, 4).map(place => (
                <button
                  key={place}
                  type="button"
                  onClick={() => onTagClick(place)}
                >
                  <Tag text={place} shape="square" color="green" />
                </button>
              ))}
            </ul>
          </div>

          <SquareBtn type="submit" name="변경하기" className="ml-auto" />
        </form>
      )}
    </Modal>
  );
}
