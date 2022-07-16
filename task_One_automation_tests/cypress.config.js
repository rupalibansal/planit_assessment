const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    specPattern: "cypress/e2e/jupiterToys/*.js",
    baseUrl: "https://jupiter.cloud.planittesting.com/#/home",
    video: false,
  },
});
