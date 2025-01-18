import { useState } from 'react';

import { useLocation } from 'react-router-dom';

import { ISchedule } from 'data/bookClubAtom';

import { FiEdit3 } from 'react-icons/fi';
import { formatDate, thisMonth } from 'utils';

import MeetingInfoModal from 'components/bookClub/MeetingInfoModal';
import Tag from 'components/common/Tag';
import UserName from 'components/common/user/UserName';

interface Props {
  label: '발제자' | '모임시간' | '모임장소';
  content: string[] | string;
  meeting?: ISchedule;
  color?: 'green' | 'purple' | 'blue' | 'yellow' | 'red';
}

export default function LabelOnTopCard({
  label,
  content,
  meeting,
  color = 'blue',
}: Props) {
  const [openModal, setOpenModal] = useState(false);

  const onEditClick = () => setOpenModal(prev => !prev);

  const { pathname } = useLocation();

  return (
    <>
      <div className="relative flex h-full items-center gap-2 overflow-hidden rounded-xl border bg-white px-4 shadow-card sm:p-2">
        <Tag text={label} color={color} className="py-1 sm:px-3" />

        <div className="flex w-full flex-1 flex-col justify-center">
          {content &&
            (label === '발제자' ? (
              <ul>
                {(content as string[])?.map(host => (
                  <li key={host}>
                    <UserName userId={host} tag />
                  </li>
                ))}
              </ul>
            ) : (
              <span className="sm:text-[15px]">{content}</span>
            ))}

          {!content && (
            <span className="text-center text-sm text-gray2">
              정보가 <br /> 아직 없어요
            </span>
          )}
        </div>

        {label !== '발제자' &&
          pathname !== '/' &&
          thisMonth === formatDate(meeting.time, 'MM') && (
            <button
              type="button"
              onClick={onEditClick}
              className="absolute bottom-0 right-0 p-3"
            >
              <FiEdit3 stroke="#aaa" size={16} />
            </button>
          )}
      </div>

      {openModal && pathname !== '/' && (
        <MeetingInfoModal
          title={`${label}`}
          meeting={meeting}
          setIsEditing={setOpenModal}
        />
      )}
    </>
  );
}
