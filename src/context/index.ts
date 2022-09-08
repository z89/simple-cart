import { createContext } from "react";

import { formatToCurrency } from "../components/misc/formatToCurrency";

export interface IPrice {
  raw: number;
  formatted: string;
  formatted_with_symbol: string;
  formatted_with_code: string;
}

export interface IProduct {
  id: string;
  image: string;
  name: string;
  desc: string;
  price: IPrice;
  quantity: number;
  total: IPrice;
}

export interface ICart {
  length: number;
  items: IProduct[];
  total: IPrice;
}

export interface IPayload {
  product: IProduct;
}

export interface IDispatch {
  type: string;
  payload?: IPayload;
}

interface ICartContext {
  state: ICart;
  dispatch: React.Dispatch<IDispatch>;
}

export const initialState: ICart = {
  length: 0,
  items: [],
  total: formatToCurrency(0),
};

export const CartContext = createContext<ICartContext>({ state: initialState, dispatch: () => {} });
