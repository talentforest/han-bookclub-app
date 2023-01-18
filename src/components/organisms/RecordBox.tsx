import { useState } from 'react';
import { getLocalDate } from 'util/index';
import { IDocument } from 'data/documentsAtom';
import { useRecoilValue } from 'recoil';
import { categoryState } from 'data/categoryAtom';
import UsernameBox from 'components/organisms/UsernameBox';
import BookImgTitle from 'components/atoms/BookImgTitle';
import useDeleteDoc from 'hooks/handleFbDoc/useDeleteDoc';
import useEditDoc from 'hooks/handleFbDoc/useEditDoc';
import styled from 'styled-components';
import AtLeastOneLetterGuideEditBtn from 'components/atoms/buttons/AtLeastOneLetterGuideEditBtn';
import device from 'theme/mediaQueries';
import QuillEditor from 'components/atoms/QuillEditor';
import EditDeleteBox from './EditDeleteBox';

interface IRecordProps {
  doc: IDocument;
  collectionName: string;
  setShowDetail?: (detail: []) => void;
}

const RecordBox = ({ doc, collectionName, setShowDetail }: IRecordProps) => {
  const category = useRecoilValue(categoryState);
  const [editing, setEditing] = useState(false);
  const [editedText, setEditedText] = useState(doc.text);
  const { onDeleteClick } = useDeleteDoc({ docId: doc.id, collectionName });

  const { showingGuide, onEditedSubmit, onEditedChange } = useEditDoc({
    docId: doc.id,
    editedText,
    setEditedText,
    setEditing,
    collectionName,
  });

  const handleDeleteClick = async () => {
    onDeleteClick();
    if (setShowDetail) {
      setShowDetail([]);
    }
  };

  return (
    <Form as={editing ? 'form' : 'div'} onSubmit={onEditedSubmit}>
      <Header>
        <UsernameBox creatorId={doc.creatorId} />
        <RegisterTime>{getLocalDate(doc.createdAt)}</RegisterTime>
      </Header>
      {category === 'recommends' && (
        <RecommendBookInfo>
          <img src={doc.recommendBookThumbnail} alt='book thumbnail' />
          <div>
            <h4>{doc.recommendBookTitle}</h4>
            <span>{doc.recommendBookAuthor}</span>
            <a href={doc.recommendBookUrl}>상세정보 보러가기</a>
          </div>
        </RecommendBookInfo>
      )}
      {editing ? (
        <>
          {collectionName.includes('subjects') ? (
            <QuillEditor
              placeholder='발제문을 수정해주세요.'
              text={editedText}
              setText={setEditedText}
            />
          ) : (
            <TextArea
              value={editedText}
              placeholder='모임 후기를 수정해주세요.'
              onChange={onEditedChange}
            />
          )}
          <AtLeastOneLetterGuideEditBtn showingGuide={showingGuide} />
        </>
      ) : (
        <>
          {collectionName.includes('subjects') ? (
            <Pre as='div' dangerouslySetInnerHTML={{ __html: editedText }} />
          ) : (
            <Pre>{editedText}</Pre>
          )}
          <EditDeleteBox
            creatorId={doc.creatorId}
            setEditing={setEditing}
            onDeleteClick={handleDeleteClick}
          />
        </>
      )}
      <BookImgTitle thumbnail={doc.thumbnail} title={doc.title} smSize />
    </Form>
  );
};

const RecommendBookInfo = styled.div`
  box-shadow: 1px 2px 4px rgba(0, 0, 0, 0.2);
  margin-bottom: 10px;
  border-radius: 10px;
  background-color: #fff;
  width: 100%;
  display: flex;
  align-items: center;
  padding: 10px;
  img {
    width: auto;
    height: 50px;
    margin-right: 10px;
    box-shadow: 1px 2px 4px rgba(0, 0, 0, 0.2);
    border-radius: 3px;
  }
  div {
    display: flex;
    flex-direction: column;
    gap: 1px;
    font-size: 12px;
    h4 {
      font-size: 14px;
    }
    span {
      color: ${(props) => props.theme.text.gray};
    }
    a {
      color: ${(props) => props.theme.text.accent};
    }
  }
`;
const Form = styled.form`
  padding: 15px 0;
  font-size: 14px;
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid #ccc;
  &:last-child {
    border-bottom: none;
  }
  @media ${device.tablet} {
    padding: 20px 10px 25px;
    font-size: 16px;
  }
`;
const Pre = styled.pre`
  white-space: pre-wrap;
  word-wrap: break-word;
  line-height: 1.6;
  font-size: 16px;
  min-height: 100px;
  margin-bottom: 10px;
  padding: 0;
  @media ${device.tablet} {
    font-size: 18px;
    min-height: 80px;
  }
`;
const TextArea = styled.textarea`
  font-size: 16px;
  width: 100%;
  padding: 5px 10px;
  white-space: pre-wrap;
  word-wrap: break-word;
  border: none;
  border-radius: 10px;
  height: 150px;
  line-height: 1.6;
  background-color: ${(props) => props.theme.container.default};
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
  resize: none;
  margin-bottom: 10px;
  &:focus {
    outline: none;
  }
  @media ${device.tablet} {
    font-size: 18px;
    min-height: 100px;
  }
`;
const Header = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;
export const HTMLContent = styled.div`
  min-height: 20vh;
  max-height: 60vh;
  overflow: scroll;
  padding: 0;
  a {
    color: ${(props) => props.theme.text.lightBlue};
    text-decoration: underline;
  }
  blockquote {
    border-left: 4px solid #ccc;
    margin-bottom: 5px;
    margin-top: 5px;
    padding-left: 16px;
  }
`;
export const RegisterTime = styled.div`
  color: ${(props) => props.theme.text.gray};
  font-size: 14px;
  align-self: flex-end;
  @media ${device.tablet} {
    font-size: 16px;
  }
`;

export default RecordBox;
