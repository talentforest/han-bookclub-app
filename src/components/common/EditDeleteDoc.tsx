import { Delete, Edit } from "@mui/icons-material";
import { EditDeleteIcon } from "components/common/SubjectBox";
import { currentUserState } from "data/userAtom";
import { useRecoilValue } from "recoil";

interface PropsType {
  creatorId: string;
  toggleEditing: () => void;
  onDeleteClick: () => void;
}

const EditDeleteDoc = ({
  creatorId,
  toggleEditing,
  onDeleteClick,
}: PropsType) => {
  const userData = useRecoilValue(currentUserState);
  return (
    <>
      {userData.uid === creatorId && (
        <EditDeleteIcon>
          <Edit role="button" onClick={toggleEditing} />
          <Delete role="button" onClick={onDeleteClick} />
        </EditDeleteIcon>
      )}
    </>
  );
};

export default EditDeleteDoc;
