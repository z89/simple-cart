import { CartProvider } from "./store";
import Cart from "./components/Cart";

function App() {
  return (
    <CartProvider>
      <h1>cart state:</h1>
      <Cart />
    </CartProvider>
  );
}

export default App;
