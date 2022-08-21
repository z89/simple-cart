import currencyFormat from "../components/misc/currencyFormat";
import { ICart, ICartItem, IDispatch } from "../context";

export const ACTIONS = {
  ADD: "add",
};

function addCart(state, payload) {
  // create a new item
  const item: ICartItem = {
    name: payload.name,
    desc: payload.desc,
    id: state.length + 1,
    price: currencyFormat(10), // search the product price from server
    quantity: payload.quantity,
  };

  return {
    length: state.length + 1,
    items: [...state.items, item],
    total: currencyFormat(state.total.raw + item.price.raw * item.quantity),
  };
}

export function reducer(state: ICart, action: IDispatch) {
  switch (action.type) {
    case ACTIONS.ADD:
      return addCart(state, action.payload);
    default:
      return {
        length: state.length,
        total: state.total,
        items: state.items,
      };
  }
}
