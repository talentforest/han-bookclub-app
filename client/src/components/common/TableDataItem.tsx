import UserName from 'components/common/user/UserName';

export type Label =
  | '월'
  | '독서분야'
  | '발제자'
  | '일회불참멤버'
  | '모임정지멤버'
  | '일회불참'
  | '모임정지';

interface Props {
  data: string | number | boolean | string[];
  isMulti?: boolean;
  label?: Label;
}

export default function TableDataItem({ isMulti = false, data, label }: Props) {
  return (
    <>
      {isMulti ? (
        <td className="py-3 text-center text-[15px]">
          <ul className="flex flex-wrap items-center justify-center gap-2">
            {!!(data as string[])?.length ? (
              (data as string[]).map(item =>
                item === 'no_host' ? (
                  <span key={item} className="text-gray2">
                    발제자 없음
                  </span>
                ) : (
                  <UserName key={item} userId={item as string} tag />
                ),
              )
            ) : (
              <span className="text-sm text-gray2">없음</span>
            )}
          </ul>
        </td>
      ) : label === '월' ? (
        <td className="py-3 text-center text-[15px] text-gray2">{data}월</td>
      ) : label === '모임정지' || label === '일회불참' ? (
        <td
          className={`py-3 text-center text-[15px] ${data ? 'absence' : 'attendance'} `}
        >
          {data ? label === '모임정지' ? '🔴' : '🟠' : <></>}
        </td>
      ) : (
        <td className="py-3 text-center">
          {data || <span className="text-sm text-gray2">없음</span>}
        </td>
      )}
    </>
  );
}
