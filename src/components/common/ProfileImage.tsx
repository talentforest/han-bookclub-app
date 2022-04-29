import styled from "styled-components";

const ProfileImage = () => {
  return <ProfileImg />;
};

const ProfileImg = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin: 20px 0;
  background-color: ${(props) => props.theme.container.lightBlue};
`;

export default ProfileImage;
