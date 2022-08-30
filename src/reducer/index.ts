import { ICart, ICartItem, IDispatch } from "../context";
import formatToCurrency from "../components/misc/formatToCurrency";

export const ACTIONS = {
  UPDATE: "update",
  ADD: "add",
  REMOVE: "remove",
  CLEAR: "clear",
};

// calculate cart total
function total(items: ICartItem[]) {
  let total = 0;

  items.length > 0
    ? items.map((item) => {
        total += item.total.raw;
      })
    : null;

  return total;
}

// update & retrieve cart from localStorage
function cart(products: ICartItem[]) {
  localStorage.setItem(
    "cart",
    JSON.stringify({
      length: products.length,
      items: products,
      total: formatToCurrency(total(products)),
    })
  );

  return JSON.parse(localStorage.getItem("cart"));
}

// add a new item to cart
function add(state: ICart, payload: ICartItem) {
  return cart([...state.items, { ...payload, quantity: payload.quantity, total: formatToCurrency(payload.quantity * payload.price.raw) }]);
}

// update an item in cart
function update(state: ICart, action: IDispatch) {
  const item = action.payload;

  return cart(state.items.map((old) => (old.id == item.id ? { ...item, quantity: item.quantity, total: formatToCurrency(item.price.raw * item.quantity) } : old)));
}

// remove an item from cart
function remove(state: ICart, target: ICartItem) {
  const items = [...state.items];

  items.splice(
    state.items.findIndex((p) => p.id == target.id),
    1
  );

  return cart([...items]);
}

export function reducer(state: ICart, action: IDispatch) {
  const target = action.type != ACTIONS.CLEAR ? state.items.find((item) => item.id == action.payload.id) : null;

  switch (action.type) {
    case ACTIONS.CLEAR:
      return cart([]);
    case ACTIONS.UPDATE:
      if (action.payload.quantity > 0) {
        return update(state, action);
      } else {
        return target != undefined ? remove(state, target) : state;
      }
    case ACTIONS.ADD:
      if (target != undefined) {
        return update(state, action);
      } else {
        return add(state, action.payload);
      }
    case ACTIONS.REMOVE:
      if (target != undefined) {
        return remove(state, action.payload);
      } else {
        return state;
      }
    default:
      console.error("a correct action type was not specified!");
  }
}
