import React from 'react';
import { Line } from 'react-chartjs-2';
import { useSelector } from 'react-redux';
import styles from './Chart.module.css';
import { selectCurrentData, selectCurrentCategory } from '../covidSlice';
import categoriesObject from '../categoriesObject.json';

const Chart: React.FC = () => {
  const currentDataList = useSelector(selectCurrentData);
  const currentDataDates = currentDataList.map(({ date }) => date);
  const currentCategory = useSelector(selectCurrentCategory);
  const currentCategoryString = categoriesObject[currentCategory];

  const lineChart = currentDataList[0] && (
    <Line
      data={{
        labels: currentDataDates.map((date) =>
          new Date(date).toLocaleDateString()
        ),
        datasets: [
          {
            data: currentDataList.map((data) => Number(data.count)),
            label: currentCategoryString,
            borderColor: '#3333ff',
            fill: true,
          },
        ],
      }}
    />
  );

  return <div className={styles.container}>{lineChart}</div>;
};

export default Chart;
