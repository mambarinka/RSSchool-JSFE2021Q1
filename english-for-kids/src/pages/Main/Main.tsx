import { CategoryList } from '@/components/CategoryList';
import React from 'react';

import styles from './Main.scss';

export const Main = () => {
  return (
    <main className={styles.pageMain}>
      <h1 className={styles.pageMainTitle}>English for kids</h1>
      <CategoryList />
    </main>
  )
};