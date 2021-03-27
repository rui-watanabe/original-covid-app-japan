import React from 'react';
import CountUp from 'react-countup';
import { Card, CardContent, Typography, Grid } from '@material-ui/core';
import CardIcon from './CardIcon';
import styles from './Cards.module.css';

type CardInfoProps = {
  category: string;
  count: string;
  categoryKey: string;
};

const CardInfo = ({
  category,
  count,
  categoryKey,
}: CardInfoProps): JSX.Element => {
  return (
    <>
      <Grid
        item
        xs={12}
        md={3}
        component={Card}
        className={styles[categoryKey]}
      >
        <CardContent>
          <Typography color="textSecondary" gutterBottom>
            <CardIcon categoryKey={categoryKey} />
            {category}
          </Typography>
          <Typography variant="h5">
            <CountUp
              start={0}
              end={Number(count)}
              duration={1.5}
              separator=","
            />
            人
          </Typography>
        </CardContent>
      </Grid>
    </>
  );
};
export default CardInfo;
