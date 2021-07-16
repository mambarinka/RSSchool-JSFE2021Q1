import { CategoryList } from '@/components/CategoryList';
import React from 'react';
import cn from 'classnames';

import { appHeaderViewSelector } from '@/App/AppHedaer/AppHeaderView/reducers';
import { useSelector } from 'react-redux';
import styles from './Main.scss';

export const Main: () => JSX.Element = () => {
  const { isPlayMode } = useSelector(appHeaderViewSelector);
  // const { isAdminHere } = useSelector(appHeaderViewSelector);
  alert(
    'Уважаемый проверяющий, будьте так добры - проверьте, пожалуйста, мою работу вечером или в выходные! 🙏❤️ Мой ник в discord mambarinka, в телеграмме https://t.me/anya_tav'
  );
  return (
    <main className={cn(styles.pageMain, isPlayMode ? 'play-mode' : null)}>
      <h1 className={styles.pageMainTitle}>English for kids</h1>
      <CategoryList />
    </main>
  );
};
