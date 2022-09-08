import { ICart, IProduct, IPayload, IDispatch, initialState } from "../context";
import { formatToCurrency } from "../components/misc/formatToCurrency";

export const ACTIONS = {
  UPDATE: "update",
  ADD: "add",
  REMOVE: "remove",
  CLEAR: "clear",
};

// calculate cart total
function total(items: IProduct[]) {
  let total = 0;

  items.length > 0
    ? items.map((item) => {
        total += item.total.raw;
      })
    : null;

  return total;
}

// update & retrieve cart from localStorage
function cart(products: IProduct[]) {
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
function add(state: ICart, payload: IPayload) {
  return cart([...state.items, { ...payload.product, quantity: payload.product.quantity, total: formatToCurrency(payload.product.quantity * payload.product.price.raw) }]);
}

// update an item in cart
function update(state: ICart, action: IDispatch) {
  const item = action.payload.product;
  const quantity = action.payload.product.quantity;

  return cart(state.items.map((old) => (old.id == item.id ? { ...item, quantity: quantity, total: formatToCurrency(item.price.raw * quantity) } : old)));
}

// remove an item from cart
function remove(state: ICart, target: IProduct) {
  const items = [...state.items];

  items.splice(
    state.items.findIndex((p) => p.id == target.id),
    1
  );

  return cart([...items]);
}

function findTarget(state: ICart, action: IDispatch) {
  return action.payload != undefined ? state.items.find((item) => item.id == action.payload.product.id) : null;
}

export function reducer(state: ICart, action: IDispatch) {
  const target = findTarget(state, action);

  switch (action.type) {
    case ACTIONS.CLEAR:
      return cart(initialState.items);
    case ACTIONS.UPDATE:
      if (action.payload.product.quantity > 0) {
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
        return remove(state, action.payload.product);
      } else {
        return state;
      }
    default:
      console.error("a correct action type was not specified!");
  }
}
