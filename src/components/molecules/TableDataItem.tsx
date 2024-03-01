import NameTag from 'components/atoms/NameTag';

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
                <NameTag key={item} name={item as string} />
              ))
            ) : (
              <span className='no_info'>없음</span>
            )}
          </ul>
        </td>
      ) : label === '월' ? (
        <td className='month'>{data}월</td>
      ) : label === '모임정지' ? (
        <td className={data ? 'attendance' : 'absence'}>정지</td>
      ) : label === '일회불참' ? (
        <td className={data ? 'attendance' : 'absence'}>불참</td>
      ) : (
        <td>{data}</td>
      )}
    </>
  );
}
