import { CategoryList } from '@/components/CategoryList';
import React, { FunctionComponent, useCallback, useEffect, useState } from 'react';
import cn from 'classnames';

import styles from './Main.scss';
import { appHeaderViewSelector } from '@/App/AppHedaer/AppHeaderView/reducers';
import { useSelector } from 'react-redux';
// import { playMode } from '@/App/AppHedaer/AppHeaderView/AppHeaderView';


export const Main = () => {
  // console.log(playMode);
  const { isPlayMode } = useSelector(appHeaderViewSelector);
  console.log(isPlayMode);

useEffect(()=> {
 console.log(isPlayMode);
}, [isPlayMode])

  return (
    <main className={cn(styles.pageMain , isPlayMode ? "play-mode" : null) }>
      <h1 className={styles.pageMainTitle}>English for kids</h1>
      <CategoryList />
    </main>
  )
};