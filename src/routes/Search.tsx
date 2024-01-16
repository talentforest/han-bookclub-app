import ResultBookBox from 'components/organisms/search/ResultBookBox';
import styled from 'styled-components';
import TextInput from 'components/atoms/inputs/TextInput';
import SubmitBtn from 'components/atoms/buttons/SubmitBtn';
import useSearchBook from 'hooks/useSearchBook';
import { useEffect, useRef } from 'react';
import device from 'theme/mediaQueries';

const Search = () => {
  const {
    onBookQueryChange,
    searchList, //
  } = useSearchBook();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef && !searchList.length) {
      inputRef.current.focus();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main>
      <Form>
        <TextInput
          ref={inputRef}
          placeholder='등록하실 책을 검색해주세요.'
          onChange={onBookQueryChange}
        />
        <SubmitBtn children='검색' />
      </Form>

      <BookResults>
        <span>검색결과 {searchList.length}건</span>
        <p>최대 10건이 검색됩니다.</p>

        {searchList.map((searchedBook, index) => (
          <ResultBookBox
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
  height: 50px;
  gap: 5px;
  input {
    height: inherit;
    min-width: 150px;
    width: 100%;
  }
  button {
    width: 90px;
  }
  @media ${device.tablet} {
    button {
      width: 150px;
    }
  }
`;

export default Search;
