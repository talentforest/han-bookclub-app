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
  const [fieldHosts, setFieldHosts] = useRecoilState(fieldHostState);
  const [allUserDocs, setAllUserDocs] = useRecoilState(allUsersState);
  const [isEditing, setIsEditing] = useState(new Array(12).fill(false));
  const [detailItems, setDetailItems] = useState(new Array(12).fill(false));

  const fbDoc = doc(dbService, BOOK_FIELD_HOST, `${thisYear}`);
  const { alertAskJoinMember, anonymous } = useAlertAskJoin('edit');

  useEffect(() => {
    if (allUserDocs.length === 0) {
      getCollection(USER_DATA, setAllUserDocs);
    }
    setFieldHosts(fieldHostDoc.info);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fieldHostDoc, fieldHosts]);

  const allMembers = [
    ...allUserDocs,
    { id: 'no_host', displayName: '발제자 없음' },
  ];

  const onSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
    idx: number
  ) => {
    event.preventDefault();
    await updateDoc(fbDoc, { info: fieldHosts });
    onEditClick(idx);
  };

  const onChange = (
    event: React.FormEvent<HTMLSelectElement>,
    index: number
  ) => {
    const { value, name } = event.currentTarget;
    const newArray = fieldHosts.map((item) => {
      const data =
        name === 'field' ? { ...item, field: value } : { ...item, host: value };
      return item.month === index + 1 ? data : item;
    });
    setFieldHosts(newArray);
  };

  const onEditClick = (idx: number) => {
    if (anonymous) return alertAskJoinMember();
    const editedArr = isEditing.map((editItem, index) =>
      index === idx ? !editItem : editItem
    );
    setIsEditing(editedArr);
  };

  const onDetailClick = (idx: number) => {
    const clickedArr = detailItems.map((item, index) =>
      index === idx ? !item : item
    );
    setDetailItems(clickedArr);
  };

  return {
    isEditing,
    fieldHosts,
    allMembers,
    onSubmit,
    onChange,
    onEditClick,
    detailItems,
    onDetailClick,
  };
};

export default useHandleFieldHost;
