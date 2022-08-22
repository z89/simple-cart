import { useContext, useState } from "react";
import { CartContext } from "../context";
import { ACTIONS } from "../reducer";

export default function Product({ item }) {
  const { dispatch } = useContext(CartContext);
  const [quantity, setQuantity] = useState(0);

  return (
    <div>
      <img style={{ width: "100px" }} src={item.image} />
      <p>{item.name}</p>
      <p>{item.price.formatted_with_code}</p>
      <button onClick={() => dispatch({ type: ACTIONS.ADD, payload: { ...item, quantity: 1 } })}>add</button>
      <button onClick={() => dispatch({ type: ACTIONS.REMOVE, payload: { ...item, quantity: 1 } })}>remove</button>
      <input style={{ width: "40px" }} type="number" value={quantity} onChange={(e) => setQuantity(parseInt(e.target.value))} />
      <button onClick={() => dispatch({ type: ACTIONS.UPDATE, payload: { ...item, quantity: quantity } })}>update quantity</button>
    </div>
  );
}
