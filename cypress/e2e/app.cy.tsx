describe("cart manipulation", () => {
  before(() => {
    cy.clearLocalStorageSnapshot();
  });

  beforeEach(() => {
    cy.restoreLocalStorage();
    cy.visit("/");
  });

  afterEach(() => {
    cy.saveLocalStorage();
  });

  it("add all products to cart", () => {
    cy.fixture("products.json").then((data) => {
      data.forEach((product) => {
        cy.get(`[data-cy=${product.id}] [data-cy=add]`).click();
      });
    });
  });

  it("verify cart exists in localStorage & is persistent on reload", () => {
    cy.getLocalStorage("cart").then((cart) => {
      JSON.parse(cart).items.forEach((item) => {
        cy.get(`[data-cy=${item.id}] [data-cy=remove]`);
      });
    });
  });
});
