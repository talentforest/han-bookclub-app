import { thisMonth } from '@/utils';

import UserImgName from '@/components/common/user/UserImgName';

export type Label =
  | '월'
  | '독서분야'
  | '발제자'
  | '일회불참멤버'
  | '모임정지멤버'
  | '일회불참'
  | '모임정지';

interface TableDataItemProps {
  data: string | number | boolean | string[];
  isMulti?: boolean;
  label?: Label;
}

export default function TableDataItem({
  isMulti = false,
  data,
  label,
}: TableDataItemProps) {
  const className = `py-3.5 text-center text-sm ${data ? 'absence' : 'attendance'}`;

  return (
    <>
      {isMulti && (
        <td className="py-3.5 text-center text-sm">
          <ul className="flex flex-wrap items-center justify-center gap-2">
            {!!(data as string[])?.length && data ? (
              (data as string[]).map(item =>
                item === 'no_host' ? (
                  <span key={item}>발제자 없음</span>
                ) : (
                  <UserImgName key={item} userId={item as string} />
                ),
              )
            ) : (
              <span>없음</span>
            )}
          </ul>
        </td>
      )}

      {!isMulti && (
        <>
          {label === '월' && (
            <td
              className={`py-3.5 text-center ${+thisMonth === data ? 'font-semibold text-black' : 'text-gray2'}`}
            >
              {data}월
            </td>
          )}

          {(label === '모임정지' || label === '일회불참') && (
            <td className={className}>
              {data ? (label === '모임정지' ? '🔴' : '🟠') : ''}
            </td>
          )}

          {label !== '월' && label !== '모임정지' && label !== '일회불참' && (
            <td className="py-3.5 text-center text-sm">
              {data || <span className="text-sm text-gray2">없음</span>}
            </td>
          )}
        </>
      )}
    </>
  );
}
