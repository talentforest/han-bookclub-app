import { useState } from 'react';

export interface BookFieldType {
  id: number;
  name: string;
}

interface PropsType {
  bookFieldName: string;
  checkedBoxHandler: (bookFields: BookFieldType, checked: boolean) => void;
  bookFields: BookFieldType;
}

const BookField = ({
  bookFieldName,
  checkedBoxHandler,
  bookFields,
}: PropsType) => {
  const [isChecked, setIsChecked] = useState(false);

  const checkHandler = async (event: React.FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: { checked },
    } = event;

    setIsChecked((prev) => !prev);
    checkedBoxHandler(bookFields, checked);
  };

  return (
    <div>
      <label htmlFor={bookFieldName}>{bookFieldName}</label>
      <input
        id={bookFieldName}
        type='checkbox'
        name='bookField'
        checked={isChecked}
        onChange={(event) => {
          checkHandler(event);
        }}
      />
    </div>
  );
};

export default BookField;
