import { useContext } from "react";
import { CartContext, ICartItem } from "../context";

export default function Cart() {
  const { state } = useContext(CartContext);

  function length() {
    return state.length;
  }

  function items() {
    return state.items;
  }
}
