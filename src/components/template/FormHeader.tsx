import EditDeleteButton from "components/common/EditDeleteButton";
import UserInfoBox from "components/common/UserInfoBox";
import styled from "styled-components";

interface IFormHeaderProps {
  creatorId: string;
  editing: boolean;
  showingGuide: boolean;
  onDeleteClick: () => void;
  toggleEditing: () => void;
}

const FormHeader = ({
  creatorId,
  editing,
  showingGuide,
  onDeleteClick,
  toggleEditing,
}: IFormHeaderProps) => {
  return (
    <Header>
      <UserInfoBox creatorId={creatorId} />
      <EditDeleteButton
        editing={editing}
        showingGuide={showingGuide}
        creatorId={creatorId}
        onDeleteClick={onDeleteClick}
        toggleEditing={toggleEditing}
      />
    </Header>
  );
};

export const Header = styled.header`
  position: relative;
  display: flex;
  justify-content: space-between;
  padding-bottom: 5px;
  margin-bottom: 10px;
`;

export default FormHeader;
