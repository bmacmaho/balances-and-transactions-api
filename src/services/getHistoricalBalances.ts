import { goBackOneDay } from "./dateUtils";


export async function getHistoricalBalance(balance: any, trans: any, fromDate: any, toDate: any, sortType: any) {
	const	historicalBalance = [];
	let		tempBalance = balance.amount;
	let transactions = await trans;
	
	let i = 0;
	while (transactions[i] && transactions[i].date > toDate) {
		if (transactions[i].status == 'PROCESSED')
			tempBalance -= transactions[i].amount;
		i++
	}
	toDate = goBackOneDay(toDate);
	while (toDate >= fromDate) {
		while (transactions[i] && transactions[i].date > toDate) {
			// console.log(transactions[i])
			if (transactions[i].status == 'PROCESSED')
			tempBalance -= transactions[i].amount;
		i++;
		}
		// console.log(tempBalance)

		if (sortType == "desc"){
			historicalBalance.push({date: toDate, amount: tempBalance, currency: balance.currency})
			// console.log("push");
		} else if (sortType == "over") {
			if (tempBalance < 0)
				historicalBalance.push({date: toDate, amount: tempBalance, currency: balance.currency});
			// console.log("over");
		} else if (sortType == "asc") {
			historicalBalance.unshift({date: toDate, amount: tempBalance, currency: balance.currency})
			// console.log("unshift");
		}
		toDate = goBackOneDay(toDate);
	}
	// console.log(historicalBalance);
	return historicalBalance;
}
