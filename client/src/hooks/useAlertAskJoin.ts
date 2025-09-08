import { FormEvent } from 'react';

import { useNavigate } from 'react-router-dom';

import { authService } from '@/fbase';

import { useHandleModal } from '@/hooks/useHandleModal';

import { PostPermission } from '@/types';

export const useAlertAskJoin = (permission: PostPermission) => {
  const navigate = useNavigate();
  const anonymous = authService.currentUser?.isAnonymous;

  const { hideModal } = useHandleModal();

  const setText = () => {
    switch (permission) {
      case 'see':
        return '볼 수 있습니다';
      case 'edit':
        return '수정할 수 있습니다';
      case 'register':
        return '등록할 수 있습니다';
      case 'write':
        return '작성할 수 있습니다';
      default:
        break;
    }
  };

  function alertAskJoinMember() {
    if (authService.currentUser.isAnonymous) {
      const confirm = window.confirm(
        `한페이지 멤버만 ${setText()}. 로그인을 해주세요.`,
      );
      hideModal();
      if (confirm) return navigate('/login');
    }
  }

  const blockLinkAndAlertJoinMember = (event: FormEvent) => {
    if (anonymous) {
      event.preventDefault();
      alertAskJoinMember();
    }
  };

  return { alertAskJoinMember, blockLinkAndAlertJoinMember, anonymous };
};
