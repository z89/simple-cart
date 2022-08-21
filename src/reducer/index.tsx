import { ICart, IDispatch } from "../context";

export const ACTIONS = {
  ADD: "add",
};

function addCart() {}

export function reducer(state: ICart, action: IDispatch) {
  switch (action.type) {
    case ACTIONS.ADD:
      return;

    default:
      return state;
  }
}
