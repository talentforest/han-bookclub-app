import { Delete, Edit } from '@mui/icons-material';
import { currentUserState } from 'data/userAtom';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import device from 'theme/mediaQueries';

interface IEditDeleteBoxProps {
  creatorId: string;
  setEditing: (prev: any) => void;
  onDeleteClick: () => void;
}

const EditDeleteBox = ({
  creatorId,
  setEditing,
  onDeleteClick,
}: IEditDeleteBoxProps) => {
  const userData = useRecoilValue(currentUserState);

  const toggleEditing = () => {
    setEditing((prev: boolean) => !prev);
  };

  return (
    userData.uid === creatorId && (
      <EditDelete>
        <Edit role='button' onClick={toggleEditing} />
        <Delete role='button' onClick={onDeleteClick} />
      </EditDelete>
    )
  );
};

const EditDelete = styled.div`
  align-self: flex-end;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  svg {
    width: 18px;
    height: 18px;
    margin-left: 12px;
    cursor: pointer;
  }
  @media ${device.tablet} {
    svg {
      width: 20px;
      height: 20px;
    }
  }
`;

export default EditDeleteBox;
