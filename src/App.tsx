import { CartStore } from "./store";
import { Cart } from "./components/cart/Cart";
import { ProductItem } from "./components/ProductItem";

import data from "./data/products.json";

function App() {
  const ProductItems = () => {
    if (data.length > 0) {
      return data.map((item) => {
        return <ProductItem key={item.id} item={item} />;
      });
    }
  };

  return (
    <div id="root">
      <CartStore>
        <Cart />
      </CartStore>

      <hr />

      <h3>products:</h3>
      {ProductItems()}
    </div>
  );
}

export default App;
