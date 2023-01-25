import { useRecoilState, useRecoilValue } from 'recoil';
import { thisMonthClubState } from 'data/documentsAtom';
import { category, categoryState } from 'data/categoryAtom';
import { useLocation } from 'react-router-dom';
import CategoryBtns from 'components/organisms/CategoryBtns';
import SubjectArea from 'components/template/SubjectArea';
import RecommendArea from 'components/template/RecommendArea';
import ReviewArea from 'components/template/ReviewArea';

const CategorySection = () => {
  const [category, setCategory] = useRecoilState(categoryState);
  const thisMonthClub = useRecoilValue(thisMonthClubState);
  const { pathname } = useLocation();
  const { id } = thisMonthClub;

  const onCategoryClick = (category: category) => setCategory(category);

  const historyPageId = pathname.slice(-7);
  const thisYearMonthId = pathname.includes('history') ? historyPageId : id;

  return (
    <>
      <CategoryBtns category={category} onCategoryClick={onCategoryClick} />
      {category === 'recommends' && (
        <RecommendArea yearMonthId={thisYearMonthId} />
      )}
      {category === 'subjects' && <SubjectArea yearMonthId={thisYearMonthId} />}
      {category === 'reviews' && <ReviewArea yearMonthId={thisYearMonthId} />}
    </>
  );
};

export default CategorySection;
