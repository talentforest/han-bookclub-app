import { ReactNode } from 'react';

import { atom } from 'recoil';

export type Modal = {
  isOpen: boolean;
  element: ReactNode;
  key?: string;
  hideDim?: boolean;
  dimUnclickable?: boolean;
};

export const modalListState = atom<Modal[]>({
  key: 'modalList',
  default: [],
});
