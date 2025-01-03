import UserName from 'components/atoms/user/UserName';

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
        <td className='members'>
          <ul>
            {!!(data as string[])?.length ? (
              (data as string[]).map((item) => (
                <UserName
                  key={item}
                  userId={item as string}
                  tag
                  fontSize={13}
                />
              ))
            ) : (
              <span className='no_info'>없음</span>
            )}
          </ul>
        </td>
      ) : label === '월' ? (
        <td className='month'>{data}월</td>
      ) : label === '모임정지' || label === '일회불참' ? (
        <td className={data ? 'absence' : 'attendance'}>
          {data ? label === '모임정지' ? '🔴' : '🟠' : <></>}
        </td>
      ) : (
        <td>{data}</td>
      )}
    </>
  );
}
