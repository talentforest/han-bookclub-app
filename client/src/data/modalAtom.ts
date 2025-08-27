import { ReactNode } from 'react';

import { v4 } from 'uuid';

import { atom } from 'recoil';

type Modal = {
  key: string;
  isOpen: boolean;
  element: () => ReactNode;
  showDim?: boolean;
  dimClickable?: boolean;
};

export const modalListState = atom<Modal[]>({
  key: `modalList/${v4()}`,
  default: [],
});
