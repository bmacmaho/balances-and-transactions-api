# /historical-balances endpoint

## Intro

Having an account's current balance, and a list of their past transactions, this function "getHistoricalBalances()" returns the balance of the account on each given day at 12am.

With the parameters "from" and "to" the client can specify which dates they want returned.
By default, these are set to the beginning of the list of transactions, and the date specified in /balance respectively.

With the "sort" parameter, the balances can be returned ascending ("asc") chronologically, descending ("desc"), or it can filter the returned balances to only show the days in overdraft ("over"). By default, "sort" = "desc".

Documentation for the new endpoint can also be found on the swagger boilerplate at http://localhost:3333/api-docs when the server is running.