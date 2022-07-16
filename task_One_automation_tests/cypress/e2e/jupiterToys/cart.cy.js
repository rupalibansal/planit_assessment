/// <reference types="Cypress" />
import {
  addAllProductsToCart,
  clickCart,
} from "../../methods/commonMethods.js";

describe("Validate Cart", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.contains("Start Shopping »").click();
  });
  it("Validate number of products added to the cart matches with the number shown in the cart", () => {
    addAllProductsToCart();
    cy.get("span.cart-count").should("have.text", "8");
  });

  it("Validate Cart is empty/products upon clicking the Yes/No Empty Cart button", () => {
    addAllProductsToCart();
    clickCart();
    cy.get("form[name='form']").contains("Empty Cart").click();
    cy.get(".modal-footer").contains("No").click();
    cy.get(".icon-shopping-cart + span").should("have.text", "8");
    cy.get("form[name='form']").contains("Empty Cart").click();
    cy.get(".modal-footer").contains("Yes").click();
    cy.get(".icon-shopping-cart + span").should("have.text", "0");
  });

  it("Validate items and quantity added to cart are correct", () => {
    let productTitlesInShop = [];
    let productTitlesInCart = [];

    cy.get(".products")
      .find(".product-title")
      .eq(0)
      .invoke("text")
      .then((text) => {
        productTitlesInShop[0] = text;
      });

    cy.get(".products")
      .find(".product-title")
      .eq(1)
      .invoke("text")
      .then((text) => {
        productTitlesInShop[1] = text;
      });

    cy.get(".products").find(".product").first().contains("Buy").click();
    cy.get(".products").find(".product").eq(1).contains("Buy").dblclick();

    clickCart();
    // Product Name
    cy.get("tbody tr:nth-child(1) td:nth-child(1)")
      .invoke("text")
      .then((text) => {
        productTitlesInCart[0] = text.trim();
      });
    // Quantity
    cy.get("tbody tr:nth-child(1) td:nth-child(3) input")
      .invoke("attr", "value")
      .should("eq", "1");

    cy.get("tbody tr:nth-child(2) td:nth-child(1)")
      .invoke("text")
      .then((text) => {
        productTitlesInCart[1] = text.trim();
        expect(productTitlesInShop).to.deep.equal(productTitlesInCart);
      });

    cy.get("tbody tr:nth-child(2) td:nth-child(3) input")
      .invoke("attr", "value")
      .should("eq", "2");

    //verify the subtotal for each item
    //verify total
    //update the quantity from 2 to 3 , verify change in subtotal and total
  });

  it("Validate items removed from the cart are not present in the cart", () => {
    cy.get(".products").find(".product").first().contains("Buy").click();
    cy.get(".products").find(".product").eq(1).contains("Buy").click();
    clickCart();
    cy.get("tbody tr:nth-child(1) .remove-item").click();
    cy.get(".modal-body strong").then(($message) => {
      expect($message.get(0).innerText).to.eq("Teddy Bear");
    });
    cy.get(".modal-footer .btn-success").click();
    cy.get("tbody tr td:nth-child(1)").each(($el) => {
      expect($el.get(0).innerText).to.not.equal("Teddy Bear");
    });
  });
});
