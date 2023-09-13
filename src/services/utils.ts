import {goBackOneDay, goForwardOneDay, isValidDate, removeTimeFromDate} from "./dateUtils"

const	APIURL = "https://uh4goxppjc7stkg24d6fdma4t40wxtly.lambda-url.eu-central-1.on.aws"
const	apiKey = "b4a4552e-1eac-44ac-8fcc-91acca085b98-f94b74ce-aa17-48f5-83e2-8b8c30509c18"

export function	getFromDate(req: any, transactions: any) {
	let fromDate = req.query.from;

	if (!isValidDate(fromDate)){
		console.log("invalid date. format = YYYY-MM-DD")
		throw("invalid date. format = YYYY-MM-DD");
	}

	if (!fromDate) {
		console.log("No 'from' given, using default. (First transaction date)")
		fromDate = removeTimeFromDate(transactions[transactions.length - 1].date);
		fromDate = goBackOneDay(fromDate);
	}

	return fromDate;
}

export function	getToDate(req: any, balance: any) {
	let toDate = req.query.to;

	if (!isValidDate(toDate))
		throw("invalid date. format = YYYY-MM-DD");

	if (!toDate) {
		console.log("No 'to' date given, using default. (Date from /balance)")
		toDate = removeTimeFromDate(balance.date);
	}

	return goForwardOneDay(toDate);
}

export function	getSortType(req: any) {
	let sortType = req.query.sort;

	if (!sortType || (sortType != "asc" && sortType != "desc" && sortType != "over")){
		console.log("No/incorrect 'sort' given, using default descending. options = [asc/desc/over]");
		sortType = "desc";
	}

	return sortType;
}

export async function getTransactions() {
	let transResponse = await fetch(APIURL +'/transactions', {
		headers: {"x-api-key": apiKey}
	})
	let transactionsJSON = await transResponse.json();
	
	let transactions = transactionsJSON.transactions;
	transactions.sort((a: any, b: any) => {
		const dateA = new Date(a.date);
		const dateB = new Date(b.date);
		
		return dateB.getTime() - dateA.getTime();
	});
	return transactions;
}

export async function	getBalance() {
	let balResponse = await fetch(APIURL+'/balances', {
		headers: {"x-api-key": apiKey}
	})
	let bal = await balResponse.json();

	return bal;
}
