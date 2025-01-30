import { useEffect } from 'react';

import useHandleProfile from 'hooks/useHandleProfile';

import { currentUserState } from 'data/userAtom';
import { useRecoilValue } from 'recoil';

import { bookFields } from 'appConstants';
import { existDocObj } from 'utils';

import MobileHeader from 'layout/mobile/MobileHeader';

import Loading from 'components/common/Loading';
import Tag from 'components/common/Tag';
import EditBtn from 'components/common/button/EditBtn';
import SquareBtn from 'components/common/button/SquareBtn';
import RefInput from 'components/common/input/RefInput';
import UserImg from 'components/common/user/UserImg';

const EditProfile = () => {
  const userData = useRecoilValue(currentUserState);

  const {
    isEditing,
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
      data: <span className="w-full">{userData.email}</span>,
      form: <span className="w-full text-gray1">{userData.email}</span>,
    },
    {
      name: '닉네임',
      data: <span>{userData.displayName}</span>,
      form: (
        <RefInput
          onChange={onDisplayNameChange}
          placeholder="닉네임을 입력해주세요"
          value={newDisplayName || ''}
        />
      ),
    },
    {
      name: '좋아하는 분야',
      data: (
        <ul className="flex flex-wrap gap-2">
          {extraUserData?.favoriteBookField?.map(item => (
            <Tag key={item.id} text={item.name} color="green" />
          ))}
        </ul>
      ),
      form: (
        <ul className="flex flex-wrap gap-2">
          {bookFields?.map(({ id, name }) => (
            <button
              key={id}
              type="button"
              name={name}
              onClick={event => onHandleFieldClick(id, event)}
            >
              <Tag
                text={name}
                color={isSelected(id) ? 'purple' : 'lightGray'}
                className="!px-2"
              />
            </button>
          ))}
          {extraUserData?.favoriteBookField?.length === 0 && (
            <span className="block w-full text-end text-sm text-pointCoral">
              변경하실 분야를 하나 이상 선택해주세요
            </span>
          )}
        </ul>
      ),
    },
  ];

  return !existDocObj(extraUserData) ? (
    <Loading />
  ) : (
    <>
      <MobileHeader title="프로필 정보" backBtn>
        <EditBtn onClick={onToggleEditClick} disabled={isEditing} />
      </MobileHeader>

      <main>
        <UserImg
          isEditing={isEditing}
          newUserImgUrl={newUserImgUrl}
          setNewUserImgUrl={setNewUserImgUrl}
        />

        {!isEditing ? (
          <ul className="mt-10 flex w-full flex-col gap-y-5">
            {profile.map(({ name, data }) => (
              <li className="flex gap-6" key={name}>
                <h3 className="min-w-24">{name}</h3>
                {data}
              </li>
            ))}
          </ul>
        ) : (
          <form onSubmit={onProfileSubmit} className="mt-8">
            <ul className="flex flex-col gap-4">
              {profile.map(({ name, form }) => (
                <li className="flex justify-between gap-6" key={name}>
                  <h3 className="min-w-24">{name}</h3>
                  {form}
                </li>
              ))}
            </ul>
            <SquareBtn
              name="수정완료"
              type="submit"
              className="mx-auto mt-12"
            />
          </form>
        )}
      </main>
    </>
  );
};

export default EditProfile;
