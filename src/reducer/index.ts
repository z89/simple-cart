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
  return cart([...state.items, { ...payload, total: formatToCurrency(payload.quantity * payload.price.raw) }]);
}

// update an item in cart
function update(state: ICart, action: IDispatch, target: ICartItem) {
  const qty = target.quantity + action.payload.quantity;

  return cart(state.items.map((e) => (e.id == action.payload.id ? { ...e, quantity: qty, total: formatToCurrency(target.price.raw * qty) } : e)));
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
        return add(target != undefined ? remove(state, target) : state, action.payload);
      } else {
        return target != undefined ? remove(state, target) : state;
      }
    case ACTIONS.ADD:
      if (target != undefined) {
        return update(state, action, target);
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
