import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { getCartFromLS } from '../../../utils/getCartFromLS';
import { RootState } from '../../store';
import { calcTotalPrice } from '../../../utils/calcTotalPrice';
import { CartItem, CartSliceState } from './types';
//import type { PayloadAction } from '@reduxjs/toolkit'

// export interface CounterState {
//   value: number
// }

// const initialState: CounterState = {
//   value: 0,
// }


const { items, totalPrice } = getCartFromLS();
const initialState: CartSliceState = {
    totalPrice,
    items,
  }

export const cartSlice = createSlice({
  name: 'cart',
  initialState: initialState,
  reducers: {
    // addItem(state, action){
    //     state.items.push(action.payload)
    //     // state.totalPrice = [...state.items, action.payload]
    //     state.totalPrice = state.items.reduce((sum, obj) => {
    //       return obj.price + sum;
    //     }, 0)
    // },
    addItem(state, action: PayloadAction<CartItem>){
      const findItem = state.items.find(obj=>obj.id === action.payload.id);
      if(findItem){
        findItem.count++;
      } else {
        state.items.push({
          ...action.payload,
          count: 1
        })
      }
      state.totalPrice = calcTotalPrice(state.items);
    },
    
    minusItem(state, action: PayloadAction<string>){
      const findItem = state.items.find(obj=>obj.id === action.payload);
      if(findItem){
        findItem.count--;
        state.totalPrice = state.items.reduce((sum, obj) => {
          return (obj.price*obj.count) + sum;
        }, 0);
        // if(findItem.count>1){
        //   findItem.count--;
        // }
      }
    },
    removeItem(state, action: PayloadAction<string>){
      state.items = state.items.filter(obj=>obj.id!=action.payload);
      state.totalPrice = state.items.reduce((sum, obj) => {
        return (obj.price*obj.count) + sum;
      }, 0)
    },
    clearItems(state){
        state.items = [];
        state.totalPrice = 0;
    }
    
  },
})



// Action creators are generated for each case reducer function
export const { addItem, minusItem, removeItem, clearItems } = cartSlice.actions

export default cartSlice.reducer