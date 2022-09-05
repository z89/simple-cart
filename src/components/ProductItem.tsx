import { useContext } from "react";

import { CartContext } from "../context";
import { ACTIONS } from "../reducer";

export const ProductItem = ({ item }) => {
  const { dispatch } = useContext(CartContext);

  return (
    <>
      <br />
      <img style={{ width: "100px" }} src={item.image} />

      <p>name: {item.name}</p>
      <p>price: {item.price.formatted_with_code}</p>

      <button data-cy={item.id} onClick={() => dispatch({ type: ACTIONS.ADD, payload: { ...item, quantity: 1 } })}>
        add to cart
      </button>
      <br />
    </>
  );
};
