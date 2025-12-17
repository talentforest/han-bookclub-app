import { FiPaperclip } from 'react-icons/fi';

import { useHandleModal } from '@/hooks';

import { thisMonth } from '@/utils';

import Modal from '@/components/common/Modal';
import UserImgName from '@/components/common/user/UserImgName';

type LabelColor = 'yellow' | 'lightBlue' | 'darkBlue';

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
  color?: LabelColor;
  detail?: string;
}

export default function TableDataItem({
  isMulti = false,
  data,
  label,
  color,
  detail,
}: TableDataItemProps) {
  const commonTdClassName = 'px-1.5 py-4 text-center text-sm ';

  const colorStyle = {
    bold: {
      darkBlue: 'text-blue2',
      lightBlue: 'text-blue2',
      yellow: 'text-yellow-600',
    },
    regular: {
      darkBlue: 'text-blue2',
      lightBlue: 'text-blue3',
      yellow: 'text-yellow-500',
    },
  };

  const { showModal } = useHandleModal();

  const toggleModal = () => {
    showModal({
      element: (
        <Modal className="!min-h-60" title={`${data} 상세내용 보기`}>
          <textarea value={detail} readOnly className="min-h-40 resize-none" />
        </Modal>
      ),
    });
  };

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
              className={`${commonTdClassName} !text-[15px] ${+thisMonth === data ? `font-semibold ${colorStyle.bold[color]}` : `${colorStyle.regular[color]}`}`}
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
            <td
              className={`${commonTdClassName} flex items-center justify-center text-text`}
            >
              {data || <span className="text-gray2">없음</span>}
              {detail && (
                <button
                  type="button"
                  className="ml-1 text-blue2"
                  onClick={toggleModal}
                >
                  <FiPaperclip />
                </button>
              )}
            </td>
          )}
        </>
      )}
    </>
  );
}
