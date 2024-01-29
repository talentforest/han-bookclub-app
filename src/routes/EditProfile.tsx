import { useRecoilValue } from 'recoil';
import { currentUserState } from 'data/userAtom';
import { authService } from 'fbase';
import { existDocObj } from 'util/index';
import { bookFields } from 'constants/index';
import { useEffect } from 'react';
import { FiCheck, FiEdit2 } from 'react-icons/fi';
import styled from 'styled-components';
import useHandleProfile from 'hooks/useHandleProfile';
import Loading from 'components/atoms/Loading';
import GuideLine from 'components/atoms/GuideLine';
import RefInput from 'components/atoms/input/RefInput';
import MobileHeader from 'layout/mobile/MobileHeader';
import UserImg from 'components/atoms/UserImg';
import device from 'theme/mediaQueries';

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

  return !existDocObj(extraUserData) ? (
    <Loading />
  ) : (
    <>
      <MobileHeader title='프로필 정보' backBtn />
      <main>
        <UserImg
          editing={editing}
          newUserImgUrl={newUserImgUrl}
          setNewUserImgUrl={setNewUserImgUrl}
        />
        {!editing ? (
          <>
            {!anonymous && (
              <EditBtn type='button' onClick={onToggleEditClick}>
                <FiEdit2 fontSize={15} stroke='#aaa' />
                <span>프로필 수정</span>
              </EditBtn>
            )}

            <GuideLine text='이메일은 변경할 수 없습니다.' />

            <List>
              <Item>
                <Title>이메일</Title>
                <span>{userData.email}</span>
              </Item>

              <Item>
                <Title>닉네임</Title>
                <span>{userData.displayName}</span>
              </Item>

              <Item>
                <Title>좋아하는 분야</Title>
                <FavBookFieldList>
                  {extraUserData?.favoriteBookField?.map((item) => (
                    <FavFieldItem key={item.id}>{item.name}</FavFieldItem>
                  ))}
                </FavBookFieldList>
              </Item>
            </List>
          </>
        ) : (
          <Form onSubmit={onProfileSubmit}>
            <EditBtn type='submit'>
              <FiCheck fontSize={15} stroke='#6397ff' />
              <span>수정완료</span>
            </EditBtn>

            <List>
              <Item>
                <Title>이메일</Title>
                <span>{userData.email}</span>
              </Item>

              <Item>
                <Title>닉네임</Title>
                <RefInput
                  onChange={onDisplayNameChange}
                  placeholder='닉네임을 입력해주세요'
                  value={newDisplayName || ''}
                />
              </Item>

              <Item>
                <Title>좋아하는 분야</Title>
                <FieldList>
                  {bookFields.map((item) => (
                    <FieldBtn
                      key={item.id}
                      type='button'
                      name={item.name}
                      $active={isSelected(item.id)}
                      onClick={(event) => onHandleFieldClick(item.id, event)}
                    >
                      {item.name}
                    </FieldBtn>
                  ))}
                  {extraUserData?.favoriteBookField.length === 0 && (
                    <EmptySign>
                      변경하실 분야를 하나 이상 선택해주세요
                    </EmptySign>
                  )}
                </FieldList>
              </Item>
            </List>
          </Form>
        )}
      </main>
    </>
  );
};

const EditBtn = styled.button`
  display: flex;
  gap: 8px;
  align-items: center;
  border: 1px solid ${({ theme }) => theme.text.gray1};
  margin: 20px auto 30px;
  border-radius: 20px;
  padding: 8px 12px;
  background-color: #fff;
  span {
    color: #888;
    font-size: 16px;
    line-height: 1;
    padding-top: 2px;
  }
`;

const EmptySign = styled.span`
  display: block;
  width: 100%;
  text-align: end;
  color: ${({ theme }) => theme.text.blue3};
  font-size: 14px;
  @media ${device.tablet} {
    font-size: 16px;
  }
`;

const Form = styled.form`
  width: 100%;
`;

const List = styled.ul`
  margin-top: 20px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  @media ${device.tablet} {
    width: 100%;
  }
`;

const Item = styled.li`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: start;
  gap: 10px;
  input {
    width: 75%;
    height: 40px;
    padding: 8px;
    text-align: end;
  }
`;

const Title = styled.h4`
  color: ${({ theme }) => theme.text.gray4};
  font-size: 14px;
  width: 55px;
  padding-top: 3px;
  @media ${device.tablet} {
    padding-top: 1px;
    font-size: 16px;
    width: 94px;
  }
`;

const FieldList = styled.div`
  width: 75%;
  display: flex;
  justify-content: flex-end;
  flex-wrap: wrap;
  background-color: #fff;
  border: 1px solid ${({ theme }) => theme.text.gray1};
  border-radius: 10px;
  padding: 10px 5px;
  gap: 10px 8px;
`;

const FieldBtn = styled.button<{ $active?: boolean }>`
  cursor: pointer;
  padding: 7px 10px 4px;
  font-size: 16px;
  border-radius: 30px;
  border: 1px solid ${({ theme }) => theme.text.gray1};
  background-color: ${({ $active, theme }) =>
    $active ? theme.container.purple1 : theme.container.default};
  color: ${({ $active, theme }) =>
    $active ? theme.text.purple : theme.text.gray2};
  box-shadow: ${({ theme }) => theme.boxShadow};
`;

const FavBookFieldList = styled(FieldList)`
  background-color: transparent;
  border: none;
  padding: 0;
`;

const FavFieldItem = styled(FieldBtn)`
  cursor: none;
  padding: 6px 10px 4px;
  background-color: ${({ theme }) => theme.container.purple1};
  color: ${({ theme }) => theme.text.purple};
`;

export default EditProfile;
