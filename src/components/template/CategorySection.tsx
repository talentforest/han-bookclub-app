import { useRecoilState, useRecoilValue } from 'recoil';
import { thisMonthState } from 'data/documentsAtom';
import { category, categoryState } from 'data/categoryAtom';
import { useLocation } from 'react-router-dom';
import CategoryBtns from 'components/organisms/CategoryBtns';
import SubjectArea from 'components/template/SubjectArea';
import RecommendArea from 'components/template/RecommendArea';
import ReviewArea from 'components/template/ReviewArea';

const CategorySection = () => {
  const [category, setCategory] = useRecoilState(categoryState);
  const thisMonthDoc = useRecoilValue(thisMonthState);
  const { pathname } = useLocation();
  const { id } = thisMonthDoc;

  const onCategoryClick = (category: category) => {
    setCategory(category);
  };

  const historyId = pathname.slice(-7);
  const monthId = pathname.includes('history') ? historyId : id;

  return (
    <>
      <CategoryBtns category={category} onCategoryClick={onCategoryClick} />
      {category === 'recommends' && <RecommendArea monthId={monthId} />}
      {category === 'subjects' && <SubjectArea monthId={monthId} />}
      {category === 'reviews' && <ReviewArea monthId={monthId} />}
    </>
  );
};

export default CategorySection;
