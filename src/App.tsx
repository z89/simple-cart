import { CartProvider } from "./store";

import { Cart } from "./Cart";

function App() {
  return (
    <CartProvider>
      <Cart />
    </CartProvider>
  );
}

export default App;
