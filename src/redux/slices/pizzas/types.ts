export type SearchPizzaParams = {
  categoryIdToSend:string;
  currentPage: string;
  sortType: string;
  searchValue: string;
};

export type PizzaItem = {
  id: string;
  title: string;
  types: number[];
  sizes: number[];
  price: number;
  imageUrl: string;
  rating: number;
}
export enum Status {
  LOADING = 'loading',
  SUCCESS='success',
  ERROR = 'error'
}