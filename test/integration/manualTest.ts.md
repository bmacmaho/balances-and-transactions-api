async function manualTest() {
	try {
		let balance = await getBalance();
		console.log(balance);

		let transactions = await getTransactions(balance);

		let fromDate = getFromDate({query: {from: "2022-01-03"}}, transactions);
		console.log(fromDate);

		let toDate = getToDate({query:{to: "2022-01-07"}}, balance)
		console.log(toDate);

		let sortType = getSortType({query: {sort: "asc"}})
		console.log(sortType);

		console.log("GET HISTORICAL BALANCE: ");
		const hisBal = await getHistoricalBalance(balance, transactions, fromDate, toDate, sortType)
		console.log(hisBal);
	} catch (error)
	{
		console.log(error)
	}
}

manualTest();