import { useContext } from "react";

import { CartContext } from "../../context";
import { ACTIONS } from "../../reducer";

import { CartItem } from "./CartItem";

const Cart = () => {
  const { state, dispatch } = useContext(CartContext);

  const CartItems = () => {
    if (state.items.length > 0) {
      return state.items.map((item) => {
        return <CartItem key={item.id} item={item} />;
      });
    } else {
      return <p>no items in cart</p>;
    }
  };

  return (
    <div data-cy="cart">
      <h1 data-cy="title">cart:</h1>
      <p data-cy="length">length: {state.length}</p>
      <p data-cy="total">total: {state.total.formatted_with_code}</p>

      <button data-cy="clear" onClick={() => dispatch({ type: ACTIONS.CLEAR })}>
        clear cart
      </button>

      <h3 data-cy="subtitle">items:</h3>
      <div data-cy="items">{CartItems()}</div>
    </div>
  );
};

export default Cart;
