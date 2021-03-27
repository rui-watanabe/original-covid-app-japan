import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { NativeSelect, FormControl } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import {
  categoriesValuesArray,
  categoriesType,
  fetchAsyncGetData,
  fetchAsyncGetLatestData,
} from '../covidSlice';
import categoriesObject from '../categoriesObject.json';

const useStyles = makeStyles((theme) => ({
  formControl: {
    marginBottom: theme.spacing(3),
    minWidth: 320,
  },
}));

type SwitchCategoryProps = {
  loadDate: string;
};

const SwitchCategory: React.FC<SwitchCategoryProps> = ({ loadDate }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const categories = [];
  categories.push(`${loadDate} 感染データ`, ...categoriesValuesArray);
  return (
    <FormControl className={classes.formControl}>
      <NativeSelect
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
          const setKey = e.target.options.selectedIndex;
          if (setKey === 0) {
            dispatch(fetchAsyncGetLatestData());
          } else {
            const setEventValue = Object.keys(categoriesObject).filter(
              (key) => {
                return (
                  categoriesObject[key as categoriesType] === e.target.value
                );
              }
            )[0] as categoriesType;
            dispatch(fetchAsyncGetData(setEventValue));
          }
        }}
      >
        {categories.map((category, i) => (
          <option key={i} value={category}>
            {category}
          </option>
        ))}
      </NativeSelect>
    </FormControl>
  );
};

export default SwitchCategory;
