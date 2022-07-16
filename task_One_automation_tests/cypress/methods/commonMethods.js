export const addAllProductsToCart = () => {
  cy.get(".products")
    .find(".product")
    .each(($el) => {
      cy.wrap($el).find("a.btn").click();
    });
};

export const clickCart = () => {
  cy.get("li#nav-cart a").click();
};
