import { Container } from "theme/commonStyle";
import { BookFieldType } from "components/loginForm/UserDataInputForm";
import styled from "styled-components";
import NotEditingProfile from "components/editProfile/NotEditingProfile";
import EditingProfile from "components/editProfile/EditingProfile";
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
    extraUserData,
    profileImgUrl,
    setProfileImgUrl,
    newDisplayName,
    setNewDisplayName,
    onHandleClick,
    onProfileSubmit,
  } = useHandleProfile();

  return (
    <>
      <BackButtonHeader title="프로필 정보" />
      <NewContainer>
        {editing ? (
          <EditingProfile
            onProfileSubmit={onProfileSubmit}
            profileImgUrl={profileImgUrl}
            setProfileImgUrl={setProfileImgUrl}
            extraUserData={extraUserData}
            newDisplayName={newDisplayName}
            setNewDisplayName={setNewDisplayName}
            onHandleClick={onHandleClick}
          />
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
`;

export default EditProfile;
