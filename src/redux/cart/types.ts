export type CartItem = {
  id: string;
  title: string;
  types: string;
  price: number;
  count: number;
  imageUrl: string;
  sizes: number;
};

export interface CartSliceState {
  totalPrice: number;
  items: CartItem[];
}
