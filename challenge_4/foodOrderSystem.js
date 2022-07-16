const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

readline.question(`Input: `, (foodItem) => {
  console.log(`Output: ${restaurantReceipt[foodItem]}`);
  readline.close();
});

const restaurantReceipt = {
  pizza: "Awesome pizza place, pepperoni pizza, $20",
  burger: "wild burger joint, burger, $15",
  doughnut: "crispy creme, doughnut, $25",
  burrito: "Chipotle maxican joint, burrito, $18",
  icecream: "Mardigras parlour, icecream, $25",
};
