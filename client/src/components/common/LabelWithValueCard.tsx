import { FiCalendar, FiEdit3, FiMapPin, FiUser } from 'react-icons/fi';

import { useHandleModal } from '@/hooks';

import { formatDate, thisYearMonthId } from '@/utils';

import NewBookClubModal from '@/components/bookClub/NewBookClubModal';
import UserImgName from '@/components/common/user/UserImgName';

interface LabelWithValueCardProps {
  label: '모임장소' | '모임시간' | '발제자' | '진행자';
  value: string[] | string;
  editable: boolean;
}

export default function LabelWithValueCard({
  label,
  value,
  editable,
}: LabelWithValueCardProps) {
  const { showModal } = useHandleModal();

  const icon = {
    모임장소: <FiMapPin className="inline" />,
    모임시간: <FiCalendar className="inline" />,
    발제자: <FiUser className="inline" />,
    진행자: <FiUser className="inline" />,
  };

  return (
    <>
      <div className="relative flex h-full items-center overflow-hidden rounded-card bg-white px-4 shadow-card max-sm:p-2 max-sm:px-4">
        <h4 className="flex min-w-20 items-center gap-0.5 tracking-tight text-gray2">
          {icon[label]}
          {label}
        </h4>

        <div className="flex w-full flex-1 py-1">
          {value && (
            <>
              {typeof value !== 'string' &&
                (value.includes('no_host') ? (
                  <span>발제자 없음</span>
                ) : (
                  value?.map(host => (
                    <UserImgName key={host} userId={host} className="mr-1" />
                  ))
                ))}

              {typeof value === 'string' && value && (
                <span className="tracking-tight">
                  {label === '모임시간'
                    ? formatDate(value, 'M월 d일 a h:mm')
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
            onClick={() =>
              showModal({
                element: typeof value === 'string' && (
                  <NewBookClubModal
                    title={label}
                    currentValue={
                      label === '모임시간' ? { time: value } : { place: value }
                    }
                    yearMonthId={thisYearMonthId}
                  />
                ),
              })
            }
            className="absolute bottom-0 right-0 p-3"
          >
            <FiEdit3 stroke="#aaa" size={16} />
          </button>
        )}
      </div>
    </>
  );
}
