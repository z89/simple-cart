import { ICart, ICartItem, IDispatch } from "../context";
import formatToCurrency from "../components/misc/formatToCurrency";

export const ACTIONS = {
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

// return cart with updated products
function cart(products: ICartItem[]) {
  return {
    length: products.length,
    items: products,
    total: formatToCurrency(total(products)),
  };
}

// add a new item to cart
function add(state: ICart, target: ICartItem) {
  return cart([...state.items, { ...target, total: formatToCurrency(target.quantity * target.price.raw) }]);
}

// update an item in cart
function update(state: ICart, action: IDispatch, target: ICartItem) {
  const qty = action.type == ACTIONS.ADD ? target.quantity + action.payload.quantity : target.quantity - action.payload.quantity;

  return cart(state.items.map((e) => (e.id == action.payload.id ? { ...e, quantity: qty, total: formatToCurrency(target.price.raw * qty) } : e)));
}

// remove an item from cart
function remove(state: ICart, target: ICartItem) {
  const items = [...state.items.map((p) => p)];

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
    case ACTIONS.ADD:
      if (target != undefined) {
        return update(state, action, target);
      } else {
        return add(state, action.payload);
      }
    case ACTIONS.REMOVE:
      if (target != undefined) {
        if (target.quantity == 1) {
          return remove(state, action.payload);
        } else if (target.quantity > 1) {
          return update(state, action, target);
        }
      } else {
        return state;
      }
    default:
      console.error("a correct action type was not specified!");
  }
}
