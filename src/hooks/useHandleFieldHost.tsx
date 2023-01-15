import { bookFieldsState } from 'data/documentsAtom';
import { usersState } from 'data/userAtom';
import { dbService } from 'fbase';
import { doc, updateDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { thisYear } from 'util/index';
import { BOOK_FIELD } from 'util/index';
import useAlertAskJoin from './useAlertAskJoin';

const useHandleFieldHost = () => {
  const { alertAskJoinMember, anonymous } = useAlertAskJoin('edit');
  const [fieldHost, setFieldHost] = useState([]);
  const [isEditing, setIsEditing] = useState(new Array(12).fill(false));
  const bookFields = useRecoilValue(bookFieldsState);
  const userDocs = useRecoilValue(usersState);
  const fbDoc = doc(dbService, BOOK_FIELD, `${thisYear}`);

  useEffect(() => {
    setFieldHost(bookFields.bookField);
  }, [bookFields]);

  const allMembers = [
    ...userDocs,
    { id: 'no_host', displayName: '발제자 없음' },
  ];

  const onSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
    idx: number
  ) => {
    event.preventDefault();
    await updateDoc(fbDoc, { bookField: fieldHost });
    onEditClick(idx);
  };

  const onChange = (
    event: React.FormEvent<HTMLSelectElement>,
    index: number
  ) => {
    const { value, name } = event.currentTarget;
    const newArray = fieldHost.map((item) => {
      const data =
        name === 'field' ? { ...item, field: value } : { ...item, host: value };
      return item.month === index + 1 ? data : item;
    });
    setFieldHost(newArray);
  };

  const onEditClick = (idx: number) => {
    if (anonymous) return alertAskJoinMember();
    const editedArr = isEditing.map((editItem, index) =>
      index === idx ? !editItem : editItem
    );
    setIsEditing(editedArr);
  };

  return {
    isEditing,
    fieldHost,
    allMembers,
    onSubmit,
    onChange,
    onEditClick,
  };
};

export default useHandleFieldHost;
