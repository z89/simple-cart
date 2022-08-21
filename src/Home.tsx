import { CartContext } from "./context";
import { useContext, useEffect } from "react";

import { ACTIONS } from "./reducer";
import Product from "./components/Product";

import data from "./data/products.json";

export default function Home() {
  const { state, dispatch } = useContext(CartContext);

  useEffect(() => {
    console.log(state);
  }, [state]);

  const Products = () => {
    if (data.length > 0) {
      return data.map((item) => {
        return <Product key={item.id} item={item} />;
      });
    }
  };

  return (
    <div>
      <h1>cart state:</h1>
      <p>cart length: {state.length}</p>
      <p>cart total: {state.total.formatted_with_code}</p>
      <button onClick={() => dispatch({ type: ACTIONS.CLEAR })}>clear cart</button>
      {Products()}
    </div>
  );
}
