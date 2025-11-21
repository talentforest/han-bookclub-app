import { AddPrefixToKeys } from 'firebase/firestore';

import { BOOKCLUB_THIS_YEAR } from '@/appConstants';

import { useEditDoc } from '@/hooks';

import { formatDate, thisYear } from '@/utils';

import { EventContent } from '@/types';

import CustomDatePicker from '@/components/common/CustomDatePicker';
import Modal from '@/components/common/Modal';
import SquareBtn from '@/components/common/button/SquareBtn';
import Input from '@/components/common/input/Input';
import Label from '@/components/common/input/Label';

interface EventContentFormProps {
  initialContent: EventContent;
  contents: EventContent[];
}

export default function EventContentFormModal({
  initialContent,
  contents,
}: EventContentFormProps) {
  const { onEditSubmit, setEditedData, editedData } = useEditDoc<
    AddPrefixToKeys<'meeting.eventMonth', { contents: EventContent[] }>
  >({
    collName: BOOKCLUB_THIS_YEAR,
    docId: `${thisYear}-12`,
    dataToUpdate: {
      'meeting.eventMonth.contents': contents,
    },
  });

  const currContent = editedData['meeting.eventMonth.contents'].find(
    ({ id }) => id === initialContent.id,
  );

  console.log(editedData);

  const onCurrContentChange = (newData: Partial<EventContent>) => {
    const contents = editedData['meeting.eventMonth.contents'];

    const updatedContent = { ...currContent, ...newData };

    const newContents = contents.map(content =>
      content.id === updatedContent.id ? updatedContent : content,
    );
    setEditedData({ 'meeting.eventMonth.contents': newContents });
  };

  return (
    <Modal title="이벤트 콘텐츠">
      <form
        className="mb-4 flex flex-col gap-y-2 overflow-scroll"
        onSubmit={onEditSubmit}
      >
        <Input
          value={currContent?.title || ''}
          onChange={e => onCurrContentChange({ title: e.target.value })}
          label="콘텐츠 제목"
          placeholder="콘텐츠 제목을 작성해주세요."
        />

        <div>
          <Label text="상세 내용" />
          <textarea
            id="상세 내용"
            placeholder="콘텐츠에 대한 상세 내용을 작성해주세요."
            value={currContent?.detail}
            onChange={e => onCurrContentChange({ detail: e.target.value })}
            className="min-h-40 w-full resize-none rounded-xl border border-gray1 bg-white p-2.5 outline-none"
          />
        </div>

        <Input
          value={currContent?.reward || ''}
          onChange={e => onCurrContentChange({ reward: e.target.value })}
          label="우승상품"
          placeholder="우승상품이 있다면 작성해주세요."
          iconName="FaMedal"
        />

        <CustomDatePicker
          id="제출기한"
          label="제출기한"
          placeholderText="정해진 제출기한이 없습니다."
          selectsEnd
          selected={
            currContent?.deadline ? new Date(currContent?.deadline) : null
          }
          dateFormat="MM월 dd일"
          onChange={(date: Date) =>
            onCurrContentChange({ deadline: formatDate(date, 'yyyy-MM-dd') })
          }
          resetDate={() => onCurrContentChange({ deadline: null })}
        />

        <SquareBtn
          type="submit"
          name="변경하기"
          className="ml-auto"
          size="md"
        />
      </form>
    </Modal>
  );
}
