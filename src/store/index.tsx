import { ReactNode, useReducer } from "react";
import { CartContext, initialState } from "../context";
import { reducer } from "../reducer";

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return <CartContext.Provider value={{ state: state, dispatch: dispatch }}>{children}</CartContext.Provider>;
};
