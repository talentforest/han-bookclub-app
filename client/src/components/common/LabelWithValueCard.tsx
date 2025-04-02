import { useState } from 'react';

import { FiEdit3 } from 'react-icons/fi';
import { formatDate } from 'utils';

import MeetingInfoModal from 'components/bookClub/MeetingInfoModal';
import UserName from 'components/common/user/UserName';

interface Props {
  label: string;
  value: string[] | string;
  editable: boolean;
}

export default function LabelWithValueCard({ label, value, editable }: Props) {
  const [openModal, setOpenModal] = useState(false);

  const onEditClick = () => setOpenModal(prev => !prev);

  return (
    <>
      <div className="relative flex h-full items-center gap-2 overflow-hidden rounded-card bg-white px-4 shadow-card max-sm:p-2 max-sm:px-4">
        <h4 className="min-w-14 tracking-tight text-gray2">{label}</h4>

        <div className="flex w-full flex-1 flex-col justify-center py-1">
          {value && (
            <>
              {typeof value !== 'string' &&
                value?.map(host => <UserName key={host} userId={host} tag />)}

              {typeof value === 'string' && value && (
                <span className="tracking-tight">
                  {label === '모임시간'
                    ? formatDate(value, 'yyyy.MM.dd a h시 mm분')
                    : value}
                </span>
              )}
            </>
          )}

          {!value && (
            <span className="text-center text-sm text-gray2 max-sm:text-start">
              정보가 아직 없어요
            </span>
          )}
        </div>

        {editable && (
          <button
            type="button"
            onClick={onEditClick}
            className="absolute bottom-0 right-0 p-3"
          >
            <FiEdit3 stroke="#aaa" size={16} />
          </button>
        )}
      </div>

      {openModal && editable && typeof value === 'string' && (
        <MeetingInfoModal
          title={label}
          value={label === '모임시간' ? { time: value } : { place: value }}
          setIsEditing={setOpenModal}
        />
      )}
    </>
  );
}
