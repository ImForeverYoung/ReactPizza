import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../store';
import type { PayloadAction } from '@reduxjs/toolkit'
import { FilterSliceState, Sort, SortPropertyEnum } from './types';

// export interface CounterState {
//   value: number
// }

// const initialState: CounterState = {
//   value: 0,
// }



const initialState: FilterSliceState = {
    searchValue: '',
    categoryId: 0,
    currentPage: 1,
    sort: {
      name: "популярности",
      sortProperty: SortPropertyEnum.RATING,
    }
  }

export const filterSlice = createSlice({
  name: 'filters',
  initialState: initialState,
  reducers: {
    setCategoryId(state, action: PayloadAction<number>){
      state.categoryId = action.payload;
    },
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },
    setSort(state, action: PayloadAction<Sort>){
      state.sort = action.payload;
    },
    setCurrentPage(state,action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setFilters(state, action: PayloadAction<FilterSliceState>){
      state.currentPage = Number(action.payload.currentPage);
      state.sort = action.payload.sort;
      state.categoryId = Number(action.payload.categoryId);
      //console.log(action.payload + '+++++')
    }
  },
})

// Action creators are generated for each case reducer function
export const { setCategoryId, setSearchValue, setSort, setCurrentPage, setFilters } = filterSlice.actions

export default filterSlice.reducer