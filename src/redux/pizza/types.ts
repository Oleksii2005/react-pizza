export type PizzaItem = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  types: number[];
  sizes: number[];
};

export enum Status {
  LOADING = "loading",
  SUCCESS = "success",
  ERROR = "error",
}
export interface PizzaSliceState {
  items: PizzaItem[];
  status: Status;
}

export type fetchPizzasArgs = Record<string, string>;

export type SearchPizzaParams = {
  mainUrl: string;
  currentPage: string;
  category: string;
  sortBy: string;
  order: string;
  search: string;
};
