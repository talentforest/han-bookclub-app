import { category } from 'data/categoryAtom';
import styled from 'styled-components';
import device from 'theme/mediaQueries';

interface ICategoryBtnsProps {
  category: category;
  onCategoryClick: (category: category) => void;
  myRecord?: boolean;
}

const CategoryBtns = ({
  category,
  onCategoryClick,
  myRecord,
}: ICategoryBtnsProps) => {
  return (
    <Categories>
      <Category
        $myRecord={myRecord}
        $isActive={category === 'recommends'}
        onClick={() => onCategoryClick('recommends')}
      >
        <span>{myRecord ? '나의 추천책' : '추천한 책'}</span>
      </Category>
      <Category
        $myRecord={myRecord}
        $isActive={category === 'subjects'}
        onClick={() => onCategoryClick('subjects')}
      >
        <span>{myRecord ? '나의 발제문' : '발제문'}</span>
      </Category>
      <Category
        $myRecord={myRecord}
        $isActive={category === 'reviews'}
        onClick={() => onCategoryClick('reviews')}
      >
        <span>{myRecord ? '나의 모임 후기' : '모임 후기'}</span>
      </Category>
    </Categories>
  );
};
const Categories = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 20px 0;
`;
const Category = styled.button<{ $isActive: boolean; $myRecord: boolean }>`
  cursor: pointer;
  width: 100%;
  font-size: 14px;
  font-weight: 700;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  > span {
    height: 24px;
    color: ${(props) => (props.$isActive ? props.theme.text.default : '#aaa')};
    border-bottom: ${(props) =>
      props.$isActive && props.$myRecord
        ? `10px solid ${props.theme.container.yellow}`
        : props.$isActive
        ? `10px solid ${props.theme.container.orange}`
        : 'none'};
  }
  @media ${device.tablet} {
    height: 100%;
    font-size: 16px;
  }
`;

export default CategoryBtns;
