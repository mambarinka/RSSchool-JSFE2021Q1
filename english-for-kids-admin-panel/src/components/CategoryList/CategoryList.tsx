import React, { useEffect, useState } from 'react';
import cn from 'classnames';

import { Category, mainSelector } from '@/pages/Main/reducer';
import { useDispatch, useSelector } from 'react-redux';
import { getCategories } from '@/api/actions';
import { baseURL } from '@/api/api';
import { CategoryItem } from './CategoryItem';
import styles from './CategoryList.scss';

export const CategoryList: () => JSX.Element = () => {
  const dispatch = useDispatch();
  const [arrayCategoryApi, setArrayCategoryApi] = useState([]);

  useEffect(() => {
    dispatch(getCategories()).then((arr: any) => setArrayCategoryApi(arr.data));
  }, [dispatch]);

  return (
    <ul className={cn(styles.category)}>
      {arrayCategoryApi.map((item: { text: React.Key | null | undefined; link: string; id: string }) => (
        <CategoryItem category={item.text} src={`${baseURL}${item.link}`} key={item.id} />
      ))}
    </ul>
  );
};
