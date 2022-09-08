import { useContext } from "react";

import { CartContext } from "../../context";
import { ACTIONS } from "../../reducer";

export const CartItem = ({ item }) => {
  const { dispatch } = useContext(CartContext);

  return (
    <div style={{ backgroundColor: "AliceBlue" }} data-cy={"cart_" + item.id}>
      <p data-cy="name">
        <b>{item.name}</b>
      </p>

      <p data-cy="quantity">quantity: {item.quantity}</p>
      <p data-cy="total">total: {item.total.formatted_with_code}</p>

      <button data-cy="remove" onClick={() => dispatch({ type: ACTIONS.REMOVE, payload: { product: item } })}>
        remove
      </button>

      <br />
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "80px" }}>
        <button data-cy="decrement" onClick={() => dispatch({ type: ACTIONS.UPDATE, payload: { product: { ...item, quantity: item.quantity - 1 } } })}>
          -
        </button>
        <p> {item.quantity}</p>
        <button data-cy="increment" onClick={() => dispatch({ type: ACTIONS.UPDATE, payload: { product: { ...item, quantity: item.quantity + 1 } } })}>
          +
        </button>
      </div>
    </div>
  );
};
