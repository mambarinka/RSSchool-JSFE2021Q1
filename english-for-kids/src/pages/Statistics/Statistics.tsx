import { getRandomInt } from '@/helpers/utils';
import React from 'react';

import { useSelector } from 'react-redux';
import { statisticsSelector } from './reducers';
import styles from './Statistics.scss';

export const Statistics: () => JSX.Element = () => {
  const { categoriesStat } = useSelector(statisticsSelector);
  const arrayStat = Object.values(categoriesStat);
  // arrayStat.map((element) => element.map((item, index) => console.log(item.value)));
  // Object.keys(categoriesStat).map((item: string) => {
  // console.log(categoriesStat[item]);
  // });
  return (
    <main className={styles.pageStatistics}>
      <h1 className={styles.pageStatisticsTitle}>Statistics</h1>
      <table className={styles.statisticsTable}>
        <thead>
          <tr>
            <th>Categories</th>
            <th>Words</th>
            <th>Translation</th>
            <th>Trained</th>
            <th>Correct</th>
            <th>Wrong</th>
            <th>%Correct</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(categoriesStat).map((item) =>
            categoriesStat[item].map((el) => (
              <tr>
                <td key={item + getRandomInt(100)}>{item}</td>
                <td key={el.value + getRandomInt(20)}>{el.value}</td>
                <td key={el.translate + getRandomInt(300)}>{el.translate}</td>
                <td key={getRandomInt(400)}>{el.trainMode.clicks}</td>
                <td key={getRandomInt(150)}>{el.playMode.successClicks}</td>
                <td key={getRandomInt(1000)}>{el.playMode.errorClicks}</td>
                <td key={getRandomInt(10000)}>
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
    </main>
  );
};
