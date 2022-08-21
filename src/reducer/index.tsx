import { ICart, ICartItem, IDispatch } from "../context";
import formatToCurrency from "../components/misc/formatToCurrency";
import generateID from "../components/misc/generateID";
import { stat } from "fs";

export const ACTIONS = {
  ADD: "add",
};

// check if item exists in cart
function itemExists(items: ICartItem[], id: string) {
  let index = -1;

  items.map((item, idx) => {
    if (item.id == id) {
      index = idx;
    }
  });

  return index;
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
function update(state: ICart, item: ICartItem, index: number) {
  item.quantity += state.items[index].quantity;
  item.total = formatToCurrency(item.price.raw * item.quantity);

  return {
    length: state.length,
    items: [...state.items.slice(0, index), item],
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

  if (res == -1) {
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
