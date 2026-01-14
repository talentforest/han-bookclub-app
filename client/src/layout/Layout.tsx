import { Fragment, ReactNode } from 'react';

import { Outlet } from 'react-router-dom';

import { useRecoilValue } from 'recoil';

import { modalListState } from '@/data/modalAtom';

import { useHandleModal } from '@/hooks';

import AppNavigation from '@/layout/AppNavigation';

import ScrollToTop from '@/components/common/ScrollToTop';

interface LayoutProps {
  children?: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const modalList = useRecoilValue(modalListState);

  const { hideModal } = useHandleModal();

  return (
    <>
      <ScrollToTop />

      <AppNavigation type="top" />

      <>{children || <Outlet />}</>

      <AppNavigation type="bottom" />

      {modalList.length > 0 &&
        modalList.map(({ key, element, hideDim, dimUnclickable }) => (
          <Fragment key={key || 'modal'}>
            {!hideDim && (
              <div
                role="presentation"
                className={`fixed inset-0 z-10 size-full ${!dimUnclickable ? 'cursor-pointer' : 'cursor-default'} bg-black opacity-60`}
                onClick={key ? () => hideModal(key) : () => hideModal()}
              />
            )}
            {element}
          </Fragment>
        ))}
    </>
  );
}
