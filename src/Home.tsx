import { CartContext } from "./context";
import { useContext, useEffect } from "react";
import { ACTIONS } from "./reducer";
import currencyFormat from "./components/misc/currencyFormat";

export default function Home() {
  const { state, dispatch } = useContext(CartContext);

  useEffect(() => {
    console.log(state);
  }, [state]);

  return (
    <div>
      <h1>cart state:</h1>
      <p>cart length: {state.length}</p>
      <h1>add item:</h1>
      <button
        onClick={() => {
          console.log("called");
          dispatch({
            type: ACTIONS.ADD,
            payload: {
              name: "item",
              desc: "item desc",
              quantity: 2,
            },
          });
        }}
      >
        create item
      </button>
    </div>
  );
}
