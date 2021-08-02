describe("Basic Test", () => {
  context("Desktop resolution", () => {
    // run these tests as if in a desktop
    // browser with a 720p monitor

    it("Visits the homepage and nav links", () => {
      cy.viewport(1280, 720);
      cy.visit("");

      cy.get("nav").contains("Pricing").click();
      cy.url().should("include", "/pricing");

      cy.get("nav").contains("Contact").click();
      cy.url().should("include", "/contact");
    });
  });

  context("Mobile resolution", () => {
    // run these tests as if in a desktop
    // browser with a 720p monitor

    it("Visits the homepage and nav links", () => {
      cy.viewport(680, 720);
      cy.visit("");
      cy.get("[data-cy=dropdown]").click();
      cy.get("[data-cy=dropdown]").contains("Pricing").click();
      cy.url().should("include", "/pricing");
      cy.get("[data-cy=dropdown]").click();
      cy.get("[data-cy=dropdown]").contains("Contact").click();
      cy.url().should("include", "/contact");
    });
  });
});
