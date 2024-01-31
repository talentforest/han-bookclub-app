import { thisYear, existDocObj } from 'util/index';
import { useRecoilState } from 'recoil';
import { getDocument } from 'api/getFbDoc';
import { useEffect } from 'react';
import { fieldHostDocState } from 'data/bookFieldHostAtom';
import { BOOK_FIELD_HOST } from 'constants/index';
import device from 'theme/mediaQueries';
import styled from 'styled-components';
import useHandleFieldHost from 'hooks/useHandleFieldHost';
import Loading from 'components/atoms/Loading';
import BookFieldHostTableItem from 'components/organisms/BookFieldHostTableItem';
import BookFieldHostEditForm from 'components/organisms/BookFieldHostEditForm';
import Modal from 'components/atoms/Modal';

const BookFieldHostTable = () => {
  const [bookFieldHostDoc, setBookFieldHostDoc] =
    useRecoilState(fieldHostDocState);

  const {
    isEditing,
    onEditClick,
    onSubmit,
    selectedValues,
    setSelectedValues,
  } = useHandleFieldHost();

  useEffect(() => {
    if (!existDocObj(bookFieldHostDoc)) {
      getDocument(BOOK_FIELD_HOST, `${thisYear}`, setBookFieldHostDoc);
    }
  }, [bookFieldHostDoc]);

  return (
    <>
      {bookFieldHostDoc.info ? (
        <FieldHostBox>
          <FieldHeader className='tablebox'>
            <span className='month'>월</span>
            <span className='field'>독서분야와 발제자</span>
          </FieldHeader>

          <FieldList>
            {bookFieldHostDoc.info?.map((bookFieldhost, index) => (
              <BookFieldHostListItem key={bookFieldhost.month}>
                {!!isEditing[index] && (
                  <Modal
                    onToggleClick={() => onEditClick(index)}
                    title={`${bookFieldhost.month}월의 독서분야와 발제자`}
                  >
                    <BookFieldHostEditForm
                      bookFieldHost={bookFieldhost}
                      onSubmit={onSubmit}
                      onEditClick={onEditClick}
                      index={index}
                      selectedValues={selectedValues}
                      setSelectedValues={setSelectedValues}
                    />
                  </Modal>
                )}

                <BookFieldHostTableItem
                  onEditClick={() => onEditClick(index)}
                  bookFieldhost={bookFieldhost}
                />
              </BookFieldHostListItem>
            ))}
          </FieldList>
        </FieldHostBox>
      ) : (
        <Loading height='70vh' />
      )}
    </>
  );
};

const FieldHostBox = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.container.default};
  box-shadow: ${({ theme }) => theme.boxShadow};

  .tablebox {
    position: relative;
    display: flex;
    align-items: start;
    gap: 10px;
    width: 100%;
  }
  .no_info {
    color: #aaa;
  }
  .month {
    width: 60px;
  }
  .field {
    flex: 1;
  }
  .host {
    flex: 1;
    display: flex;
    justify-content: start;
  }
`;

const FieldHeader = styled.div`
  background-color: #f0eded;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  height: 42px;
  padding: 10px 20px;
  display: flex;
  > span {
    font-size: 15px;
    color: #888;
  }
  @media ${device.tablet} {
    height: 50px;
    padding: 15px 20px;
    > span {
      font-size: 16px;
    }
  }
`;

const FieldList = styled.ul`
  padding: 3px 0;
  @media ${device.tablet} {
    margin-top: 20px;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }
`;

const BookFieldHostListItem = styled.li`
  height: 72px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 20px;
  @media ${device.tablet} {
  }
`;

export default BookFieldHostTable;
