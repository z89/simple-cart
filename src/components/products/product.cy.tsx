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
    cy.get('[data-cy="subtitle"]').should("exist");
  });

  it("each product has its components mounted", () => {
    data.forEach((item) => {
      const itemSelector = `[data-cy=${item.id}]`;

      cy.get(itemSelector);

      cy.get(`${itemSelector} [data-cy=img]`);
      cy.get(`${itemSelector} [data-cy=name]`);
      cy.get(`${itemSelector} [data-cy=price]`);
      cy.get(`${itemSelector} [data-cy=button]`);
    });
  });
});
