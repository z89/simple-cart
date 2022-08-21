import { ICart } from "../context";

// export const ACTIONS = {
//   LOAD: "load",
// };

export function reducer(state: ICart, action: { type: string }) {
  switch (action.type) {
    // case ACTIONS.LOAD:
    //   return state;
    default:
      return state;
  }
}
