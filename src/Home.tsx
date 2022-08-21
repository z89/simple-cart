import { CartContext } from "./context";
import { useContext, useEffect } from "react";

import { ACTIONS } from "./reducer";

export default function Home() {
  const { state, dispatch } = useContext(CartContext);

  //   useEffect(() => {
  //     console.log(state);
  //   }, [state]);

  return (
    <div>
      <h1>cart state:</h1>
      <p>cart length: {state.length}</p>
      <p>cart product 1 quantity: {state.items[1]?.quantity}</p>
      <p>cart total: {state.total.formatted_with_code}</p>
      {state.items.map((item) => (
        <div key={item.id}>
          <p>{JSON.stringify(item, null, 1)}</p>
        </div>
      ))}
      <button onClick={() => dispatch({ type: ACTIONS.ADD, payload: { name: "item", desc: "item desc", price: 10, quantity: 1 } })}>add product to cart</button>
      <button onClick={() => dispatch({ type: ACTIONS.ADD, payload: { name: "anotheritem", desc: "item desc", price: 10, quantity: 1 } })}>add product to cart</button>
      <button onClick={() => dispatch({ type: ACTIONS.ADD, payload: { name: "anotheritem1", desc: "item desc", price: 10, quantity: 1 } })}>add product to cart</button>
    </div>
  );
}
