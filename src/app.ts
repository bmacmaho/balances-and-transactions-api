import "dotenv/config";
import express, { json } from "express";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "../swagger.json";
import { getHistoricalBalance } from "./services/getHistoricalBalances";
import { getBalance, getTransactions, getToDate, getFromDate, getSortType} from "./services/utils";

const app = express();
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get("/historical-balances", async (req, res) => {
	try {
		let balance = await getBalance();
		let transactions = await getTransactions(balance);
		let fromDate = getFromDate(req, transactions);
		let toDate = getToDate(req, balance);
		let sortType = getSortType(req);

		const historicalBalance = await getHistoricalBalance(balance, transactions, fromDate, toDate, sortType);
		return res.json(historicalBalance);
	} catch (error){
		console.log(error)
	}
});

export default app;
