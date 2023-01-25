import { useRecoilValue } from 'recoil';
import { currentUserState } from 'data/userAtom';
import { authService } from 'fbase';
import { CheckCircle, ModeEditOutline } from '@mui/icons-material';
import { bookFields, existDocObj } from 'util/index';
import { useEffect } from 'react';
import styled from 'styled-components';
import useHandleProfile from 'hooks/useHandleProfile';
import Loading from 'components/atoms/Loading';
import ProfileImage from 'components/atoms/ProfileImage';
import device from 'theme/mediaQueries';
import Guide from 'components/atoms/Guide';
import TextInput from 'components/atoms/inputs/TextInput';

const ProfileInfo = () => {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return !existDocObj(extraUserData) ? (
    <Loading />
  ) : (
    <main>
      <ProfileImage
        editing={editing}
        newUserImgUrl={newUserImgUrl}
        setNewUserImgUrl={setNewUserImgUrl}
      />
      {!editing ? (
        <>
          {!anonymous && (
            <EditBtn type='button' onClick={onToggleEditClick}>
              프로필 수정하기
              <ModeEditOutline />
            </EditBtn>
          )}
          <Guide text='이메일은 변경할 수 없습니다.' />
          <List>
            <Item>
              <Title>이메일</Title>
              <span>{anonymous ? '익명의 방문자' : userData.email}</span>
            </Item>
            <Item>
              <Title>닉네임</Title>
              <span>{anonymous ? '익명의 방문자' : userData.displayName}</span>
            </Item>
            <Item>
              <Title>좋아하는 분야</Title>
              <FavFieldList>
                {anonymous
                  ? '익명의 방문자'
                  : extraUserData?.favoriteBookField?.map((item) => (
                      <FavFieldItem key={item.id}>{item.name}</FavFieldItem>
                    ))}
              </FavFieldList>
            </Item>
          </List>
        </>
      ) : (
        <Form onSubmit={onProfileSubmit}>
          <EditBtn type='submit'>
            수정완료
            <CheckCircle />
          </EditBtn>
          <List>
            <Item>
              <Title>이메일</Title>
              <span>{userData.email}</span>
            </Item>
            <Item>
              <Title>닉네임</Title>
              <TextInput
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
                    $isActive={isSelected(item.id)}
                    onClick={(event) => onHandleFieldClick(item.id, event)}
                  >
                    {item.name}
                  </FieldBtn>
                ))}
                {extraUserData?.favoriteBookField.length === 0 && (
                  <EmptySign>변경하실 분야를 하나 이상 선택해주세요</EmptySign>
                )}
              </FieldList>
            </Item>
          </List>
        </Form>
      )}
    </main>
  );
};

const EditBtn = styled.button`
  display: flex;
  gap: 4px;
  align-items: center;
  border: 1px solid ${(props) => props.theme.container.blue};
  margin: 20px auto 30px;
  border-radius: 20px;
  padding: 3px 10px;
  background-color: #fff;
  font-size: 16px;
  svg {
    margin-top: 2px;
    width: 16px;
    height: 16px;
    fill: ${(props) => props.theme.text.accent};
  }
`;
const EmptySign = styled.span`
  display: block;
  width: 100%;
  text-align: end;
  color: ${(props) => props.theme.text.accent};
  font-size: 13px;
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
    width: 80%;
  }
`;
const Item = styled.li`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  input {
    width: 75%;
    padding: 8px;
    text-align: end;
  }
`;
const Title = styled.h4`
  font-weight: 700;
  font-size: 14px;
  width: 55px;
  @media ${device.tablet} {
    font-size: 16px;
  }
`;
const FieldList = styled.div`
  width: 75%;
  display: flex;
  justify-content: flex-end;
  flex-wrap: wrap;
  background-color: #fff;
  border: 1px solid ${(props) => props.theme.text.lightGray};
  border-radius: 10px;
  padding: 10px 5px;
  gap: 10px 8px;
`;
const FieldBtn = styled.button<{ $isActive?: boolean }>`
  cursor: pointer;
  padding: 3px 8px;
  font-size: 16px;
  border-radius: 30px;
  border: 1px solid ${(props) => props.theme.text.lightBlue};
  background-color: ${(props) =>
    props.$isActive
      ? props.theme.container.yellow
      : props.theme.container.default};
  color: ${(props) =>
    props.$isActive ? props.theme.text.lightBlue : props.theme.text.default};
`;
const FavFieldList = styled(FieldList)`
  background-color: transparent;
  border: none;
  padding: 0;
`;
const FavFieldItem = styled(FieldBtn)`
  cursor: none;
  background-color: ${(props) => props.theme.container.lightBlue};
`;

export default ProfileInfo;
