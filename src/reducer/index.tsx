import { ICart, ICartItem, IDispatch } from "../context";
import formatToCurrency from "../components/misc/formatToCurrency";
import generateID from "../components/misc/generateID";
import { stat } from "fs";

export const ACTIONS = {
  ADD: "add",
};

// check if item exists in cart
function itemExists(items: ICartItem[], id: string) {
  return items.find((item) => item.id == id);
}

// calculate cart total
function cartTotal(items: ICartItem[]) {
  let total = 0;

  items.map((item) => {
    total += item.total.raw;
  });

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

// update an item in cart
function update(state: ICart, updated: ICartItem, current: ICartItem) {
  const qty = current.quantity + updated.quantity;
  let items = state.items.map((e) => (e.id == updated.id ? { ...e, quantity: qty, total: formatToCurrency(current.price.raw * qty) } : e));

  return {
    length: state.length,
    items: items,
    total: formatToCurrency(cartTotal(items)),
  };
}

function addToCart(state, payload) {
  const res = itemExists(state.items, payload.id);

  if (res != undefined) {
    return update(state, payload, res);
  } else {
    return add(state, payload);
  }
}

export function reducer(state: ICart, action: IDispatch) {
  switch (action.type) {
    case ACTIONS.ADD:
      return addToCart(state, action.payload);
  }
}
