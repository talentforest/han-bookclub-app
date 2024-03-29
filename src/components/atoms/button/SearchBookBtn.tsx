import { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import SearchedBookPostAddModal from '../../organisms/modal/SearchedBookPostAddModal';
import device from 'theme/mediaQueries';
import styled from 'styled-components';

const SearchBookBtn = () => {
  const [openRecommendPostModal, setOpenRecommendPostModal] = useState(false);

  const toggleRecommendPostModal = () =>
    setOpenRecommendPostModal((prev) => !prev);

  return (
    <>
      <Btn onClick={toggleRecommendPostModal}>
        <FiSearch fontSize={16} />
        <span>추천책 검색</span>
      </Btn>

      {openRecommendPostModal && (
        <SearchedBookPostAddModal
          title='추천책 작성하기'
          onToggleClick={toggleRecommendPostModal}
        />
      )}
    </>
  );
};

const Btn = styled.button`
  width: 100%;
  height: 40px;
  margin-bottom: 10px;
  display: flex;
  gap: 5px;
  align-items: center;
  padding: 8px 15px;
  border-radius: 30px;
  background-color: #fff;
  box-shadow: ${({ theme }) => theme.boxShadow};
  span {
    color: ${({ theme }) => theme.text.gray3};
    font-size: 15px;
  }
  svg {
    stroke: ${({ theme }) => theme.text.gray3};
    margin-bottom: 2px;
  }
  @media ${device.tablet} {
    width: 50%;
  }
  @media ${device.desktop} {
    width: 40%;
  }
`;

export default SearchBookBtn;
