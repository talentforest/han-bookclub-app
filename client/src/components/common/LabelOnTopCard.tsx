import { useState } from 'react';

import { useLocation } from 'react-router-dom';

import { ISchedule } from 'data/bookClubAtom';

import { FiEdit3 } from 'react-icons/fi';

import MeetingInfoModal from 'components/bookClub/MeetingInfoModal';
import UserName from 'components/common/user/UserName';

interface Props {
  label: string;
  content: string[] | string;
  meeting?: ISchedule;
}

export default function LabelOnTopCard({ label, content, meeting }: Props) {
  const [openModal, setOpenModal] = useState(false);

  const onEditClick = () => setOpenModal(prev => !prev);

  const { pathname } = useLocation();

  return (
    <>
      <div className="relative flex h-full items-center gap-2 overflow-hidden rounded-xl border bg-white px-4 shadow-card max-sm:p-2 max-sm:px-4">
        <h4 className="min-w-14 text-gray2">{label}</h4>

        <div className="flex w-full flex-1 flex-col justify-center py-1">
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
              <span>{content}</span>
            ))}

          {!content && (
            <span className="text-center text-sm text-gray2 max-sm:text-start">
              정보가 아직 없어요
            </span>
          )}
        </div>

        {label !== '발제자' && pathname !== '/' && (
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
