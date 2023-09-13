import { goBackOneDay, goForwardOneDay, isValidDate, removeTimeFromDate } from "./dateUtils"

const APIURL = "https://uh4goxppjc7stkg24d6fdma4t40wxtly.lambda-url.eu-central-1.on.aws"
const apiKey = "b4a4552e-1eac-44ac-8fcc-91acca085b98-f94b74ce-aa17-48f5-83e2-8b8c30509c18"

export function getFromDate(req: any, transactions: any) {
	let fromDate = req.query.from;

	if (fromDate && !isValidDate(fromDate)) {
		throw ("invalid date. format = YYYY-MM-DD");
	}

	if (!fromDate) {
		console.log("No 'from' given, using default. (First transaction date)")
		fromDate = removeTimeFromDate(transactions[transactions.length - 1].date);
	}

	return fromDate;
}

export function getToDate(req: any, balance: any) {
	let toDate = req.query.to;

	if (toDate && !isValidDate(toDate))
		throw ("invalid date. format = YYYY-MM-DD");

	if (!toDate) {
		console.log("No 'to' date given, using default. (Date from /balance)")
		toDate = removeTimeFromDate(balance.date);
	}

	return goForwardOneDay(toDate);
}

export function getSortType(req: any) {
	let sortType = req.query.sort;

	if (sortType && (sortType != "asc" && sortType != "desc" && sortType != "over"))
		throw new Error ("Incorrect 'sort' given. Options = asc/desc/over")

	if (!sortType) {
		console.log("No 'sort' given, using default descending. options = [asc/desc/over]");
		sortType = "desc";
	}

	return sortType;
}

function validateTransactions(transactions: any, balance: any): boolean {
	const validCurrency = balance.currency;
  
	for (const transaction of transactions) {
		const validKeys = ['amount', 'currency', 'date', 'status'];
		const transactionKeys = Object.keys(transaction);

		if (!transactionKeys.every((key) => validKeys.includes(key)))
			return false;

		if (typeof transaction.amount !== 'number' || isNaN(transaction.amount))
			return false;

		if (transaction.currency !== validCurrency)
			return false;

		const validDateRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/;
		if (!validDateRegex.test(transaction.date))
			return false;

		if (!['BOOKED', 'PROCESSED', 'CANCELLED'].includes(transaction.status))
			return false;
	}
	return true;
  }

export async function getTransactions(balance: any) {
	let transResponse = await fetch(APIURL + '/transactions', {
		headers: { "x-api-key": apiKey }
	})
	if (!transResponse.ok)
		throw new Error(`Failed to fetch transactions`);
	let transactionsJSON = await transResponse.json();
	let transactions = transactionsJSON.transactions;
	if (!transactions)
		throw new Error('No \"transactions\" element in /transactions response')

	if (!validateTransactions(transactions, balance))
		throw new Error('Received transactions but in incorrect form. Each transaction must contain {amount:number,date:string,currency:string(same currency as balance),status:(\'BOOKED\',\'PROCESSED\',\'CANCELLED\')}')

	transactions.sort((a: any, b: any) => {
		const dateA = new Date(a.date);
		const dateB = new Date(b.date);

		return dateB.getTime() - dateA.getTime();
	});
	return transactions;
}
function validateBalance(bal: any): boolean {
	const validKeys = ['amount', 'currency', 'date'];
	const keys = Object.keys(bal);

	if (!keys.every((key) => validKeys.includes(key))) {
		return false;
	}

	if (typeof bal.amount !== 'number' ||
		typeof bal.currency !== 'string' ||
		typeof bal.date !== 'string'
	) {
		return false;
	}

	const dateRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/;
	if (!dateRegex.test(bal.date)) {
		return false;
	}

	return true;
}

export async function getBalance() {
	let balResponse = await fetch(APIURL + '/balances', {
		headers: { "x-api-key": apiKey }
	})

	if (!balResponse.ok)
		throw new Error('Failed to fetch balance. Status: ${balResponse.status}');

	const bal = await balResponse.json();

	if (!validateBalance(bal))
		throw new Error('Balance received but in incorrect form.(should be {amount:number,date:string,currency:string})')

	return bal;
}
