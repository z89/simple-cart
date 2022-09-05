import { useContext, useState } from "react";

import { CartContext } from "../../context";
import { ACTIONS } from "../../reducer";

export const CartItem = ({ item }) => {
  const { dispatch } = useContext(CartContext);
  const [quantity, setQuantity] = useState(item.quantity);

  return (
    <>
      <br />
      <img style={{ width: "100px" }} src={item.image} />

      <p>name: {item.name}</p>
      <p>price: {item.price.formatted_with_code}/each</p>
      <p>quantity: {item.quantity}</p>
      <p>total: {item.total.formatted_with_code}</p>

      <button onClick={() => dispatch({ type: ACTIONS.REMOVE, payload: { ...item, quantity: 1 } })}>remove</button>
      <br />
      <input style={{ width: "40px" }} type="number" value={quantity} onChange={(e) => setQuantity(parseInt(e.target.value))} />
      <button onClick={() => dispatch({ type: ACTIONS.UPDATE, payload: { ...item, quantity: quantity } })}>update quantity</button>
    </>
  );
};
