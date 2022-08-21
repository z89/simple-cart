import { createContext } from "react";

import currencyFormat from "../components/misc/currencyFormat";

interface ISubtotal {
  raw: number;
  formatted: string;
  formatted_with_symbol: string;
  formatted_with_code: string;
}

interface ICartItem {
  name: string;
  id: string;
  price: ISubtotal;
  quantity: number;
  total: ISubtotal;
}

export interface ICart {
  length: number;
  items: ICartItem[];
  balance: ISubtotal;
}

export const initialState: ICart = {
  length: 0,
  items: [],
  balance: { raw: 0, formatted: "0", formatted_with_code: currencyFormat(0, true), formatted_with_symbol: currencyFormat(0, false) },
};

interface ICartContext {
  state: ICart;
  dispatch: React.Dispatch<{ type: string }>;
}

export const CartContext = createContext<ICartContext>({ state: initialState, dispatch: () => {} });
