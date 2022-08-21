import { ICart, ICartItem, IDispatch } from "../context";
import formatToCurrency from "../components/misc/formatToCurrency";

export const ACTIONS = {
  ADD: "add",
  REMOVE: "remove",
};

// check if item exists in cart
function itemExists(items: ICartItem[], id: string) {
  return items.find((item) => item.id == id);
}

// calculate cart total
function cartTotal(items: ICartItem[]) {
  let total = 0;
  if (items.length > 0) {
    items.map((item) => {
      total += item.total.raw;
    });
  }
  return total;
}

// add a new item to cart
function add(state: ICart, item: ICartItem) {
  let items = [...state.items, { ...item, total: formatToCurrency(item.quantity * item.price.raw) }];

  return {
    length: state.length + 1,
    items: items,
    total: formatToCurrency(cartTotal(items)),
  };
}

// remove an item from cart
function remove(state: ICart, item: ICartItem) {
  let idx = 0;
  let items = state.items.map((e, index) => {
    if (e.id == item.id) {
      idx = index;
    } else {
      return e;
    }
  });

  items.splice(idx, 1);
  // state.items.map((p, index) => (p.id == item.id ? c.items.splice(index, 1) : null));
  console.log(items);

  return {
    length: items.length,
    items: items,
    total: formatToCurrency(cartTotal(items)),
  };
}

// increment an item in cart
function increment(state: ICart, updated: ICartItem, item: ICartItem) {
  const qty = item.quantity + updated.quantity;
  let items = state.items.map((e) => (e.id == updated.id ? { ...e, quantity: qty, total: formatToCurrency(item.price.raw * qty) } : e));

  return {
    length: state.length,
    items: items,
    total: formatToCurrency(cartTotal(items)),
  };
}

// increment an item in cart
function decrement(state: ICart, updated: ICartItem, item: ICartItem) {
  const qty = item.quantity - updated.quantity;
  let items = state.items.map((e) => (e.id == updated.id ? { ...e, quantity: qty, total: formatToCurrency(item.price.raw * qty) } : e));

  return {
    length: state.length,
    items: items,
    total: formatToCurrency(cartTotal(items)),
  };
}

function addToCart(state, payload) {
  const res = itemExists(state.items, payload.id);

  if (res != undefined) {
    return increment(state, payload, res);
  } else {
    return add(state, payload);
  }
}

function removeFromCart(state, payload) {
  const res = itemExists(state.items, payload.id);

  if (res != undefined) {
    if (res.quantity == 1) {
      return remove(state, payload);
    } else if (res.quantity > 1) {
      return decrement(state, payload, res);
    }
  } else {
    console.log("reacheer");

    return state;
  }
}

export function reducer(state: ICart, action: IDispatch) {
  switch (action.type) {
    case ACTIONS.ADD:
      return addToCart(state, action.payload);
    case ACTIONS.REMOVE:
      return removeFromCart(state, action.payload);
  }
}
