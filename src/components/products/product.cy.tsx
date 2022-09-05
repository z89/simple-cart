import Products from "./Products";
import data from "../../../cypress/fixtures/products.json";

describe("product initialisation", () => {
  beforeEach(() => {
    cy.mount(<Products />);
  });

  it("<Products /> mounts", () => {
    cy.get('[data-cy="products"]').should("exist");
  });

  it("title mounts", () => {
    cy.get('[data-cy="subtitle"]').should("contain", "products:");
  });

  it("each product has all its components mounted", () => {
    data.forEach((item) => {
      const itemSelector = `[data-cy=product_${item.id}]`;

      cy.get(itemSelector).should("exist");

      cy.get(`${itemSelector} [data-cy=img]`).should("have.attr", "src", item.image);
      cy.get(`${itemSelector} [data-cy=name]`).should("contain", item.name);
      cy.get(`${itemSelector} [data-cy=price]`).should("contain", item.price.formatted_with_code);
      cy.get(`${itemSelector} [data-cy=add]`).should("exist");
    });
  });
});
