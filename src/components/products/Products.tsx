import { ProductItem } from "./ProductItem";

import data from "../../data/products.json";

const Products = () => {
  const ProductItems = () => {
    if (data.length > 0) {
      return data.map((item) => {
        return <ProductItem key={item.id} item={item} />;
      });
    }
  };

  return (
    <div data-cy="products">
      <h3 data-cy="subtitle">products:</h3>
      <div data-cy="items">{ProductItems()}</div>
    </div>
  );
};

export default Products;
