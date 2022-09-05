import { useContext, useEffect } from "react";

import { CartContext } from "../../context";
import { ACTIONS } from "../../reducer";

export const ProductItem = ({ item }) => {
  const { state, dispatch } = useContext(CartContext);

  let quantity = 0;

  useEffect(() => {
    state.items.map((i) => {
      if (i.id === item.id) {
        quantity = i.quantity;
      }
    });
  }, [state]);

  // console.log(state.items.find((i) => i.id === item.id));

  return (
    <div style={{ backgroundColor: "LavenderBlush" }} data-cy={"product_" + item.id}>
      <p data-cy="name">
        <b>{item.name}</b>
      </p>

      <img data-cy="img" style={{ width: "100px" }} src={item.image} />

      <p data-cy="price">{item.price.formatted_with_code}</p>

      <button data-cy="add" onClick={() => dispatch({ type: ACTIONS.ADD, payload: { ...item, quantity: quantity + 1 } })}>
        add to cart
      </button>
    </div>
  );
};
