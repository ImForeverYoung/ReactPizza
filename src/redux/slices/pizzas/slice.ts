import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import { RootState } from '../../store';
import { CartItem } from '../cart/types';
import { Sort } from '../filter/types';
import { PizzaItem, Status } from './types';
import { fetchPizzas } from './asyncActions';



interface PizzaSliceState {
  items: PizzaItem[];
  status: 'loading' | 'success' | 'error';
}
const initialState: PizzaSliceState = {
    
    items: [],
    status: Status.LOADING, // loading || success || error
  }

export const pizzasSlice = createSlice({
  name: 'pizzas',
  initialState: initialState,
  reducers: {
    setItems(state, action: PayloadAction<PizzaItem[]>){
        state.items = action.payload;
    },
    
  },
//   extraReducers: {
//     [fetchPizzas.fulfilled]: (state, action) => {
//         console.log(state)
//     }
//   }
  extraReducers: (builder) => {
    builder
       .addCase(fetchPizzas.pending, (state) => {
          state.status = Status.LOADING;
          state.items = [];
       })
       .addCase(fetchPizzas.fulfilled, (state, action) => {
          state.items = action.payload;
          state.status = Status.SUCCESS;
       })
       .addCase(fetchPizzas.rejected, (state) => {
          state.status = Status.ERROR;
          state.items = [];
       })
 }
})

  

// Action creators are generated for each case reducer function
export const { setItems } = pizzasSlice.actions

export default pizzasSlice.reducer