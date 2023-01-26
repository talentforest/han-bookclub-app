import { Delete, Edit, MoreVert } from '@mui/icons-material';
import { currentUserState } from 'data/userAtom';
import { useState } from 'react';
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
  const [openBtns, setOpenBtns] = useState(false);
  const toggleEditing = () => setEditing((prev: boolean) => !prev);
  const onMoreClick = () => setOpenBtns((prev) => !prev);

  return (
    userData.uid === creatorId && (
      <>
        <MoreVert onClick={onMoreClick} />
        {openBtns && (
          <EditDelete>
            <Edit role='button' onClick={toggleEditing} />
            <Delete role='button' onClick={onDeleteClick} />
          </EditDelete>
        )}
      </>
    )
  );
};

const EditDelete = styled.div`
  position: absolute;
  bottom: -35px;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 12px;
  svg {
    cursor: pointer;
    border-radius: 50%;
    padding: 4px;
    width: 30px;
    height: 30px;
    background-color: ${(props) => props.theme.container.yellow};
    fill: ${(props) => props.theme.text.lightBlue};
    box-shadow: ${(props) => props.theme.boxShadow};
  }
  @media ${device.tablet} {
    svg {
      width: 20px;
      height: 20px;
    }
  }
`;

export default EditDeleteBox;
