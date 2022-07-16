const axios = require("axios").default;

axios
  .get("https://petstore.swagger.io/v2/pet/findByStatus?status=available")
  .then(function (response) {
    console.log(response.data.length);
  });
