import React, { FunctionComponent, useEffect, useState } from 'react';
import cn from 'classnames';

import { useSelector } from 'react-redux';
import { apiSelector } from '@/api/reducers';
import { CardItem } from './CardItem';
import styles from './CardList.scss';

export let shuffleArray: any[];

export interface ICardListProps {
  categoryId?: string;
}

export const CardList: FunctionComponent<ICardListProps> = (categoryId) => {
  const [arrayWordsApi, setArrayWordsApi] = useState([] as any[]);
  const { words } = useSelector(apiSelector);

  const arrayWords = words.filter((obj: { categoryId: string }) => obj.categoryId === categoryId);
  arrayWords.forEach((word) => {
    shuffleArray.push(word.textEn);
  });

  useEffect(() => {
    setArrayWordsApi(words);
  }, [words]);

  return (
    <ul className={cn(styles.cardList)}>
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
              key={wordItem.id}
            />
          ) : null
      )}
    </ul>
  );
};
