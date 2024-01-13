import { thisYear, BOOK_FIELD_HOST, existDocObj } from 'util/index';
import { useRecoilState } from 'recoil';
import { getDocument } from 'api/getFbDoc';
import { useEffect } from 'react';
import { fieldHostDocState } from 'data/bookFieldHostAtom';
import device from 'theme/mediaQueries';
import styled from 'styled-components';
import useHandleFieldHost from 'hooks/useHandleFieldHost';
import Loading from 'components/atoms/loadings/Loading';
import TableItem from 'components/atoms/table/TableItem';
import EditBookFieldHostForm from 'components/atoms/EditBookFieldHostForm';
import Modal from 'components/atoms/Modal';

const BookFieldHostBox = () => {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bookFieldHostDoc]);

  return (
    <>
      {bookFieldHostDoc.info ? (
        <FieldHostBox>
          <FieldHeader className='tablebox'>
            <span className='month'>월</span>
            <span className='field'>독서분야와 발제자</span>
          </FieldHeader>

          <ul>
            {bookFieldHostDoc.info?.map((bookFieldhost, index) => (
              <BookFieldHostListItem key={bookFieldhost.month}>
                {!!isEditing[index] && (
                  <Modal
                    onModalToggleClick={() => onEditClick(index)}
                    title={`${bookFieldhost.month}월의 독서분야와 발제자`}
                  >
                    <EditBookFieldHostForm
                      bookFieldHost={bookFieldhost}
                      onSubmit={onSubmit}
                      onEditClick={onEditClick}
                      index={index}
                      selectedValues={selectedValues}
                      setSelectedValues={setSelectedValues}
                    />
                  </Modal>
                )}

                <TableItem
                  onEditClick={() => onEditClick(index)}
                  bookFieldhost={bookFieldhost}
                />
              </BookFieldHostListItem>
            ))}
          </ul>
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
  background-color: ${(props) => props.theme.container.default};
  box-shadow: ${(props) => props.theme.boxShadow};

  > ul {
    padding: 3px 0;
  }

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

  @media ${device.tablet} {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }
`;

const FieldHeader = styled.div`
  background-color: #f0eded;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  height: 42px;
  padding: 15px 20px;

  > span {
    font-size: 15px;
    color: #888;
  }
`;

const BookFieldHostListItem = styled.li`
  height: 72px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 20px;
`;

export default BookFieldHostBox;
