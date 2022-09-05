import Cart from "./Cart";

describe("cart initialisation", () => {
  beforeEach(() => {
    cy.mount(<Cart />);
  });

  it("<Cart /> mounts", () => {
    cy.get('[data-cy="cart"]').should("exist");
  });

  it("title mounts", () => {
    cy.get('[data-cy="title"]').should("exist");
  });

  it("subtitle mounts", () => {
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
