import { getCollection } from 'api/getFbDoc';
import { fieldHostState, fieldHostDocState } from 'data/bookFieldHostAtom';
import { allUsersState } from 'data/userAtom';
import { dbService } from 'fbase';
import { doc, updateDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { thisYear, USER_DATA } from 'util/index';
import { BOOK_FIELD_HOST } from 'util/index';
import useAlertAskJoin from './useAlertAskJoin';

const useHandleFieldHost = () => {
  const fieldHostDoc = useRecoilValue(fieldHostDocState);
  const [fieldHost, setFieldHost] = useRecoilState(fieldHostState);
  const [userDocs, setUserDocs] = useRecoilState(allUsersState);
  const [isEditing, setIsEditing] = useState(new Array(12).fill(false));

  const fbDoc = doc(dbService, BOOK_FIELD_HOST, `${thisYear}`);
  const { alertAskJoinMember, anonymous } = useAlertAskJoin('edit');

  useEffect(() => {
    getCollection(USER_DATA, setUserDocs);
    setFieldHost(fieldHostDoc.info);
  }, [setFieldHost, setUserDocs, fieldHostDoc]);

  const allMembers = [
    ...userDocs,
    { id: 'no_host', displayName: '발제자 없음' },
  ];

  const onSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
    idx: number
  ) => {
    event.preventDefault();
    await updateDoc(fbDoc, { info: fieldHost });
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
