import { useEffect } from 'react';

import useHandleProfile from 'hooks/useHandleProfile';

import { currentUserState } from 'data/userAtom';
import { useRecoilValue } from 'recoil';

import { bookFields } from 'appConstants';
import { authService } from 'fbase';
import { FiCheck, FiEdit2 } from 'react-icons/fi';
import { existDocObj } from 'utils';

import MobileHeader from 'layout/mobile/MobileHeader';

import GuideLine from 'components/common/GuideLine';
import Loading from 'components/common/Loading';
import RefInput from 'components/common/input/RefInput';
import UserImg from 'components/common/user/UserImg';

const EditProfile = () => {
  const userData = useRecoilValue(currentUserState);
  const anonymous = authService.currentUser?.isAnonymous;
  const {
    editing,
    onToggleEditClick,
    extraUserData,
    newUserImgUrl,
    setNewUserImgUrl,
    newDisplayName,
    setNewDisplayName,
    onHandleFieldClick,
    onProfileSubmit,
    onDisplayNameChange,
    isSelected,
  } = useHandleProfile();

  useEffect(() => {
    if (!newDisplayName) {
      setNewDisplayName(userData.displayName);
    }
  }, []);

  const profile = [
    {
      name: '이메일',
      data: userData.email,
    },
    {
      name: '닉네임',
      data: userData.displayName,
    },
    {
      name: '좋아하는 분야',
      data: extraUserData?.favoriteBookField?.map(item => (
        <li key={item.id}>{item.name}</li>
      )),
    },
  ];

  return !existDocObj(extraUserData) ? (
    <Loading />
  ) : (
    <>
      <MobileHeader title="프로필 정보" backBtn />
      <main>
        <UserImg
          editing={editing}
          newUserImgUrl={newUserImgUrl}
          setNewUserImgUrl={setNewUserImgUrl}
        />
        {!editing ? (
          <>
            {!anonymous && (
              <button
                type="button"
                onClick={onToggleEditClick}
                className="mx-auto my-4 flex items-center gap-2 rounded-2xl border-gray3 bg-white"
              >
                <FiEdit2 fontSize={14} stroke="#aaa" />
                <span className="text-gray1">프로필 수정</span>
              </button>
            )}

            <GuideLine text="이메일은 변경할 수 없습니다." />

            <ul className="flex-cil mt-5 flex w-full items-center justify-between gap-5">
              {profile.map(({ name, data }) => (
                <li className="" key={name}>
                  <h3>{name}</h3>
                  <span>{data}</span>
                </li>
              ))}
            </ul>
          </>
        ) : (
          <form onSubmit={onProfileSubmit}>
            <button
              type="submit"
              className="mx-auto my-4 flex items-center gap-2 rounded-2xl border-gray3 bg-white"
            >
              <FiCheck fontSize={15} stroke="#6397ff" />
              <span>수정완료</span>
            </button>

            <ul>
              <li>
                <h3>이메일</h3>
                <span>{userData.email}</span>
              </li>

              <li>
                <h3>닉네임</h3>
                <RefInput
                  onChange={onDisplayNameChange}
                  placeholder="닉네임을 입력해주세요"
                  value={newDisplayName || ''}
                />
              </li>

              <li>
                <h3>좋아하는 분야</h3>
                <div>
                  {bookFields.map(({ id, name }) => (
                    <button
                      key={id}
                      type="button"
                      name={name}
                      disabled={isSelected(id)}
                      onClick={event => onHandleFieldClick(id, event)}
                    >
                      {name}
                    </button>
                  ))}
                  {extraUserData?.favoriteBookField.length === 0 && (
                    <span className="block w-full text-end text-sm text-blue1">
                      변경하실 분야를 하나 이상 선택해주세요
                    </span>
                  )}
                </div>
              </li>
            </ul>
          </form>
        )}
      </main>
    </>
  );
};

export default EditProfile;
