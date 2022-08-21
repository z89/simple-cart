import { createContext } from "react";

import currencyFormat from "../components/misc/currencyFormat";

export interface ISubtotal {
  raw: number;
  formatted: string;
  formatted_with_symbol: string;
  formatted_with_code: string;
}

export interface ICartItem {
  name: string;
  desc: string;
  id: string;
  price: ISubtotal;
  quantity: number;
}

export interface ICart {
  length: number;
  items: ICartItem[];
  balance: ISubtotal;
}

export const initialState: ICart = {
  length: 0,
  items: [],
  balance: currencyFormat(0),
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
