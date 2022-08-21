import { useContext } from "react";
import { CartContext } from "../context";

export default function ShowCart() {
  const { state } = useContext(CartContext);

  return (
    <div>
      <p>length: {state.length}</p>
    </div>
  );
}
