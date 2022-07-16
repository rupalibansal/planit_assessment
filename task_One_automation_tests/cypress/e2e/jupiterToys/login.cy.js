describe("Validate Login", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.contains("Start Shopping »").click();
  });

  it("Validate Login error mesage without any credentials", () => {
    cy.get("ng-login > a").click();
    cy.get(".modal-footer").contains("Login").click();
    cy.get("#messageContainer").should(
      "have.text",
      "Your login details are incorrect"
    );
  });
});
