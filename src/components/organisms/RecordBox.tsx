import { useState } from 'react';
import { getLocalDate } from 'util/index';
import { IDocument } from 'data/documentsAtom';
import { useRecoilValue } from 'recoil';
import { categoryState } from 'data/categoryAtom';
import UsernameBox from 'components/organisms/UsernameBox';
import useDeleteDoc from 'hooks/handleFbDoc/useDeleteDoc';
import useEditDoc from 'hooks/handleFbDoc/useEditDoc';
import styled from 'styled-components';
import AtLeastOneLetterGuideEditBtn from 'components/atoms/buttons/AtLeastOneLetterGuideEditBtn';
import device from 'theme/mediaQueries';
import QuillEditor from 'components/atoms/QuillEditor';
import EditDeleteBox from './EditDeleteBox';
import RecordFooter from 'components/atoms/RecordFooter';
import BookRatingBox from './BookRatingBox';

interface IRecordProps {
  doc: IDocument;
  collName: string;
  setShowDetail?: (detail: []) => void;
}

const RecordBox = ({ doc, collName, setShowDetail }: IRecordProps) => {
  const category = useRecoilValue(categoryState);
  const [editing, setEditing] = useState(false);
  const [editingRate, setEditingRate] = useState(doc.rating);
  const [editedText, setEditedText] = useState(doc.text);
  const {
    id,
    creatorId,
    createdAt,
    recommendedBook,
    rating,
    thumbnail,
    title,
  } = doc;

  const { onDeleteClick } = useDeleteDoc({ docId: doc.id, collName });
  const { showingGuide, onEditedSubmit, onEditedChange } = useEditDoc({
    docId: id,
    setEditedText,
    editedText,
    editingRate,
    setEditing,
    collName,
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
        <UsernameBox creatorId={creatorId} />
        <RegisterTime>{getLocalDate(createdAt)}</RegisterTime>
        <EditDeleteBox
          creatorId={creatorId}
          setEditing={setEditing}
          onDeleteClick={handleDeleteClick}
        />
      </Header>
      {category === 'recommends' && recommendedBook?.title && (
        <RecommendBookInfo>
          <img src={recommendedBook?.thumbnail} alt='book thumbnail' />
          <div>
            <h4>{recommendedBook?.title}</h4>
            <span>{recommendedBook?.authors}</span>
            <a href={recommendedBook?.url}>상세정보 보러가기</a>
          </div>
        </RecommendBookInfo>
      )}
      {editing ? (
        <>
          {category === 'reviews' && (
            <BookRatingBox
              thumbnail={thumbnail}
              title={title}
              rating={editingRate}
              setRating={setEditingRate}
            />
          )}
          {collName.includes('Subjects') ? (
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
          {!!rating && (
            <BookRatingBox
              thumbnail={thumbnail}
              title={title}
              rating={doc.rating}
              readOnly
            />
          )}
          <Content as='pre' dangerouslySetInnerHTML={{ __html: editedText }} />
          <RecordFooter record={doc} collName={collName} />
        </>
      )}
    </Form>
  );
};

const Form = styled.form`
  position: relative;
  padding: 10px 0;
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
  @media ${device.tablet} {
    &:last-child {
      border-bottom: 1px solid #ccc;
    }
  }
`;
const RecommendBookInfo = styled.div`
  box-shadow: ${(props) => props.theme.boxShadow};
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
    box-shadow: ${(props) => props.theme.boxShadow};
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
  box-shadow: ${(props) => props.theme.boxShadow};
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
const Header = styled.header`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  gap: 5px;
  > svg {
    padding-top: 2px;
    width: 20px;
  }
`;
export const RegisterTime = styled.div`
  color: ${(props) => props.theme.text.gray};
  font-size: 14px;
  text-align: end;
  flex-grow: 2;
  @media ${device.tablet} {
    font-size: 16px;
  }
`;

export const ScrollContent = styled.div`
  min-height: 15vh;
  max-height: 50vh;
  overflow: scroll;
  padding: 0;
  width: 100%;
  p {
    word-break: break-all;
    margin-bottom: 5px;
  }
  ul {
    list-style: circle;
    padding-left: 20px;
  }
  ol {
    list-style: decimal;
    padding-left: 20px;
  }
  li {
    margin-bottom: 5px;
  }
  a {
    color: ${(props) => props.theme.text.lightBlue};
    text-decoration: underline;
  }
  blockquote {
    border-left: 5px solid #aaa;
    padding-left: 8px;
    margin: 8px 0;
  }
  .ql-indent-1 {
    margin-left: 30px;
    padding: 0;
  }
  .ql-indent-2 {
    margin-left: 50px;
    padding: 0;
  }
  .ql-indent-3 {
    margin-left: 70px;
    padding: 0;
  }
  .ql-indent-4 {
    margin-left: 90px;
    padding: 0;
  }
  .ql-indent-5 {
    margin-left: 110px;
    padding: 0;
  }
  .ql-indent-6 {
    margin-left: 130px;
    padding: 0;
  }
  .ql-indent-7 {
    margin-left: 150px;
    padding: 0;
  }
  .ql-indent-8 {
    margin-left: 170px;
    padding: 0;
  }
`;
const Content = styled(ScrollContent)`
  white-space: pre-wrap;
  word-wrap: break-word;
  line-height: 1.6;
  font-size: 16px;
  min-height: 100px;
  max-height: fit-content;
  margin-bottom: 10px;
  padding: 0;
  @media ${device.tablet} {
    font-size: 16px;
  }
`;

export default RecordBox;
