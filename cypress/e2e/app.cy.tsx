import { symbolFormatting } from "../../src/components/misc/formatToCurrency";

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
    it("clicking add to cart for each product", () => {
      cy.fixture("products.json").then((data) => {
        data.forEach((product) => {
          // add each product
          cy.get(`[data-cy=product_${product.id}] [data-cy=add]`).click();
        });
      });
    });

    it("check cart correctly added products", () => {
      cy.fixture("products.json").then((data) => {
        data.forEach((product) => {
          const itemSelector = `[data-cy=cart_${product.id}]`;

          // check cart contains the correct item details for each added product
          cy.get(`${itemSelector} [data-cy=name]`).should("contain", product.name);
          cy.get(`${itemSelector} [data-cy=quantity]`).should("contain", "quantity: 1");
          cy.get(`${itemSelector} [data-cy=total]`).should("contain", `total: ${product.price.formatted_with_code}`);
        });
      });
    });
  });

  describe("updating all cart item quantities", () => {
    it("updating each item quantity", () => {
      cy.fixture("products.json").then((data) => {
        data.forEach((product) => {
          const itemSelector = `[data-cy=cart_${product.id}]`;

          // update quantity input to 5 & click update
          cy.get(`${itemSelector} > [data-cy=input]`).invoke("val", "").type("5");
          cy.get(`${itemSelector} [data-cy=update]`).click();

          // check quantity is 5 & total is correct
          cy.get(`${itemSelector} [data-cy=quantity]`).should("contain", "quantity: 5");
          cy.get(`${itemSelector} [data-cy=total]`).should("contain", `total: ${symbolFormatting(product.price.raw * 5, "AUD")}`);
        });
      });
    });

    it("check cart has correct values after quantity updates", () => {
      cy.getLocalStorage("cart").then((cart) => {
        let total = 0;
        JSON.parse(cart).items.map((item) => (total += item.price.raw * item.quantity));

        cy.get("[data-cy=cart] [data-cy=length]").should("contain", "length: 3");
        cy.get("[data-cy=cart] [data-cy=total]").should("contain", `total: ${symbolFormatting(total, "AUD")}`);
      });
    });
  });

  describe("update a single cart item quantity", () => {
    it("updating a item quantity", () => {
      cy.fixture("products.json").then((data) => {
        const itemSelector = `[data-cy=cart_${data[0].id}]`;

        // update quantity input to 5 & click update
        cy.get(`${itemSelector} > [data-cy=input]`).invoke("val", "").type("50");
        cy.get(`${itemSelector} [data-cy=update]`).click();

        // check quantity is 50 & total is correct
        cy.get(`${itemSelector} [data-cy=quantity]`).should("contain", "quantity: 50");
        cy.get(`${itemSelector} [data-cy=total]`).should("contain", `total: ${symbolFormatting(data[0].price.raw * 50, "AUD")}`);
      });
    });

    it("check cart has correct values after quantity update", () => {
      cy.getLocalStorage("cart").then((cart) => {
        let total = 0;
        JSON.parse(cart).items.map((item) => (total += item.price.raw * item.quantity));

        cy.get("[data-cy=cart] [data-cy=length]").should("contain", "length: 3");
        cy.get("[data-cy=cart] [data-cy=total]").should("contain", `total: ${symbolFormatting(total, "AUD")}`);
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
      cy.getLocalStorage("cart").then((cart) => {
        let total = 0;
        JSON.parse(cart).items.map((item) => (total += item.price.raw * item.quantity));

        cy.get("[data-cy=cart] [data-cy=length]").should("contain", "length: 2");
        cy.get("[data-cy=cart] [data-cy=total]").should("contain", `total: ${symbolFormatting(total, "AUD")}`);
      });
    });
  });

  describe("cart persistence in localStorage", () => {
    it("check cart is persistent after reload", () => {
      cy.reload();

      cy.getLocalStorage("cart").then((cart) => {
        let total = 0;
        JSON.parse(cart).items.map((item) => {
          total += item.price.raw * item.quantity;

          // check cart contains the correct item details
          cy.get(`[data-cy=cart_${item.id}] [data-cy=name]`).should("contain", item.name);
          cy.get(`[data-cy=cart_${item.id}] [data-cy=quantity]`).should("contain", `quantity: ${item.quantity}`);
          cy.get(`[data-cy=cart_${item.id}] [data-cy=total]`).should("contain", `total: ${symbolFormatting(item.price.raw * item.quantity, "AUD")}`);
        });

        // check cart has length 3 and contains the correct total
        cy.get("[data-cy=cart] [data-cy=length]").should("contain", `length: ${JSON.parse(cart).items.length}`);
        cy.get("[data-cy=cart] [data-cy=total]").should("contain", `total: ${symbolFormatting(total, "AUD")}`);
      });
    });
  });
});
