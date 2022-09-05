import App from "./App";

import data from "../cypress/fixtures/products.json";

describe("product manipulation", () => {
  beforeEach(() => {
    cy.mount(<App />);
  });

  it("add all products to cart", () => {
    data.forEach((item) => {
      cy.get(`[data-cy=${item.id}] > [data-cy="button"]`).click();
    });
  });
});
