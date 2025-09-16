import { useState } from 'react';

import { ClubBookField } from '@/types';

import Label from '@/components/common/input/Label';

interface BookFieldCheckBoxProps {
  bookFieldName: string;
  checkedBoxHandler: (bookFields: ClubBookField, checked: boolean) => void;
  bookFields: ClubBookField;
}

const BookFieldCheckBox = ({
  bookFieldName,
  checkedBoxHandler,
  bookFields,
}: BookFieldCheckBoxProps) => {
  const [isChecked, setIsChecked] = useState(false);

  const checkHandler = async (event: React.FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: { checked },
    } = event;

    setIsChecked(prev => !prev);
    checkedBoxHandler(bookFields, checked);
  };

  return (
    <div>
      <Label text={bookFieldName} />
      <input
        id={bookFieldName}
        type="checkbox"
        name="bookFields"
        checked={isChecked}
        onChange={checkHandler}
      />
    </div>
  );
};

export default BookFieldCheckBox;
