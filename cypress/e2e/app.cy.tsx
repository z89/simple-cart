import { add, findLastIndex } from "cypress/types/lodash";
import { formatToCurrency, symbolFormatting } from "../../src/components/misc/formatToCurrency";

function checkCartValues(expectedProducts, expectedLength, expectedTotal) {
  // check cart has correct localStorage values
  cy.getLocalStorage("cart").then((c) => {
    expect(c, "cart from localStorage is null").not.be.null;

    let cart = JSON.parse(c);

    // check localStorage cart
    expect(cart.length).equal(expectedLength);
    expect(JSON.stringify(cart.items)).equal(JSON.stringify(expectedProducts));
    expect(JSON.stringify(cart.total)).equal(JSON.stringify(expectedTotal));

    //  check DOM values match valid localStorage cart
    cart.items.forEach((item) => {
      const itemSelector = `[data-cy=cart_${item.id}]`;

      cy.get(`${itemSelector} [data-cy=name]`).should("contain", item.name);
      cy.get(`${itemSelector} [data-cy=quantity]`).should("contain", `quantity: ${item.quantity}`);
      cy.get(`${itemSelector} [data-cy=total]`).should("contain", `total: ${symbolFormatting(item.price.raw * item.quantity, "AUD")}`);
    });

    cy.get("[data-cy=cart] [data-cy=length]").should("contain", `length: ${cart.items.length}`);
    cy.get("[data-cy=cart] [data-cy=total]").should("contain", `total: ${symbolFormatting(expectedTotal.raw, "AUD")}`);
  });
}

function check(fixture, quantity, type) {
  cy.fixture(fixture).then((data) => {
    let products = [];
    let res = (product, quantity) => products.push({ ...product, quantity: quantity, total: formatToCurrency(product.price.raw * quantity) });

    data.forEach((product) => {
      switch (type) {
        case "add":
          res(product, quantity);
          return;
        case "remove":
          if (product.id !== data[0].id) {
            res(product, quantity);
          }
          return;
        case "single":
          if (product.id === data[data.length - 1].id) {
            res(product, quantity + 1);
          } else {
            res(product, quantity);
          }
          return;
      }
    });

    checkCartValues(products, products.length, formatToCurrency(products.reduce((total, product) => total + product.price.raw * product.quantity, 0)));
  });
}
function addProducts(fixture) {
  cy.fixture(fixture).then((data) => {
    data.forEach((product) => {
      // click 'add to cart' on product
      cy.get(`[data-cy=product_${product.id}] [data-cy=add]`).click();
    });
  });
}

describe("cart manipulation", () => {
  // choose the example fixture to test on
  const fixture = "products";

  // generate random number for tests
  const rand = Math.floor(Math.random() * 10) + 1;

  before(() => {
    cy.clearLocalStorageSnapshot();
  });

  beforeEach(() => {
    cy.visit("/");
  });

  describe("checking example fixture has at least one product", () => {
    it("contains at least one product", () => {
      cy.fixture(fixture).then((products) => {
        expect(products.length).greaterThan(0);
      });
    });
  });

  describe("adding products to cart", () => {
    it("clicking 'add to cart' for each product", () => {
      addProducts(fixture);

      check(fixture, 1, "add");
    });
  });

  describe("updating cart item quantities", () => {
    it(`clicking 'increment' ${rand} times on each cart item`, () => {
      addProducts(fixture);

      cy.fixture(fixture).then((data) => {
        data.forEach((product) => {
          const itemSelector = `[data-cy=cart_${product.id}]`;

          // click '+' three times on each item
          for (let i = 0; i < rand; i++) {
            cy.get(`${itemSelector} [data-cy=increment]`).click();
          }
        });
      });

      check(fixture, rand + 1, "add");
    });

    it("clicking 'decrement' once on each cart item", () => {
      addProducts(fixture);

      cy.fixture(fixture).then((data) => {
        data.forEach((product) => {
          const itemSelector = `[data-cy=cart_${product.id}]`;

          // click '+' three times on each item
          for (let i = 0; i < rand; i++) {
            cy.get(`${itemSelector} [data-cy=increment]`).click();
          }

          // click '-' once on each item
          cy.get(`${itemSelector} [data-cy=decrement]`).click();
        });
      });

      check(fixture, rand, "add");
    });
  });

  describe("remove a cart item", () => {
    it("clicking 'remove' on first cart item", () => {
      addProducts(fixture);

      cy.fixture(fixture).then((data) => {
        const itemSelector = `[data-cy=cart_${data[0].id}]`;

        // click the 'remove' on first cart item
        cy.get(`${itemSelector} [data-cy=remove]`).click();
      });

      check(fixture, 1, "remove");
    });
  });

  describe("increment a cart item via 'add to cart'", () => {
    it("clicking 'add to cart' on last product", () => {
      addProducts(fixture);

      cy.fixture(fixture).then((data) => {
        const itemSelector = `[data-cy=product_${data[data.length - 1].id}]`;

        // click 'add to cart' on last product
        cy.get(`${itemSelector} [data-cy=add]`).click();
      });

      check(fixture, 1, "single");
    });
  });

  describe("clear cart", () => {
    it("click 'clear cart' button", () => {
      addProducts(fixture);

      cy.get("[data-cy=cart] [data-cy=clear]").click();

      cy.get("[data-cy=items] > p").should("contain", "no items in cart");
      check(fixture, 0, "clear");
    });
  });

  describe("cart persistence in localStorage", () => {
    it("check cart is persistent after reload", () => {
      addProducts(fixture);

      cy.reload();

      check(fixture, 1, "add");
    });
  });
});
