const initialState = {
  totalBudget: 0,
  bills: {
    allBills: [
      {
        "id": 1,
        "description": "Dominoes",
        "category": "FoodNDining",
        "amount": "430",
        "date": "01-02-2020"
      },
      {
        "id": 2,
        "description": "Car wash",
        "category": "utility",
        "amount": "500",
        "date": "01-06-2020"
      },
      {
        "id": 3,
        "description": "Amazon",
        "category": "shopping",
        "amount": "2030",
        "date": "01-07-2020"
      },
      {
        "id": 4,
        "description": "House rent",
        "category": "FoodNDining",
        "amount": "35900",
        "date": "01-03-2020"
      },
      {
        "id": 5,
        "description": "Tuition",
        "category": "education",
        "amount": "2200",
        "date": "01-12-2020"
      },
      {
        "id": 6,
        "description": "Laundry",
        "category": "personalCare",
        "amount": "320",
        "date": "01-14-2020"
      },
      {
        "id": 7,
        "description": "Vacation",
        "category": "travel",
        "amount": "3430",
        "date": "01-18-2020"
      }
    ],
    FoodNDining: [{
      "id": 1,
      "description": "Dominoes",
      "category": "FoodNDining",
      "amount": "430",
      "date": "01-02-2020"
    }, {
      "id": 4,
      "description": "House rent",
      "category": "FoodNDining",
      "amount": "35900",
      "date": "01-03-2020"
    }],
    utility: [{
      "id": 2,
      "description": "Car wash",
      "category": "utility",
      "amount": "500",
      "date": "01-06-2020"
    }],
    shopping: [{
      "id": 3,
      "description": "Amazon",
      "category": "shopping",
      "amount": "2030",
      "date": "01-07-2020"
    }],
    education: [{
      "id": 5,
      "description": "Tuition",
      "category": "education",
      "amount": "2200",
      "date": "01-12-2020"
    }],
    personalCare: [{
      "id": 6,
      "description": "Laundry",
      "category": "personalCare",
      "amount": "320",
      "date": "01-14-2020"
    }],
    travel:[{
      "id": 7,
      "description": "Vacation",
      "category": "travel",
      "amount": "3430",
      "date": "01-18-2020"
    }]
  },
  optimalPayments: [],
  billsForChart: [
    {
      "id": 1,
      "description": "Dominoes",
      "category": "FoodNDining",
      "amount": "430",
      "date": "01-02-2020"
    },
    {
      "id": 2,
      "description": "Car wash",
      "category": "utility",
      "amount": "500",
      "date": "01-06-2020"
    },
    {
      "id": 3,
      "description": "Amazon",
      "category": "shopping",
      "amount": "2030",
      "date": "01-07-2020"
    },
    {
      "id": 4,
      "description": "House rent",
      "category": "FoodNDining",
      "amount": "35900",
      "date": "01-03-2020"
    },
    {
      "id": 5,
      "description": "Tuition",
      "category": "education",
      "amount": "2200",
      "date": "01-12-2020"
    },
    {
      "id": 6,
      "description": "Laundry",
      "category": "personalCare",
      "amount": "320",
      "date": "01-14-2020"
    },
    {
      "id": 7,
      "description": "Vacation",
      "category": "travel",
      "amount": "3430",
      "date": "01-18-2020"
    },
    {
      "id": 8,
      "description": "Dominoes",
      "category": "FoodNDining",
      "amount": "3486",
      "date": "01-04-2020"
    },
    {
      "id": 9,
      "description": "Dominoes",
      "category": "FoodNDining",
      "amount": "234",
      "date": "01-05-2020"
    },
    {
      "id": 10,
      "description": "Dominoes",
      "category": "FoodNDining",
      "amount": "234",
      "date": "01-08-2020"
    },
    {
      "id": 11,
      "description": "Dominoes",
      "category": "FoodNDining",
      "amount": "56",
      "date": "01-09-2020"
    },
    {
      "id": 12,
      "description": "Dominoes",
      "category": "FoodNDining",
      "amount": "430",
      "date": "01-10-2020"
    },
    {
      "id": 13,
      "description": "Dominoes",
      "category": "FoodNDining",
      "amount": "456",
      "date": "01-11-2020"
    },
  ],
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'SET_BUDGET': {
      const optimalPayments = []
      const billsCopy = [...state.bills.allBills]
      const billsCount = billsCopy.length
      let availableBudget = action.payload

      if (action.payload && billsCount > 0) {
        if (billsCount === 1) {
          optimalPayments.push(billsCopy[0].id)
        } else {
          billsCopy.sort((a, b) => {
            return Number(b.amount) - Number(a.amount)
          })
          billsCopy.forEach((bill) => {
            if (Number(bill.amount) <=  availableBudget && availableBudget > 0) {
              optimalPayments.push(bill.id)
              availableBudget = availableBudget - Number(bill.amount)
            }
          })
        }
      }
      return {
        ...state,
        totalBudget: action.payload,
        optimalPayments
      }
    }
    case 'ADD_NEW_BILLS': {
      const allBillsCopy = [...state.bills.allBills]
      allBillsCopy.push(action.payload)

      const filterCategory = [...state.bills[action.payload.category]]
      filterCategory.push(action.payload)

      return {
        ...state,
        bills: {
          ...state.bills,
          allBills: allBillsCopy,
          [action.payload.category]: filterCategory
        }
      }
    }
    case 'EDIT_BILL': {
      const allBillsCopy = [...state.bills.allBills]
      for (let i = 0; i < allBillsCopy.length; i++) {
        const item = allBillsCopy[i]
        if (item.id === action.payload.id) {
          allBillsCopy.splice(i, 1, action.payload)
          break;
        }
      }

      const filterCategory = [...state.bills[action.payload.category]]
      for (let i = 0; i < filterCategory.length; i++) {
        const item = filterCategory[i]
        if (item.id === action.payload.id) {
          filterCategory.splice(i, 1, action.payload)
          break;
        }
      }

      return {
        ...state,
        bills: {
          ...state.bills,
          allBills: allBillsCopy,
          [action.payload.category]: filterCategory
        }
      }
    }
    case 'DELETE_BILL': {
      const allBillsCopy = [...state.bills.allBills]
      for (let i = 0; i < allBillsCopy.length; i++) {
        const item = allBillsCopy[i]
        if (item.id === action.payload.id) {
          allBillsCopy.splice(i, 1)
          break;
        }
      }

      const filterCategory = [...state.bills[action.payload.category]]
      for (let i = 0; i < filterCategory.length; i++) {
        const item = filterCategory[i]
        if (item.id === action.payload.id) {
          filterCategory.splice(i, 1)
          break;
        }
      }

      return {
        ...state,
        bills: {
          ...state.bills,
          allBills: allBillsCopy,
          [action.payload.category]: filterCategory
        }
      }
    }
    default:
      return state
  }
}
