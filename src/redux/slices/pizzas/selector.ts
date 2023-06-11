import { RootState } from "../../store";

export const selectPizzaData = (state: RootState) => state.pizzas;
export const selectPizzaById = (id: string) => (state: RootState) => 
state.pizzas.items.find((obj) => obj.id===id);