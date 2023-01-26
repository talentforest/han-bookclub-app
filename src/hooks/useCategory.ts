import { category } from 'data/categoryAtom';
import { useState } from 'react';

const useCategory = () => {
  const [category, setCategory] = useState('subjects' as category);

  const onCategoryClick = (category: category) => setCategory(category);

  return {
    category,
    onCategoryClick,
  };
};

export default useCategory;
