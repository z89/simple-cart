import { useContext } from "react";

import { CartContext } from "./context";
import { ACTIONS } from "./reducer";
import { ProductItem } from "./components/ProductItem";
import { CartItem } from "./components/CartItem";

import data from "./data/products.json";

export const Cart = () => {
  const { state, dispatch } = useContext(CartContext);

  const ProductItems = () => {
    if (data.length > 0) {
      return data.map((item) => {
        return <ProductItem key={item.id} item={item} />;
      });
    }
  };

  const CartItems = () => {
    if (state.items.length > 0) {
      return state.items.map((item) => {
        return <CartItem key={item.id} item={item} />;
      });
    } else {
      return <p>No items in cart</p>;
    }
  };

  return (
    <div>
      <h1>cart:</h1>
      <p>length: {state.length}</p>
      <p>total: {state.total.formatted_with_code}</p>

      <button onClick={() => dispatch({ type: ACTIONS.CLEAR })}>clear cart</button>

      <h3>cart items:</h3>
      <hr />
      {CartItems()}

      <h3>products:</h3>
      <hr />
      {ProductItems()}
    </div>
  );
};
