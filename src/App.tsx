import { CartProvider } from "./store";

import Home from "./Home";

function App() {
  return (
    <CartProvider>
      <Home />
    </CartProvider>
  );
}

export default App;
