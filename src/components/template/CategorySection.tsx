import { useRecoilState, useRecoilValue } from 'recoil';
import { clubInfoByMonthState } from 'data/documentsAtom';
import { category, categoryState } from 'data/categoryAtom';
import { useLocation } from 'react-router-dom';
import CategoryBtns from 'components/organisms/CategoryBtns';
import SubjectArea from 'components/template/SubjectArea';
import RecommendArea from 'components/template/RecommendArea';
import ReviewArea from 'components/template/ReviewArea';

const CategorySection = () => {
  const [category, setCategory] = useRecoilState(categoryState);
  const thisMonthClubInfo = useRecoilValue(clubInfoByMonthState);
  const { pathname } = useLocation();
  const { id } = thisMonthClubInfo;

  const onCategoryClick = (category: category) => setCategory(category);

  const historyId = pathname.slice(-7);
  const thisYearMonthId = pathname.includes('history') ? historyId : id;

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
