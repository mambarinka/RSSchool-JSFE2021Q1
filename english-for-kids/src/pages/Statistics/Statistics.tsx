import React, { useCallback, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import cn from 'classnames';
import { compareNumbers } from '@/helpers/utils';
import { Link } from 'react-router-dom';
import { resetStatistics, setCorrectPercent } from './actions';
import { statisticsSelector } from './reducers';
import styles from './Statistics.scss';

export let repeatArrayCards: any[] = [];

export const Statistics: () => JSX.Element = () => {
  const { categoriesStat } = useSelector(statisticsSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setCorrectPercent());
  }, [dispatch, setCorrectPercent]);

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
        correctPerсent: el.correctPerсent,
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
    key: 'name1',
    direction: 'ascending',
  });
  const getClassNamesFor = (name: any) => (sortConfig.key === name ? sortConfig.direction : undefined);

  const repeatButtonHundler = useCallback(() => {
    repeatArrayCards = [];
    items.sort((a, b) => b.errorClicks - a.errorClicks);
    items.map((element, index) => {
      if (index < 8) {
        if (element.errorClicks !== 0) {
          repeatArrayCards.push(element);
        }
      }
      return repeatArrayCards;
    });
  }, [items]);

  const resetButtonHandler = useCallback(() => {
    dispatch(resetStatistics());
  }, [dispatch, resetStatistics]);

  return (
    <main className={styles.pageStatistics}>
      <h1 className={styles.pageStatisticsTitle}>Statistics</h1>
      <div className={styles.buttonWrapper}>
        <Link to={'/difficult-words'} onClick={repeatButtonHundler} className={cn(styles.button, styles.buttonRepeat)}>
          Repeat difficult words
        </Link>
        <button onClick={resetButtonHandler} className={cn(styles.button, styles.buttonReset)}>
          Reset
        </button>
      </div>
      <div className={styles.statisticsWrapper}>
        <table className={styles.statisticsTable}>
          <thead>
            <tr>
              <th
                onClick={() => requestSort('name')}
                className={cn(getClassNamesFor('name') === 'ascending' ? styles.ascending : styles.descending)}
              >
                Categories
              </th>
              <th
                onClick={() => requestSort('value')}
                className={cn(getClassNamesFor('value') === 'ascending' ? styles.ascending : styles.descending)}
              >
                Words
              </th>
              <th
                onClick={() => requestSort('translate')}
                className={cn(getClassNamesFor('translate') === 'ascending' ? styles.ascending : styles.descending)}
              >
                Translation
              </th>
              <th
                onClick={() => requestSort('clicks')}
                className={cn(getClassNamesFor('clicks') === 'ascending' ? styles.ascending : styles.descending)}
              >
                Trained
              </th>
              <th
                onClick={() => requestSort('successClicks')}
                className={cn(getClassNamesFor('successClicks') === 'ascending' ? styles.ascending : styles.descending)}
              >
                Correct
              </th>
              <th
                onClick={() => requestSort('errorClicks')}
                className={cn(getClassNamesFor('errorClicks') === 'ascending' ? styles.ascending : styles.descending)}
              >
                Wrong
              </th>
              <th
                onClick={() => requestSort('correctPerсent')}
                className={cn(
                  getClassNamesFor('correctPerсent') === 'ascending' ? styles.ascending : styles.descending
                )}
              >
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
