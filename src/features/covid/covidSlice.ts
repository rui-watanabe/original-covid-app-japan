import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../../app/store';
import dataObject from './dataObject.json';
import categoriesObject from './categoriesObject.json';
import dataLatestObject from './dataLatestObject.json';

const apiUrl = 'https://api.opendata.go.jp/mhlw';

type covidDataObject = typeof dataObject;
type categoriesObjectType = typeof categoriesObject;
type covidDataLatestObject = typeof dataLatestObject;

export type categoriesType = keyof categoriesObjectType;

type latestDataState = {
  eachCategory: categoriesType;
  latestCount: string;
};
type latestDataListType = latestDataState[];

type covidState = {
  currentCategoryFlg: number;
  currentCategory: categoriesType;
  currentData: covidDataObject;
  latestDataList: latestDataListType;
};

const categoriesKeysArray = Object.keys(
  categoriesObject
) as (keyof typeof categoriesObject)[];

export const categoriesValuesArray = Object.values(categoriesObject);

const initialState: covidState = {
  currentCategoryFlg: 1,
  currentCategory: 'positive-cases',
  currentData: dataObject,
  latestDataList: [
    {
      eachCategory: 'severe-cases',
      latestCount: '0',
    },
    {
      eachCategory: 'death-cases',
      latestCount: '0',
    },
    {
      eachCategory: 'recovery-cases',
      latestCount: '0',
    },
    {
      eachCategory: 'hospitalization-cases',
      latestCount: '0',
    },
    {
      eachCategory: 'test-cases',
      latestCount: '0',
    },
  ],
};

const moldApi = (data: covidDataLatestObject[]): covidDataObject => {
  let jsonString = JSON.stringify(data);
  jsonString = jsonString.replace(/"日付":/g, '"date":');
  jsonString = jsonString.replace(
    /PCR\s検査陽性者数\(単日\)|重症者数|死亡者数|退院、療養解除となった者|入院治療を要する者|PCR\s検査実施件数\(単日\)/g,
    'count'
  );
  return JSON.parse(jsonString);
};

export const fetchAsyncGetData = createAsyncThunk(
  'covid/getData',
  async (category: categoriesType) => {
    const { data } = await axios.get<covidDataLatestObject[]>(
      `${apiUrl}/${category}?apikey=${process.env.REACT_APP_COVID_API_KEY}`
    );
    const moldData: covidDataObject = moldApi(data.splice(-14, 14));
    return { category, data: moldData };
  }
);

export const fetchAsyncGetLatestData = createAsyncThunk(
  'covid/getLatest',
  async () => {
    const retStateList: Promise<latestDataState>[] = categoriesKeysArray.map(
      async (mapCategory: categoriesType) => {
        const { data } = await axios.get<covidDataLatestObject[]>(
          `${apiUrl}/${mapCategory}?apikey=${process.env.REACT_APP_COVID_API_KEY}`
        );
        const moldData: covidDataObject = moldApi(data.splice(-1, 1));
        const stateObject: latestDataState = {
          eachCategory: mapCategory,
          latestCount: moldData[0].count,
        };
        return stateObject;
      }
    );
    const stateList = await Promise.all(retStateList);
    return { stateList };
  }
);

const covidSlice = createSlice({
  name: 'covid',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAsyncGetData.fulfilled, (state, action) => {
      return {
        ...state,
        currentCategoryFlg: 1,
        currentCategory: action.payload.category,
        currentData: action.payload.data,
      };
    });
    builder.addCase(fetchAsyncGetLatestData.fulfilled, (state, action) => {
      return {
        ...state,
        currentCategoryFlg: 0,
        latestDataList: action.payload.stateList,
      };
    });
  },
});

export const selectCurrentCategoryFlg: (state: RootState) => number = (state) =>
  state.covid.currentCategoryFlg;

export const selectCurrentCategory: (state: RootState) => categoriesType = (
  state
) => state.covid.currentCategory;

export const selectCurrentData: (state: RootState) => covidDataObject = (
  state: RootState
) => state.covid.currentData;

export const selectLatestDataList: (state: RootState) => latestDataListType = (
  state: RootState
) => state.covid.latestDataList;

export default covidSlice.reducer;
