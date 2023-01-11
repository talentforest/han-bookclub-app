import { useState } from 'react';
import { getFbRoute, cutLetter, getLocalDate } from 'util/index';
import { ExpandCircleDown } from '@mui/icons-material';
import { HTMLContent } from './RecordBox';
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
import Subtitle from 'components/atoms/Subtitle';

interface IHostReviewBoxProps {
  review: IDocument;
  yearMonthId: string;
}

const HostReviewBox = ({ review, yearMonthId }: IHostReviewBoxProps) => {
  const [openModal, setOpenModal] = useState(false);
  const [editing, setEditing] = useState(false);
  const [editedText, setEditedText] = useState(review.text);
  const { alertAskJoinMember, anonymous } = useAlertAskJoin('see');

  const collectionName = getFbRoute(yearMonthId).HOST_REVIEW;
  const { onDeleteClick } = useDeleteDoc({ docId: review.id, collectionName });
  const { showingGuide, onEditedSubmit } = useEditDoc({
    docId: review.id,
    editedText,
    setEditedText,
    setEditing,
    collectionName,
  });

  const handleModal = () => {
    if (anonymous) return alertAskJoinMember();
    if (editing) return alert('아직 수정을 완료하지 않았습니다.');
    setOpenModal((prev) => !prev);
  };

  return (
    <>
      <HostReview>
        {editing ? (
          <QuillEditor
            text={cutLetter(review.text, 210)}
            setText={setEditedText}
          />
        ) : (
          <HTMLContent
            dangerouslySetInnerHTML={{ __html: cutLetter(editedText, 200) }}
          />
        )}
        <Footer>
          <ShareBtn
            title='새로운 발제자의 기록이 등록되었어요~🚀'
            description='이번달 발제자의 기록을 한번 보러 가볼까요?🤩'
            path='bookclub'
          />
          <HandleBtn handleClick={handleModal}>
            <span>모임 정리 더보기</span>
            <ExpandCircleDown />
          </HandleBtn>
        </Footer>
      </HostReview>
      {openModal && (
        <>
          <Overlay onModalClick={handleModal} />
          <ReviewModal
            as={editing ? 'form' : 'div'}
            $editing={editing}
            onSubmit={onEditedSubmit}
          >
            <Subtitle title='발제자의 기록' />
            <Header>
              <UsernameBox creatorId={review.creatorId} />
              <TimeStamp>{getLocalDate(review.createdAt)}</TimeStamp>
            </Header>
            {!editing ? (
              <>
                <HTMLContent dangerouslySetInnerHTML={{ __html: editedText }} />
                <EditDeleteBox
                  creatorId={review.creatorId}
                  setEditing={setEditing}
                  onDeleteClick={onDeleteClick}
                />
              </>
            ) : (
              <>
                <QuillEditor text={editedText} setText={setEditedText} />
                <AtLeastOneLetterGuideEditBtn showingGuide={showingGuide} />
              </>
            )}
          </ReviewModal>
        </>
      )}
    </>
  );
};

const HostReview = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 200px;
  padding: 15px;
  border-radius: 10px;
  box-shadow: ${(props) => props.theme.boxShadow};
  background-color: ${(props) => props.theme.container.default};
  margin-bottom: 50px;
  pre {
    margin-bottom: 10px;
    a {
      color: blue;
    }
  }
`;
const Header = styled.div`
  margin-bottom: 5px;
  display: flex;
  justify-content: space-between;
`;
const Footer = styled.div`
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
`;
const TimeStamp = styled.span`
  font-size: 14px;
  align-self: end;
`;

export default HostReviewBox;
