import formatToCurrency, { symbolFormatting } from "../../src/components/misc/formatToCurrency";

function checkCartValues(length) {
  // check cart has correct localStorage values

  cy.getLocalStorage("cart").then((c) => {
    let cart = JSON.parse(c);

    // calculate total price of all items in cart
    let total = 0;
    cart.items.map((item) => (total += item.price.raw * item.quantity));

    // check cart has correct localStorage values
    expect(cart.length).to.equal(length);
    expect(cart.items.length).to.equal(length);
    expect(JSON.stringify(cart.total)).to.equal(JSON.stringify(formatToCurrency(total)));

    // check cart item DOM values match localStorage values
    cart.items.forEach((item) => {
      const itemSelector = `[data-cy=cart_${item.id}]`;

      cy.get(`${itemSelector} [data-cy=name]`).should("contain", item.name);
      cy.get(`${itemSelector} [data-cy=quantity]`).should("contain", `quantity: ${item.quantity}`);
      cy.get(`${itemSelector} [data-cy=total]`).should("contain", `total: ${symbolFormatting(item.price.raw * item.quantity, "AUD")}`);
    });

    // check cart DOM values match localStorage values
    cy.get("[data-cy=cart] [data-cy=length]").should("contain", `length: ${cart.items.length}`);
    cy.get("[data-cy=cart] [data-cy=total]").should("contain", `total: ${symbolFormatting(total, "AUD")}`);
  });
}

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

  describe("adding all products to cart", () => {
    it("clicking 'add to cart' button for each product", () => {
      cy.fixture("products.json").then((data) => {
        data.forEach((product) => {
          // click 'add to cart' button for each product
          cy.get(`[data-cy=product_${product.id}] [data-cy=add]`).click();
        });
      });
    });

    it("check products were correctly added to cart", () => {
      cy.fixture("products.json").then((data) => {
        checkCartValues(data.length);
      });
    });
  });

  describe("updating all cart item quantities", () => {
    it("updating each item quantity via input & button", () => {
      cy.fixture("products.json").then((data) => {
        data.forEach((product) => {
          const itemSelector = `[data-cy=cart_${product.id}]`;

          // update quantity input to 5 & click update
          cy.get(`${itemSelector} > [data-cy=input]`).invoke("val", "").type("5");
          cy.get(`${itemSelector} [data-cy=update]`).click();
        });
      });
    });

    it("check cart items were correctly updated in cart", () => {
      cy.fixture("products.json").then((data) => {
        checkCartValues(data.length);
      });
    });
  });

  describe("update a single cart item quantity", () => {
    it("updating the cart item quantity via input & button", () => {
      cy.fixture("products.json").then((data) => {
        const itemSelector = `[data-cy=cart_${data[0].id}]`;

        // update quantity input to 5 & click update
        cy.get(`${itemSelector} > [data-cy=input]`).invoke("val", "").type("50");
        cy.get(`${itemSelector} [data-cy=update]`).click();
      });
    });

    it("check cart item quantity was updated in cart", () => {
      cy.fixture("products.json").then((data) => {
        checkCartValues(data.length);
      });
    });
  });

  describe("remove a single product", () => {
    it("removing a product", () => {
      cy.fixture("products.json").then((data) => {
        const itemSelector = `[data-cy=cart_${data[1].id}]`;

        // click the remove button on cart item
        cy.get(`${itemSelector} [data-cy=remove]`).click();
      });
    });

    it("check cart has correct values after removing item", () => {
      checkCartValues(JSON.parse(localStorage.getItem("cart")).items.length);
    });
  });

  describe("add a single product", () => {
    it("adding a product", () => {
      cy.fixture("products.json").then((data) => {
        const itemSelector = `[data-cy=product_${data[1].id}]`;

        // click the 'add to cart' button on cart item
        cy.get(`${itemSelector} [data-cy=add]`).click();
      });
    });

    it("check cart has correct values after adding item", () => {
      checkCartValues(JSON.parse(localStorage.getItem("cart")).items.length);
    });
  });

  describe("increment a single product", () => {
    it("incrementing product", () => {
      cy.fixture("products.json").then((data) => {
        const itemSelector = `[data-cy=product_${data[1].id}]`;

        // click the 'add to cart' button on cart item
        cy.get(`${itemSelector} [data-cy=add]`).click();
      });
    });

    it("check cart has correct values after incrementing item", () => {
      checkCartValues(JSON.parse(localStorage.getItem("cart")).items.length);
    });
  });

  describe("cart persistence in localStorage", () => {
    it("check cart is persistent after reload", () => {
      cy.reload();

      checkCartValues(JSON.parse(localStorage.getItem("cart")).items.length);
    });
  });

  describe("clear cart", () => {
    it("clear cart via button", () => {
      cy.get("[data-cy=cart] [data-cy=clear]").click();
    });

    it("check cart items has been cleared", () => {
      cy.get("[data-cy=items] > p").should("contain", "no items in cart");
    });

    it("check cart has correct values after clearing", () => {
      checkCartValues(JSON.parse(localStorage.getItem("cart")).items.length);
    });
  });
});
