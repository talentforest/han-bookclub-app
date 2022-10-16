import { Container } from "theme/commonStyle";
import { BookFieldType } from "components/login/UserDataInputForm";
import styled from "styled-components";
import NotEditingProfile from "components/appsetting/NotEditingProfile";
import EditingProfile from "components/appsetting/EditingProfile";
import useHandleProfile from "hooks/useHandleProfile";
import Loading from "components/common/Loading";

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

  const checkObj = Object.keys(extraUserData).length;

  return (
    <>
      {checkObj === 0 ? (
        <Loading />
      ) : (
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
      )}
    </>
  );
};

const NewContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default EditProfile;
