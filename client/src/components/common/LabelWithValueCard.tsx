import {
  FiCalendar,
  FiEdit3,
  FiFileText,
  FiMapPin,
  FiUser,
} from 'react-icons/fi';
import { PiPiggyBankBold } from 'react-icons/pi';

import { useHandleModal } from '@/hooks';

import { formatDate, thisYearMonthId } from '@/utils';

import NewBookClubModal from '@/components/bookClub/NewBookClubModal';
import UserImgName from '@/components/common/user/UserImgName';

interface LabelWithValueCardProps {
  label:
    | '모임장소'
    | '모임시간'
    | '발제자'
    | '진행자'
    | '모임비총합'
    | '추가 발제';
  value: string[] | string;
  editable: boolean;
  titleClassName?: string;
}

export default function LabelWithValueCard({
  label,
  value,
  editable,
  titleClassName,
}: LabelWithValueCardProps) {
  const { showModal } = useHandleModal();

  const icon = {
    모임장소: <FiMapPin className="inline" />,
    모임시간: <FiCalendar className="inline" />,
    발제자: <FiUser className="inline" />,
    진행자: <FiUser className="inline" />,
    모임비총합: <PiPiggyBankBold className="inline" />,
    '추가 발제': <FiFileText className="inline" />,
  };

  const getValue = (label: LabelWithValueCardProps['label']) => {
    if (label === '모임시간')
      return formatDate(value as string, 'yyyy.M.d. a h:mm');

    if (label === '발제자' || label === '진행자')
      return value.includes('no_host') || value.length === 0
        ? '발제자 없음'
        : (value as string[])?.map(host => (
            <UserImgName key={host} userId={host} className="mr-1" />
          ));

    return value;
  };

  const onEditClick = () =>
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
    });

  return (
    <>
      <div className="relative flex h-full items-center gap-x-2 overflow-hidden rounded-card bg-white px-4 py-3 shadow-card max-sm:px-4">
        <h4
          className={`flex min-w-20 items-center gap-0.5 text-gray2 ${titleClassName}`}
        >
          {icon[label]}
          {label}
        </h4>

        {value && (
          <span className="flex gap-x-2 font-medium">{getValue(label)}</span>
        )}

        {!value && <span className="text-gray2">정보가 아직 없어요</span>}

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
    </>
  );
}
