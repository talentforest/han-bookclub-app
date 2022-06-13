import { Container } from "theme/commonStyle";
import { useEffect } from "react";
import { BookFieldType } from "components/loginForm/UserDataInputForm";
import styled from "styled-components";
import NotEditingProfile from "components/editProfile/NotEditingProfile";
import EditingProfile from "components/editProfile/EditingProfile";
import ProfileImage from "components/common/ProfileImage";
import BackButtonHeader from "components/common/BackButtonHeader";
import useHandleProfile from "hooks/useHandleProfile";

export interface extraUserData {
  name: string;
  favoriteBookField: BookFieldType[];
  email: string;
  displayName: string;
  photoUrl: string;
}

const EditProfile = () => {
  const {
    editing,
    setEditing,
    getUserData,
    extraUserData,
    profileImgUrl,
    setProfileImgUrl,
    newDisplayName,
    setNewDisplayName,
    onHandleClick,
    onSubmit,
  } = useHandleProfile();

  useEffect(() => {
    getUserData();

    return () => {
      getUserData();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <BackButtonHeader title="프로필 정보" />
      <NewContainer>
        {editing ? (
          <Form onSubmit={onSubmit}>
            <ProfileImage
              profileImgUrl={profileImgUrl}
              setProfileImgUrl={setProfileImgUrl}
            />
            <EditingProfile
              extraUserData={extraUserData}
              newDisplayName={newDisplayName}
              setNewDisplayName={setNewDisplayName}
              onHandleClick={onHandleClick}
            />
          </Form>
        ) : (
          <NotEditingProfile
            setEditing={setEditing}
            extraUserData={extraUserData}
          />
        )}
      </NewContainer>
    </>
  );
};

const NewContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  align-items: center;
  > div {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 140px;
    width: 140px;
    margin-top: 10px;
    > img {
      object-fit: cover;
      width: 120px;
      height: 120px;
      border-radius: 50%;
      background-color: ${(props) => props.theme.container.green};
    }
  }
`;

const Form = styled.form`
  width: 100%;
`;

export default EditProfile;
