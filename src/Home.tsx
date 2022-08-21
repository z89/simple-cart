import { CartContext } from "./context";
import { useContext } from "react";
import { ACTIONS } from "./reducer";
import currencyFormat from "./components/misc/currencyFormat";

export default function Home() {
  const { state, dispatch } = useContext(CartContext);

  const handleSumbit = (e: any) => {
    const form = e.target;
    // Cart.Add(;

    // form.itemName.value != "" && form.itemDesc.value != "" ? console.log() : console.error("form has empty values");

    e.preventDefault();
  };

  return (
    <div>
      <h1>cart state:</h1>
      <p>cart length: {state.length}</p>
      <h1>add item:</h1>
      <button
        onClick={() =>
          dispatch({
            type: ACTIONS.ADD,
            payload: {
              name: "item",
              desc: "item desc",
              quantity: 1,
            },
          })
        }
      >
        create item
      </button>
    </div>
  );
}
