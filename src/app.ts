import "dotenv/config";
import express, { json } from "express";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "../swagger.json";
import { getHistoricalBalance } from "./services/getHistoricalBalances";
import { getBalance, getTransactions, getToDate, getFromDate, getSortType} from "./services/utils";

const app = express();
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get("/historical-balances", async (req, res) => {
	console.log("request made");

	let balance = await getBalance();
	let transactions = await getTransactions();
	
	let fromDate = getFromDate(req, transactions);
	let toDate = getToDate(req, balance);
	let sortType = getSortType(req);

	console.log("fromDate: " + fromDate);
	console.log("toDate: " + toDate);
	console.log("sortType: " + sortType);

	const historicalBalance = getHistoricalBalance(balance, transactions, fromDate, toDate, sortType);
	
	return res.json(historicalBalance);
});

// getBalance();
// getTransactions();
// getToDate({query: {to: "2022-01-05"}}, { amount: 10000, currency: 'EUR', date: '2022-06-30T23:59:59.577Z' })
// getFromDate({query: {from: "ass"}}, "ass")
async function test() {
	let balance = await getBalance();
	// console.log(balance);
	let transactions = await getTransactions();
	// console.log(transactions);
	let fromDate = getFromDate({query: {from: "2022-01-03"}}, transactions);
	console.log(fromDate);
	let toDate = getToDate({query:{to: "2022-02-05"}}, balance)
	console.log(toDate);
	let sortType = getSortType({query: {sort: "over"}})
	// console.log(sortType);

	console.log("GET HISTORICAL BALANCE: ");
	console.log(getHistoricalBalance(balance, transactions, fromDate, toDate, sortType));
}

test();

export default app;
