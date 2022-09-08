import CartStore from "./store";
import Cart from "./components/cart/Cart";
import Products from "./components/products/Products";

function App() {
  return (
    <>
      <CartStore>
        <Cart />
        <hr />
        <Products />
      </CartStore>
    </>
  );
}

export default App;
