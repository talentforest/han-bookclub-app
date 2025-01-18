import { useState } from 'react';

import { BookField } from 'appConstants';

interface PropsType {
  bookFieldName: string;
  checkedBoxHandler: (bookFields: BookField, checked: boolean) => void;
  bookFields: BookField;
}

const BookFieldCheckBox = ({
  bookFieldName,
  checkedBoxHandler,
  bookFields,
}: PropsType) => {
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
      <label htmlFor={bookFieldName}>{bookFieldName}</label>
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
