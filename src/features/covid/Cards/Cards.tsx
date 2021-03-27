import React from 'react';
import { useSelector } from 'react-redux';
import { Grid } from '@material-ui/core';
import styles from './Cards.module.css';
import { selectLatestDataList } from '../covidSlice';
import CardInfo from './CardInfo';
import categoriesObject from '../categoriesObject.json';

const Cards: React.FC = () => {
  const latestDataList = useSelector(selectLatestDataList);
  return (
    <div className={styles.container}>
      <Grid container spacing={5} justify="center">
        {latestDataList.map(
          (data, index): JSX.Element => {
            return (
              <CardInfo
                key={index}
                category={categoriesObject[data.eachCategory]}
                count={data.latestCount}
                categoryKey={data.eachCategory}
              />
            );
          }
        )}
      </Grid>
    </div>
  );
};

export default Cards;
