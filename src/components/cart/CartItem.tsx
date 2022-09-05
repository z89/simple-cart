import { useContext, useState } from "react";

import { CartContext } from "../../context";
import { ACTIONS } from "../../reducer";

export const CartItem = ({ item }) => {
  const { dispatch } = useContext(CartContext);
  const [quantity, setQuantity] = useState(item.quantity);

  return (
    <div style={{ backgroundColor: "AliceBlue" }} data-cy={"cart_" + item.id}>
      <p data-cy="name">
        <b>{item.name}</b>
      </p>

      <p data-cy="quantity">quantity: {item.quantity}</p>
      <p data-cy="total">total: {item.total.formatted_with_code}</p>

      <button data-cy="remove" onClick={() => dispatch({ type: ACTIONS.REMOVE, payload: { ...item, quantity: 1 } })}>
        remove
      </button>

      <br />

      <input data-cy="input" style={{ width: "40px" }} type="number" value={quantity} onChange={(e) => setQuantity(parseInt(e.target.value))} />
      <button data-cy="update" onClick={() => dispatch({ type: ACTIONS.UPDATE, payload: { ...item, quantity: quantity } })}>
        update quantity
      </button>
    </div>
  );
};
