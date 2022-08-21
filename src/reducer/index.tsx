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

// add a new item to cart
function add(state: ICart, item: ICartItem) {
  return {
    length: state.length + 1,
    items: [...state.items, item],
    total: formatToCurrency(state.total.raw + item.price.raw * item.quantity),
  };
}

// update an item in cart
function update(state: ICart, updated: ICartItem, current: ICartItem) {
  let updatedQty = current.quantity + updated.quantity;
  const items = state.items.map((e) => (e.id == updated.id ? { ...e, quantity: updatedQty, total: formatToCurrency(updated.price.raw * updatedQty) } : e));

  return {
    length: state.length,
    items: items,
    total: formatToCurrency(state.total.raw),
  };
}

function addProduct(state, payload) {
  let item: ICartItem = {
    id: generateID(payload.name),
    name: payload.name,
    desc: payload.desc,
    price: formatToCurrency(payload.price), // search the product price from server  };
    quantity: payload.quantity,
    total: formatToCurrency(payload.price * payload.quantity),
  };

  const res = itemExists(state.items, item.id);

  if (res == undefined) {
    return add(state, item);
  } else {
    return update(state, item, res);
  }
}

export function reducer(state: ICart, action: IDispatch) {
  switch (action.type) {
    case ACTIONS.ADD:
      return addProduct(state, action.payload);
  }
}
