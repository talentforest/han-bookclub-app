import { BookFieldType } from "components/UserDataInputForm";
import { useState } from "react";

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
        type="checkbox"
        name="bookField"
        checked={isChecked}
        onChange={(event) => {
          checkHandler(event);
        }}
      />
    </div>
  );
};

export default BookField;
