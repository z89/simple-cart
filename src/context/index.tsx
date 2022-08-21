import { createContext } from "react";

import formatToCurrency from "../components/misc/formatToCurrency";

export interface ISubtotal {
  raw: number;
  formatted: string;
  formatted_with_symbol: string;
  formatted_with_code: string;
}

export interface ICartItem {
  id: string;
  name: string;
  desc: string;
  price: ISubtotal;
  quantity: number;
  total: ISubtotal;
}

export interface ICart {
  length: number;
  items: ICartItem[];
  total: ISubtotal;
}

export const initialState: ICart = {
  length: 0,
  items: [],
  total: formatToCurrency(0),
};

export interface IDispatch {
  type: string;
  payload: any;
}

interface ICartContext {
  state: ICart;
  dispatch: React.Dispatch<IDispatch>;
}

export const CartContext = createContext<ICartContext>({ state: initialState, dispatch: () => {} });
