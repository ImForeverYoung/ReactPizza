import { createAsyncThunk } from "@reduxjs/toolkit";
import { PizzaItem } from "./types";
import axios from 'axios'
type FetchPizzasArgs = Record<string, string>;
export const fetchPizzas = createAsyncThunk<PizzaItem[], FetchPizzasArgs>(
    'pizzas/fetchPizzasStatus',
    async (params/*: FetchPizzasArgs*/) => {
        const {categoryIdToSend,currentPage,sortType,searchValue} = params;
        const {data} = await axios.get<PizzaItem[]>(`https://642d8197bf8cbecdb4082db3.mockapi.io/pizzas?page=${currentPage}&limit=4&${categoryIdToSend}&search=${searchValue}&sortBy=${sortType}&order=desc`)
        // if(data.length == 0){
        //   return thunkAPI.rejectWithValue('No Pizzas!');
        // }
        // return thunkAPI.fulfillWithValue(data);
        return data;
    }
  )