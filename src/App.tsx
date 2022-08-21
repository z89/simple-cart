import { CartProvider } from "./store";

import Example from "./Example";

function App() {
  return (
    <CartProvider>
      <Example />
    </CartProvider>
  );
}

export default App;
