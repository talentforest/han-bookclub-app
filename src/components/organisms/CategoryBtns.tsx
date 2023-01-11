import { category } from 'data/categoryAtom';
import styled from 'styled-components';
import device from 'theme/mediaQueries';

interface ICategoryBtnsProps {
  category: category;
  onCategoryClick: (category: category) => void;
}

const CategoryBtns = ({ category, onCategoryClick }: ICategoryBtnsProps) => {
  return (
    <Categories>
      <Category
        $isActive={category === 'recommends'}
        onClick={() => onCategoryClick('recommends')}
      >
        <span>추천한 책</span>
      </Category>
      <Category
        $isActive={category === 'subjects'}
        onClick={() => onCategoryClick('subjects')}
      >
        <span>발제문</span>
      </Category>
      <Category
        $isActive={category === 'reviews'}
        onClick={() => onCategoryClick('reviews')}
      >
        <span>모임 후기</span>
      </Category>
    </Categories>
  );
};
const Categories = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 10px 0;
`;
const Category = styled.button<{ $isActive: boolean }>`
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
    color: ${(props) =>
      props.$isActive ? props.theme.text.default : props.theme.text.lightGray};
    border-bottom: ${(props) =>
      props.$isActive ? `8px solid ${props.theme.container.orange}` : 'none'};
  }
  @media ${device.tablet} {
    height: 100%;
    font-size: 16px;
  }
`;

export default CategoryBtns;
