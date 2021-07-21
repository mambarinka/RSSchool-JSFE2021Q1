import React, { FunctionComponent, useEffect, useState } from 'react';
import cn from 'classnames';

import { Category, mainSelector } from '@/pages/Main/reducer';
import { useSelector } from 'react-redux';
import { apiSelector } from '@/api/reducers';
import { CardItem } from './CardItem';
import styles from './CardList.scss';

export interface ICardListProps {
  categoryId?: string;
}

export const CardList: FunctionComponent<ICardListProps> = (categoryId) => {
  const [arrayWordsApi, setArrayWordsApi] = useState([]);
  const { words } = useSelector(apiSelector);

  useEffect(() => {
    setArrayWordsApi(words);
  }, [words]);

  // const path = window.location.pathname.slice(1);
  // const result = arrayCategory.filter((categoryItem) => categoryItem.value === `${path}`);

  return (
    <ul className={cn(styles.cardList)}>
      {console.log('categoryId', categoryId)}
      {arrayWordsApi.map(
        (wordItem: {
          id: string;
          categoryId: string;
          textRu: string;
          textEn: string;
          linkSound: string;
          linkImage: string;
        }) =>
          categoryId.categoryId === wordItem.categoryId ? (
            <CardItem
              id={wordItem.id}
              categoryId={wordItem.categoryId}
              textRu={wordItem.textRu}
              textEn={wordItem.textEn}
              linkSound={wordItem.linkSound}
              linkImage={wordItem.linkImage}
            />
          ) : null
      )}
    </ul>
  );
};
