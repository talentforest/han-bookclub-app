import { ChangeEvent, useEffect, useState } from 'react';

import useHandleSchedule from 'hooks/useHandleSchedule';

import { getDocument } from 'api/firebase/getFbDoc';

import { ISchedule } from 'data/bookClubAtom';

import { MEETING_PLACE, TAG_LIST } from 'appConstants';

import CustomDatePicker from 'components/common/CustomDatePicker';
import Modal from 'components/common/Modal';
import Tag from 'components/common/Tag';
import SquareBtn from 'components/common/button/SquareBtn';

interface Props {
  title: string;
  meeting: ISchedule;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function MeetingInfoModal({
  title,
  meeting,
  setIsEditing,
}: Props) {
  const [placeDoc, setPlaceDoc] = useState({ id: '', place: [] });

  const {
    place,
    setPlace,
    time,
    setTime,
    onTimeSubmit,
    onPlaceSubmit,
    onTagClick,
    onEditClick,
  } = useHandleSchedule(meeting, setIsEditing);

  useEffect(() => {
    getDocument(TAG_LIST, MEETING_PLACE, setPlaceDoc);
  }, []);

  return (
    <Modal title={title} onToggleClick={onEditClick} className="max-w-96">
      {title === '모임시간' && (
        <form onSubmit={onTimeSubmit} className="mt-4">
          <CustomDatePicker
            id="모임시간"
            currentDate={time}
            onChange={date => {
              setTime(date);
            }}
          />
          <SquareBtn type="submit" name="설정하기" className="ml-auto mt-5" />
        </form>
      )}

      {title === '모임장소' && (
        <form onSubmit={onPlaceSubmit} className="mt-4">
          <input
            type="text"
            id="모임 장소"
            value={place as string}
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              setPlace(event.target.value);
            }}
            placeholder="모임 장소를 작성해주세요"
            className="h-full w-full flex-1 rounded-xl border bg-transparent p-3 text-sm"
          />

          <div className="mb-6 mt-5">
            <span className="text-sm">추천장소</span>
            <ul className="mt-2 flex flex-wrap gap-4">
              {placeDoc.place.slice(0, 4).map(place => (
                <li key={place}>
                  <button type="button" onClick={() => onTagClick(place)}>
                    <Tag text={place} shape="square" color="yellow" />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <SquareBtn type="submit" name="변경하기" className="ml-auto" />
        </form>
      )}
    </Modal>
  );
}
