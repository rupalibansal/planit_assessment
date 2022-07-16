import {
  clickCart,
  addAllProductsToCart,
} from "../../methods/commonMethods.js";

describe("Validate Checkout", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.contains("Start Shopping »").click();
  });

  it("Validate clicking on checkout button shows correct number of items on checkout page", () => {
    addAllProductsToCart();
    clickCart();
    cy.get("a.btn-checkout").click();
    cy.url().should("eq", "https://jupiter.cloud.planittesting.com/#/checkout");
    cy.get(".alert.alert-info>strong").eq(1).should("have.text", 8);
  });

  it("Validate error message upon clicking the submit button on the form without filling the details ", () => {
    addAllProductsToCart();
    clickCart();
    cy.get("a.btn-checkout").click();
    cy.get("#checkout-submit-btn").click();
    cy.get(".alert.alert-error").should(
      "contain",
      "but we can't send your items unless you complete the form correctly."
    );
  });

  it("Validate Order number is generated after filling and submitting the form  ", () => {
    addAllProductsToCart();
    clickCart();
    cy.get("a.btn-checkout").click();
    cy.get("#forename").type("John");
    cy.get("#surname").type("Butler");
    cy.get("#email").type("john.butler@test.com");
    cy.get("#address").type("101 Example Road");
    cy.get("select").select("Visa");
    cy.get("#card").type("4567808989");
    cy.get("#checkout-submit-btn").click();
    cy.wait(8000);
    cy.get(".alert.alert-success")
      .invoke("text")
      .then((text) => {
        expect(text).to.match(/.*JT[\d]{13}/);
      });
  });
});
