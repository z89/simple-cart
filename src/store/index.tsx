import { ReactNode, useReducer } from "react";
import { CartContext, initialState } from "../context";
import { reducer } from "../reducer";

export const CartStore = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, localStorage.getItem("cart") != null ? JSON.parse(localStorage.getItem("cart")) : initialState);

  return <CartContext.Provider value={{ state: state, dispatch: dispatch }}>{children}</CartContext.Provider>;
};
