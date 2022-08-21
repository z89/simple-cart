import React, { useContext } from "react";
import { CartContext, ICartItem } from "../context";
import { ACTIONS } from "../reducer";

export default function Product({ item }) {
  const ctx = useContext(CartContext);

  return (
    <div>
      <img style={{ width: "100px" }} src={item.image} />
      <p>{item.name}</p>
      <p>{item.price.formatted_with_code}</p>
      <button onClick={() => ctx.dispatch({ type: ACTIONS.ADD, payload: { ...item, quantity: 1 } })}>Add to Cart</button>
    </div>
  );
}
