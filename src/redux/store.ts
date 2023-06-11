import { configureStore } from '@reduxjs/toolkit'
import filter from "./slices/filter/slice"
import cart from "./slices/cart/slice"
import pizzas from "./slices/pizzas/slice"
import { useDispatch } from 'react-redux'
export const store = configureStore({
  reducer: { filter: filter,
              cart: cart,
              pizzas: pizzas,
             },
})
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>();


// // Infer the `RootState` and `AppDispatch` types from the store itself
// export type RootState = ReturnType<typeof store.getState>
// // Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
// export type AppDispatch = typeof store.dispatch