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
  isMulti?: boolean;
  data: string | number | boolean | string[];
  label?: Label;
}

export default function TableDataItem({
  isMulti = false,
  data,
  label,
}: TableDataItemProps) {
  const commonTdClassName = 'px-1.5 py-4 text-center text-sm';

  return (
    <>
      {isMulti && (
        <td className={`${commonTdClassName}`}>
          <ul className="flex flex-wrap items-center justify-center gap-3">
            {!!(data as string[])?.length && data ? (
              (data as string[]).map(userId =>
                userId === 'no_host' ? (
                  <span key={userId} className="text-gray2">
                    발제자 없음
                  </span>
                ) : (
                  <UserImgName key={userId} userId={userId as string} />
                ),
              )
            ) : (
              <span className="text-gray2">없음</span>
            )}
          </ul>
        </td>
      )}

      {!isMulti && (
        <>
          {label === '월' && (
            <td
              className={`${commonTdClassName} !text-[15px] ${+thisMonth === data ? 'font-semibold text-blue-700' : 'text-blue-400'}`}
            >
              {data}월
            </td>
          )}

          {(label === '모임정지' || label === '일회불참') && (
            <td className={`${commonTdClassName}`}>
              {data ? (label === '모임정지' ? '🔴' : '🟠') : ''}
            </td>
          )}

          {label !== '월' && label !== '모임정지' && label !== '일회불참' && (
            <td className={`${commonTdClassName}`}>
              {data || <span className="text-gray2">없음</span>}
            </td>
          )}
        </>
      )}
    </>
  );
}
