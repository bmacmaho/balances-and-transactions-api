require("vitest");
require('dotenv').config()

// Define the URL of your server and the endpoint
const baseUrl = 'http://localhost:' + 3333; // Make sure your server is running
const endpoint = '/historical-balances';
// const port =process.env.PORT
// console.log(port)

async function testHistoricalBalances() {
  let response = await fetch(baseUrl + endpoint + "?sort=asc");
  let balances = await response.json()

  console.log(balances);
}

testHistoricalBalances();
