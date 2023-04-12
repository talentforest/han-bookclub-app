import { useState } from 'react';
import { getFbRoute, cutLetter, getLocalDate } from 'util/index';
import { ExpandCircleDown } from '@mui/icons-material';
import { ScrollContent } from './RecordBox';
import { IDocument } from 'data/documentsAtom';
import { Modal } from './bookclubthismonth/SubjectCreateModal';
import useDeleteDoc from 'hooks/handleFbDoc/useDeleteDoc';
import useEditDoc from 'hooks/handleFbDoc/useEditDoc';
import UsernameBox from './UsernameBox';
import Overlay from '../atoms/Overlay';
import QuillEditor from '../atoms/QuillEditor';
import styled from 'styled-components';
import ShareBtn from '../atoms/buttons/ShareBtn';
import HandleBtn from '../atoms/buttons/HandleBtn';
import AtLeastOneLetterGuideEditBtn from 'components/atoms/buttons/AtLeastOneLetterGuideEditBtn';
import EditDeleteBox from './EditDeleteBox';
import useAlertAskJoin from 'hooks/useAlertAskJoin';
import RecordFooter from 'components/atoms/RecordFooter';

interface IHostReviewBoxProps {
  hostReview: IDocument;
  yearMonthId: string;
}

const HostReviewBox = ({ hostReview, yearMonthId }: IHostReviewBoxProps) => {
  const [openModal, setOpenModal] = useState(false);
  const [editing, setEditing] = useState(false);
  const [editedText, setEditedText] = useState(hostReview.text);

  const collName = getFbRoute(yearMonthId).HOST_REVIEW;
  const { id, creatorId, createdAt } = hostReview;
  const { alertAskJoinMember, anonymous } = useAlertAskJoin('see');
  const { onDeleteClick } = useDeleteDoc({ docId: id, collName });
  const { showingGuide, onEditedSubmit } = useEditDoc({
    docId: id,
    editedText,
    setEditedText,
    setEditing,
    collName,
  });

  const handleModal = () => {
    if (anonymous) return alertAskJoinMember();
    if (editing) return alert('아직 수정을 완료하지 않았습니다.');
    setOpenModal((prev) => !prev);
  };

  return (
    <>
      <CuttedHostReviewBox>
        <ScrollContent
          dangerouslySetInnerHTML={{ __html: cutLetter(editedText, 280) }}
        />
        <BtnFooter>
          <ShareBtn
            title='새로운 발제자의 정리 기록이 등록되었어요~🚀'
            description='이번달 발제자의 정리 기록을 한번 보러 가볼까요?🤩'
            path='bookclub'
          />
          <HandleBtn handleClick={handleModal}>
            <span>모임 정리 더보기</span>
            <ExpandCircleDown />
          </HandleBtn>
        </BtnFooter>
      </CuttedHostReviewBox>
      {openModal && (
        <>
          <Overlay onModalClick={handleModal} />
          <ReviewModal
            as={editing ? 'form' : 'div'}
            $editing={editing}
            onSubmit={onEditedSubmit}
          >
            <Header>
              <UsernameBox creatorId={creatorId} />
              <TimeStamp>{getLocalDate(createdAt)}</TimeStamp>
              <EditDeleteBox
                creatorId={creatorId}
                setEditing={setEditing}
                onDeleteClick={onDeleteClick}
              />
            </Header>
            {editing ? (
              <>
                <QuillEditor
                  placeholder='발제자의 정리 기록을 수정해주세요.'
                  text={editedText}
                  setText={setEditedText}
                />
                <AtLeastOneLetterGuideEditBtn showingGuide={showingGuide} />
              </>
            ) : (
              <>
                <ScrollContent
                  dangerouslySetInnerHTML={{ __html: editedText }}
                />
                <RecordFooter record={hostReview} collName={collName} />
              </>
            )}
          </ReviewModal>
        </>
      )}
    </>
  );
};

const CuttedHostReviewBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 200px;
  padding: 15px;
  border-radius: 10px;
  box-shadow: ${(props) => props.theme.boxShadow};
  background-color: ${(props) => props.theme.container.default};
  margin: 10px 0 50px;
  pre {
    margin-bottom: 10px;
    a {
      color: blue;
    }
  }
`;
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  position: relative;
`;
const BtnFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  button {
    width: fit-content;
  }
`;
const ReviewModal = styled(Modal)<{ $editing: boolean }>`
  align-items: flex-start;
  background-color: ${(props) =>
    props.$editing
      ? props.theme.text.lightGray
      : props.theme.container.default};
  padding: 15px;
  height: 75vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 10px;
`;
const TimeStamp = styled.span`
  font-size: 14px;
  flex: 1;
  margin-right: 3px;
  text-align: end;
`;

export default HostReviewBox;
