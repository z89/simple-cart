import { ICart, ICartItem, IDispatch } from "../context";
import formatToCurrency from "../components/misc/formatToCurrency";

export const ACTIONS = {
  ADD: "add",
  REMOVE: "remove",
  CLEAR: "clear",
};

// check if an item exists in cart
function itemExists(items: ICartItem[], id: string) {
  return items.find((item) => item.id == id);
}

// return cart with updated products
function cart(products) {
  return {
    length: products.length,
    items: products,
    total: formatToCurrency(cartTotal(products)),
  };
}

// calculate cart total
function cartTotal(items: ICartItem[]) {
  let total = 0;
  items.length > 0
    ? items.map((item) => {
        total += item.total.raw;
      })
    : null;

  return total;
}

// add a new item to cart
function add(state: ICart, item: ICartItem) {
  return cart([...state.items, { ...item, total: formatToCurrency(item.quantity * item.price.raw) }]);
}

// remove an item from cart
function remove(state: ICart, item: ICartItem) {
  let idx = 0;
  const items = state.items.map((e, index) => {
    if (e.id == item.id) {
      idx = index;
    } else {
      return e;
    }
  });
  items.splice(idx, 1);

  return cart(items);
}

// update an item in cart
function update(state: ICart, updated: ICartItem, item: ICartItem, mode: string) {
  const qty = mode == "increment" ? item.quantity + updated.quantity : item.quantity - updated.quantity;

  return cart(state.items.map((e) => (e.id == updated.id ? { ...e, quantity: qty, total: formatToCurrency(item.price.raw * qty) } : e)));
}

function addToCart(state, payload) {
  const res = itemExists(state.items, payload.id);

  if (res == undefined) {
    return add(state, payload);
  } else {
    return update(state, payload, res, "increment");
  }
}

function removeFromCart(state, payload) {
  const res = itemExists(state.items, payload.id);

  if (res != undefined) {
    if (res.quantity == 1) {
      return remove(state, payload);
    } else if (res.quantity > 1) {
      return update(state, payload, res, "decrement");
    }
  } else {
    return state;
  }
}

export function reducer(state: ICart, action: IDispatch) {
  switch (action.type) {
    case ACTIONS.ADD:
      return addToCart(state, action.payload);
    case ACTIONS.REMOVE:
      return removeFromCart(state, action.payload);
    case ACTIONS.CLEAR:
      return cart([]);
  }
}
