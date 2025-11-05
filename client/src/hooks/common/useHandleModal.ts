import { useRecoilState } from 'recoil';

import { Modal, modalListState } from '@/data/modalAtom';

export const useHandleModal = () => {
  const [modalList, setModalList] = useRecoilState(modalListState);

  const showModal = (modalProps: Omit<Modal, 'isOpen'>): Promise<void> => {
    return new Promise(resolve => {
      const newModal = { ...modalProps, isOpen: true };
      setModalList(prev => [...prev, newModal]);
      resolve();
    });
  };

  const hideModal = async (key?: string): Promise<void> => {
    if (typeof key === 'string' && key) {
      const newModalList = modalList.map(modal =>
        modal.key === key ? { ...modal, isOpen: false } : modal,
      );
      setModalList(newModalList);
    } else {
      setModalList([]);
    }
  };

  return {
    modalList,
    showModal,
    hideModal,
  };
};
