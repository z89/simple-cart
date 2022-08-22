import { useEffect } from "react";

import { CartContext } from "./context";
import { useContext } from "react";
import { ACTIONS } from "./reducer";

import data from "./data/products.json";
import ProductItem from "./components/ProductItem";
import CartItem from "./components/CartItem";

export default function Example() {
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
      <h1>cart state:</h1>
      <p>cart length: {state.length}</p>
      <p>cart total: {state.total.formatted_with_code}</p>
      <button onClick={() => dispatch({ type: ACTIONS.CLEAR })}>clear cart</button>

      <h3>cart items</h3>
      <hr />
      {CartItems()}

      <h3>products</h3>
      <hr />
      {ProductItems()}
    </div>
  );
}
