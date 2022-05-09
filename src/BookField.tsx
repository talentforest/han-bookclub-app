import { useState } from "react";

interface PropsType {
  bookFieldName: string;
  checkedBoxHandler: (fieldName: string, checked: boolean) => void;
}

const BookField = ({ bookFieldName, checkedBoxHandler }: PropsType) => {
  const [isChecked, setIsChecked] = useState(false);

  const checkHandler = async (event: React.FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: { checked },
    } = event;

    setIsChecked((prev) => !prev);
    checkedBoxHandler(bookFieldName, checked);
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
