import { CategoryList } from '@/components/CategoryList';
import React, { FunctionComponent, useCallback, useState } from 'react';
import cn from 'classnames';

import styles from './Main.scss';
// import { playMode } from '@/App/AppHedaer/AppHeaderView/AppHeaderView';


export const Main = () => {
  // console.log(playMode);
  return (
    <main className={cn(styles.pageMain/* , playMode ? "play-mode" : null) */)}>
      <h1 className={styles.pageMainTitle}>English for kids</h1>
      <CategoryList />
    </main>
  )
};