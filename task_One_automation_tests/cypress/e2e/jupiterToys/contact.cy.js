describe("Validate Contacts", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.contains("Start Shopping »").click();
  });

  it("Validate that the feedback form is submitted successfully", () => {
    cy.get("#nav-contact").click();
    cy.get("#forename").type("John");
    cy.get("#surname").type("Butler");
    cy.get("#email").type("john.butler@test.com");
    cy.get("#telephone").type("0435087543");
    cy.get("#message").type(
      "I really liked the service provided by the Jupiter toys"
    );
    cy.get(".btn-contact").contains("Submit").click();
    cy.wait(5000);
    cy.get(".alert.alert-success").should(
      "contain",
      "Thanks John, we appreciate your feedback."
    );
  });

  it("Validate error message upon entering an invalid email address ", () => {
    cy.get("#nav-contact").click();
    cy.get("#forename").type("John");
    cy.get("#surname").type("Butler");
    cy.get("#email").type("test123");
    cy.get("#telephone").type("0435087543");
    cy.get("#email-err").should("have.text", "Please enter a valid email");
  });
});
