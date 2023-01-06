import ResultBox from 'components/organisms/search/ResultBox';
import styled from 'styled-components';
import TextInput from 'components/atoms/inputs/TextInput';
import SubmitBtn from 'components/atoms/buttons/SubmitBtn';
import useSearchBook from 'hooks/useSearchBook';

const Search = () => {
  const {
    onSubmit,
    bookQuery,
    onBookQueryChange,
    searchList, //
  } = useSearchBook();

  return (
    <main>
      <Form onSubmit={onSubmit}>
        <TextInput
          placeholder='등록하실 책을 검색해주세요.'
          value={bookQuery}
          onChange={onBookQueryChange}
        />
        <SubmitBtn children='검색' />
      </Form>
      <BookResults>
        <span>검색결과 {searchList.length}건</span>
        <p>최대 10건이 검색됩니다.</p>
        {searchList.map((searchedBook, index) => (
          <ResultBox
            searchedBook={searchedBook}
            key={`${searchedBook.isbn}${index}`}
          />
        ))}
      </BookResults>
    </main>
  );
};

const BookResults = styled.section`
  padding: 10px 0;
  > span {
    display: block;
    padding-bottom: 5px;
    font-size: 16px;
  }
  > p {
    display: block;
    padding-bottom: 10px;
    font-size: 14px;
    color: ${(props) => props.theme.text.lightBlue};
  }
`;

const Form = styled.form`
  display: flex;
  justify-content: space-between;
  input {
    width: 80%;
    min-width: 200px;
    margin-right: 10px;
  }
  button {
    width: 20%;
  }
`;

export default Search;
