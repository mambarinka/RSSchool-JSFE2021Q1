import React from 'react';

import { useSelector } from 'react-redux';
import { statisticsSelector } from './reducers';
import styles from './Statistics.scss';

export const Statistics: () => JSX.Element = () => {
  const { categoriesStat } = useSelector(statisticsSelector);

  const useSortableData = (items: any, config: { key: string; direction: string }) => {
    const [sortConfig, setSortConfig] = React.useState(config);

    const sortedItems = React.useMemo(() => {
      const sortableItems = [...items];

      if (sortConfig != null) {
        sortableItems.sort((a, b) => {
          if (a[sortConfig.key] < b[sortConfig.key]) {
            return sortConfig.direction === 'ascending' ? -1 : 1;
          }
          if (a[sortConfig.key] > b[sortConfig.key]) {
            return sortConfig.direction === 'ascending' ? 1 : -1;
          }
          return 0;
        });
      }
      console.log('sortableItems', sortableItems);
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

  const arrayData: any[] = [];
  const arrayNames = Object.keys(categoriesStat);
  const arrayCardValue: {
    item: string;
    value: string;
    translate: string;
    clicks: number;
    successClicks: number;
    errorClicks: number;
    correctPerсent: number;
  }[] = [];

  arrayNames.map((item) =>
    categoriesStat[item].map((el) =>
      arrayCardValue.push({
        item,
        value: el.value,
        translate: el.translate,
        clicks: el.trainMode.clicks,
        successClicks: el.playMode.successClicks,
        errorClicks: el.playMode.errorClicks,
        correctPerсent:
          Math.round(el.playMode.successClicks / (el.playMode.successClicks + el.playMode.errorClicks)) * 100,
      })
    )
  );

  arrayNames.map((element) =>
    arrayCardValue.map((el) => {
      if (el.item === element) {
        arrayData.push({
          name: element,
          value: el.value,
          translate: el.translate,
          clicks: el.clicks,
          successClicks: el.successClicks,
          errorClicks: el.errorClicks,
          correctPerсent: el.correctPerсent,
        });
      }
      return arrayData;
    })
  );

  const { items, requestSort, sortConfig } = useSortableData(arrayData, {
    key: 'name',
    direction: 'ascending',
  });
  const getClassNamesFor = (name: any) => (sortConfig.key === name ? sortConfig.direction : undefined);
  return (
    <main className={styles.pageStatistics}>
      <h1 className={styles.pageStatisticsTitle}>Statistics</h1>
      <div className={styles.statisticsWrapper}>
        <table className={styles.statisticsTable}>
          <thead>
            <tr>
              <th onClick={() => requestSort('name')} className={getClassNamesFor('name')}>
                Categories
              </th>
              <th onClick={() => requestSort('value')} className={getClassNamesFor('value')}>
                Words
              </th>
              <th onClick={() => requestSort('translate')} className={getClassNamesFor('translate')}>
                Translation
              </th>
              <th onClick={() => requestSort('clicks')} className={getClassNamesFor('clicks')}>
                Trained
              </th>
              <th onClick={() => requestSort('successClicks')} className={getClassNamesFor('successClicks')}>
                Correct
              </th>
              <th onClick={() => requestSort('errorClicks')} className={getClassNamesFor('errorClicks')}>
                Wrong
              </th>
              <th onClick={() => requestSort('correctPerсent')} className={getClassNamesFor('correctPerсent')}>
                %Correct
              </th>
            </tr>
          </thead>
          <tbody>
            {items.map((el: any, index: number) => (
              <tr key={index}>
                <td>{el.name}</td>
                <td>{el.value}</td>
                <td>{el.translate}</td>
                <td>{el.clicks}</td>
                <td>{el.successClicks}</td>
                <td>{el.errorClicks}</td>
                <td>{el.successClicks === 0 ? 0 : el.correctPerсent}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
};
