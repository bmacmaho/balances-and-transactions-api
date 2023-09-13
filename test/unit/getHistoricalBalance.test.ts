import { getHistoricalBalance } from "../../src/services/getHistoricalBalances";

const balances = [
    { "amount": 100, "currency": "EUR", "date": "2023-09-13" },
    { "amount": -50, "currency": "hey", "date": "2023-09-14" },
    { "amount": 2000, "currency": "EUR", "date": "2023-09-15" },
    { "amount": "string", "currency": "EUR", "date": "2023-09-16" },
    { "amount": 0, "currency": "EUR", "date": "2023-09-17" },
    { "amount": 500, "currency": "EUR", "date": "2023-09-18" },
    { "amount": -1000, "currency": "EUR", "date": "202-309-19" },
    { "amount": 25.75, "currency": "EUR", "date": "2023-09-20" },
    { "amount": 10000, "currency": "EUR", "date": "2023-09-21" },
    { "amount": -200, "currency": "EUR", "date": "2023-09-22" }
]

const transactionsList = [[
    {
      "amount": -100,
      "currency": "EUR",
      "date": "2023-09-13T10:00:00.000Z",
      "status": "BOOKED"
    },
    {
      "amount": -50,
      "currency": "EUR",
      "date": "2023-09-13T15:30:00.000Z",
      "status": "PROCESSED"
    },
    {
      "amount": -25,
      "currency": "EUR",
      "date": "2023-09-14T09:15:00.000Z",
      "status": "CANCELLED"
    }
  ],[
    {
      "amount": -25,
      "currency": "EUR",
      "date": "2023-09-14T10:45:00.000Z",
      "status": "PROCESSED"
    },
    {
      "amount": -75,
      "currency": "EUR",
      "date": "2023-09-14T13:00:00.000Z",
      "status": "BOOKED"
    }
  ],[
    {
      "amount": -200,
      "currency": "EUR",
      "date": "2023-09-15T08:30:00.000Z",
      "status": "CANCELLED"
    },
    {
      "amount": -300,
      "currency": "EUR",
      "date": "2023-09-15T11:45:00.000Z",
      "status": "PROCESSED"
    },
    {
      "amount": -100,
      "currency": "EUR",
      "date": "2023-09-15T14:15:00.000Z",
      "status": "BOOKED"
    }
  ],[
    {
      "amount": -50,
      "currency": "EUR",
      "date": "2023-09-16T09:00:00.000Z",
      "status": "BOOKED"
    }
  ],
  [
    {
      "amount": -10,
      "currency": "EUR",
      "date": "2023-09-17T14:30:00.000Z",
      "status": "PROCESSED"
    },
    {
      "amount": -15,
      "currency": "EUR",
      "date": "2023-09-18T12:00:00.000Z",
      "status": "CANCELLED"
    }
  ],[
    {
      "amount": -500,
      "currency": "EUR",
      "date": "2023-09-19T11:15:00.000Z",
      "status": "BOOKED"
    }
  ],[
    {
      "amount": -150,
      "currency": "EUR",
      "date": "2023-09-20T15:45:00.000Z",
      "status": "PROCESSED"
    },
    {
      "amount": -200,
      "currency": "EUR",
      "date": "2023-09-20T16:30:00.000Z",
      "status": "CANCELLED"
    }
  ],[
    {
      "amount": -50,
      "currency": "EUR",
      "date": "2023-09-21T10:00:00.000Z",
      "status": "BOOKED"
    },
    {
      "amount": -25,
      "currency": "EUR",
      "date": "2023-09-21T13:15:00.000Z",
      "status": "PROCESSED"
    }
  ],[
    {
      "amount": -10,
      "currency": "EUR",
      "date": "2023-09-22T11:30:00.000Z",
      "status": "BOOKED"
    },
    {
      "amount": -5,
      "currency": "EUR",
      "date": "2023-09-22T14:45:00.000Z",
      "status": "CANCELLED"
    }
  ],[
    {
      "amount": -75,
      "currency": "EUR",
      "date": "2023-09-23T09:30:00.000Z",
      "status": "PROCESSED"
    },
    {
      "amount": -100,
      "currency": "EUR",
      "date": "2023-09-23T12:45:00.000Z",
      "status": "BOOKED"
    },
    {
      "amount": -50,
      "currency": "EUR",
      "date": "2023-09-23T15:00:00.000Z",
      "status": "CANCELLED"
    }
  ]
];
const fromDates = ["2023-09-13",
    "2023-09-13",
    "2023-09-14",
    "2023-09-14",
    "2023-09-15",
    "2023-09-15",
    "2023-09-16",
    "2023-09-17",
    "2023-09-18",
    "2023-09-19"
]

const toDates = ["2023-09-14",
    "2023-09-14",
    "2023-09-15",
    "2023-09-15",
    "2023-09-16",
    "2023-09-16",
    "2023-09-17",
    "2023-09-18",
    "2023-09-19",
    "2023-09-20"
]

const sorts = ["asc",
    "desc",
    "asc",
    "over",
    "desc",
    "asc",
    "desc",
    "over",
    "asc",
    "over"
]
const expectedResults = [{},{}];

describe("getHistoricalBalance", () => {
    test.each(balances.map((balance, index) => [
      `Test case ${index + 1}`,
      balance,
      transactionsList[index],
      fromDates[index],
      toDates[index],
      sorts[index],
    ]))(
      "should return the expected result for %s",
      (testCaseDescription, balance, transactions, fromDate, toDate, sortType) => {
        const res = getHistoricalBalance(balance, transactions, fromDate, toDate, sortType);
  
        expect(res).toEqual(expectedResults[index]);
      }
    );
  });
  
  
  