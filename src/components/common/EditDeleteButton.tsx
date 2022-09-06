import { Delete, Edit } from "@mui/icons-material";
import { currentUserState } from "data/userAtom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import device from "theme/mediaQueries";

interface PropsType {
  editing: boolean;
  showingGuide: boolean;
  creatorId: string;
  toggleEditing: () => void;
  onDeleteClick: () => void;
}

const EditDeleteButton = ({
  editing,
  showingGuide,
  creatorId,
  toggleEditing,
  onDeleteClick,
}: PropsType) => {
  const userData = useRecoilValue(currentUserState);

  return (
    <>
      {editing ? (
        <>
          {showingGuide ? (
            <>
              <GuideTextBox>
                한 글자 이상 작성해주세요. <div></div>
              </GuideTextBox>
              <DoneBtn type="submit" value="수정완료" eventdone />
            </>
          ) : (
            <DoneBtn type="submit" value="수정완료" />
          )}
        </>
      ) : (
        userData.uid === creatorId && (
          <EditDeleteIcon>
            <Edit role="button" onClick={toggleEditing} />
            <Delete role="button" onClick={onDeleteClick} />
          </EditDeleteIcon>
        )
      )}
    </>
  );
};

export const DoneBtn = styled.input<{ eventdone?: boolean }>`
  border: none;
  background-color: transparent;
  font-size: 12px;
  color: ${(props) => props.theme.text.lightBlue};
  cursor: pointer;
  pointer-events: ${(props) => (props.eventdone ? "none" : "fill")};
  @media ${device.tablet} {
    font-size: 18px;
  }
`;

const GuideTextBox = styled.span`
  position: absolute;
  right: 0px;
  top: 30px;
  font-size: 10px;
  color: ${(props) => props.theme.text.accent};
  background-color: ${(props) => props.theme.container.yellow};
  padding: 2px 4px;
  border-radius: 6px;
  > div {
    width: 8px;
    height: 8px;
    position: absolute;
    top: -4px;
    right: 20px;
    transform: rotate(45deg);
    background-color: ${(props) => props.theme.container.yellow};
  }
`;

const EditDeleteIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  svg {
    width: 18px;
    height: 18px;
    margin-left: 12px;
    cursor: pointer;
  }
  svg:first-child {
    margin-left: 0px;
  }
  @media ${device.tablet} {
    svg {
      width: 20px;
      height: 20px;
    }
  }
`;

export default EditDeleteButton;
