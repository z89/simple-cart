import { useContext } from "react";

import { CartContext } from "../../context";
import { ACTIONS } from "../../reducer";

export const ProductItem = ({ item }) => {
  const { dispatch } = useContext(CartContext);

  return (
    <div data-cy={item.id}>
      <img data-cy="img" style={{ width: "100px" }} src={item.image} />

      <p data-cy="name">{item.name}</p>
      <p data-cy="price">{item.price.formatted_with_code}</p>

      <button data-cy="button" onClick={() => dispatch({ type: ACTIONS.ADD, payload: { ...item, quantity: 1 } })}>
        add to cart
      </button>
    </div>
  );
};
