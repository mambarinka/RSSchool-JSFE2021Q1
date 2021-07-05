import React from 'react';

import { useSelector } from 'react-redux';
import { statisticsSelector } from './reducers';
import styles from './Statistics.scss';

export const Statistics: () => JSX.Element = () => {
  const { categoriesStat } = useSelector(statisticsSelector);
  return (
    <main className={styles.pageStatistics}>
      <h1 className={styles.pageStatisticsTitle}>Statistics</h1>
      <div className={styles.statisticsWrapper}>
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
