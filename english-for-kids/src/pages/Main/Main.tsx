import { CategoryList } from '@/components/CategoryList';
import React from 'react';
import cn from 'classnames';

import { appHeaderViewSelector } from '@/App/AppHedaer/AppHeaderView/reducers';
import { useSelector } from 'react-redux';
import styles from './Main.scss';
// import { playMode } from '@/App/AppHedaer/AppHeaderView/AppHeaderView';

export const Main: () => JSX.Element = () => {
  // console.log(playMode);
  const { isPlayMode } = useSelector(appHeaderViewSelector);
  //   console.log(isPlayMode);

  // useEffect(()=> {
  //  console.log(isPlayMode);
  // }, [isPlayMode])

  return (
    <main className={cn(styles.pageMain, isPlayMode ? 'play-mode' : null)}>
      <h1 className={styles.pageMainTitle}>English for kids</h1>
      <CategoryList />
    </main>
  );
};
