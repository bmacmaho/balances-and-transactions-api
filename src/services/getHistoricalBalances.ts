import { goBackOneDay } from "./dateUtils";


export function getHistoricalBalance(balance: any, transactions: any, fromDate: any, toDate: any, sortType: any) {
	const	historicalBalance = [];
	let		tempBalance = balance.amount;
	
	let i = -1;
	while (transactions[++i].date > toDate) {
		if (transactions[i].status == 'PROCESSED')
			tempBalance -= transactions[i].amount;
	}

	console.log(toDate);
	toDate = goBackOneDay(toDate);
	console.log(toDate);

	while (toDate >= fromDate) {
		while (transactions[++i].date > toDate)
			if (transactions[i].status == 'PROCESSED')
				tempBalance -= transactions[i].amount;

		if (sortType == "desc")
			historicalBalance.push({date: toDate, amount: tempBalance, currency: balance.currency})
		else if (sortType == "over") {
			if (tempBalance < 0)
				historicalBalance.push({date: toDate, amount: tempBalance, currency: balance.currency});
		} else if (sortType == "asc")
			historicalBalance.unshift({date: toDate, amount: tempBalance, currency: balance.currency})

		toDate = goBackOneDay(toDate);
	}

	return historicalBalance;
}
