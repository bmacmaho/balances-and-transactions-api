# /historical-balances endpoint

## Intro

Having an account's current balance, and a list of their past transactions, this function "getHistoricalBalances()" returns the balance of the account on each given day at 12am.

With the parameters "from" and "to" the client can specify which dates they want returned.
By default, these are set to the beginning of the list of transactions, and the date specified in /balance respectively.

With the "sort" parameter, it can be returned ascending ("asc") chronologically, descending ("desc"), or it can filter the returned balances to only show the days in overdraft ("over"). By default, "sort" = "desc".

