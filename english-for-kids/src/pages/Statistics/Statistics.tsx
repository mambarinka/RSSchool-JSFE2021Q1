import React, { useMemo, useState } from 'react';

import { useSelector } from 'react-redux';
import { Category, statisticsSelector } from './reducers';
import styles from './Statistics.scss';

export const Statistics: () => JSX.Element = () => {
  const { categoriesStat } = useSelector(statisticsSelector);
  // const sortedCategories = Object.keys(categoriesStat);
  // const sortedWords = [
  //   ...Object.keys(categoriesStat)
  //     .map((item) => categoriesStat[item].map((el) => el.value))
  //     .flat(),
  // ];

  const useSortableData = (items: Category, config: { key: string; direction: string }) => {
    const [sortConfig, setSortConfig] = React.useState(config);

    // const sortedCategories = Object.keys(categoriesStat);
    // const sortedWords = [
    //   ...Object.keys(categoriesStat)
    //     .map((item) => categoriesStat[item].map((el) => el.value))
    //     .flat(),
    // ];

    // const sortFunc = (obj: Category) => {
    //   obj.sort((a, b) => {
    //     if (a < b) {
    //       return sortConfig.direction === 'ascending' ? -1 : 1;
    //     }
    //     if (a > b) {
    //       return sortConfig.direction === 'ascending' ? 1 : -1;
    //     }
    //     return 0;
    //   });
    // };

    const sortedItems = React.useMemo(() => {
      const sortableItems = Object.assign(items);

      if (sortConfig != null) {
        Object.keys(sortableItems).sort((a, b) => {
          if (a < b) {
            return sortConfig.direction === 'ascending' ? -1 : 1;
          }
          if (a > b) {
            return sortConfig.direction === 'ascending' ? 1 : -1;
          }
          return 0;
        });
      }
      console.log(sortableItems);
      return sortableItems;
    }, [items, sortConfig]);

    const requestSort = (key: string) => {
      let direction = 'ascending';
      if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
        direction = 'descending';
      }
      setSortConfig({ key, direction });
    };

    return { items: sortedItems, requestSort, sortConfig };
  };

  // console.log(sortedCategories);
  // console.log(sortedWords);
  // const [sortedField, setSortedField] = useState('');

  // if (sortedField !== '') {
  //   if (sortedField === 'Categories') {
  //     sortFunc(sortedCategories);
  //   } else if (sortedField === 'Words') {
  //     sortFunc(sortedWords);
  //   }
  // }

  const { items, requestSort, sortConfig } = useSortableData(categoriesStat, {
    key: 'Categories',
    direction: 'ascending',
  });
  console.log('items', items);

  const getClassNamesFor = (name: any) => (sortConfig.key === name ? sortConfig.direction : undefined);
  return (
    <main className={styles.pageStatistics}>
      <h1 className={styles.pageStatisticsTitle}>Statistics</h1>
      <div className={styles.statisticsWrapper}>
        <table className={styles.statisticsTable}>
          <thead>
            <tr>
              <th onClick={() => requestSort('Categories')} className={getClassNamesFor('Categories')}>
                Categories
              </th>
              <th onClick={() => requestSort('Words')} className={getClassNamesFor('Words')}>
                Words
              </th>
              <th onClick={() => requestSort('Translation')}>Translation</th>
              <th onClick={() => requestSort('Trained')}>Trained</th>
              <th onClick={() => requestSort('Correct')}>Correct</th>
              <th onClick={() => requestSort('Wrong')}>Wrong</th>
              <th onClick={() => requestSort('%Correct')}>%Correct</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(categoriesStat).map((item) =>
              categoriesStat[item].map((el, index) => (
                <tr key={index}>
                  <td>{item}</td>
                  <td>{el.value}</td>
                  <td>{el.translate}</td>
                  <td>{el.trainMode.clicks}</td>
                  <td>{el.playMode.successClicks}</td>
                  <td>{el.playMode.errorClicks}</td>
                  <td>
                    {el.playMode.successClicks === 0
                      ? 0
                      : Math.round(
                          (el.playMode.successClicks / (el.playMode.successClicks + el.playMode.errorClicks)) * 100
                        )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
};
