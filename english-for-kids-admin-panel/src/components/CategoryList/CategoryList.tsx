import React, { useEffect, useState } from 'react';
import cn from 'classnames';

import { useSelector } from 'react-redux';
import { baseURL } from '@/api/api';
import { apiSelector } from '@/api/reducers';
import { CategoryItem } from './CategoryItem';
import styles from './CategoryList.scss';

export const CategoryList: () => JSX.Element = () => {
  const [arrayCategoryApi, setArrayCategoryApi] = useState([] as any[]);
  const { categories } = useSelector(apiSelector);

  useEffect(() => {
    setArrayCategoryApi(categories);
  }, [categories]);

  return (
    <ul className={cn(styles.category)}>
      {arrayCategoryApi.map((item: { text: React.Key | null | undefined; link: string; id: string }) => (
        <CategoryItem category={item.text} src={`${baseURL}${item.link}`} key={item.id} />
      ))}
    </ul>
  );
};
