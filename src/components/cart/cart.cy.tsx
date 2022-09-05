import { Cart } from "./Cart";

describe("initialisation", () => {
  beforeEach(() => {
    cy.mount(<Cart />);
  });

  it("cart component mounts", () => {
    cy.get('[data-cy="root"]').should("exist");
  });

  it("cart title mounts", () => {
    cy.get('[data-cy="title"]').should("exist");
  });

  it("cart subtitle mounts", () => {
    cy.get('[data-cy="subtitle"]').should("exist");
  });

  it("clear cart button mounts", () => {
    cy.get("[data-cy=clear]").should("exist");
  });

  it("length should default to 0", () => {
    cy.get("[data-cy=length]").should("have.text", "length: 0");
  });

  it("total should default to 0", () => {
    cy.get("[data-cy=total]").should("have.text", "total: $0.00 AUD");
  });

  it("items should be empty", () => {
    cy.get('[data-cy="items"] > p').should("have.text", "no items in cart");
  });
});