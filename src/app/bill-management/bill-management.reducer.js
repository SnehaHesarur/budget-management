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
        "category": "Personal Care",
        "amount": "320",
        "date": "01-14-2020"
      },
      {
        "id": 7,
        "description": "Vacation",
        "category": "Travel",
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
      "category": "Personal Care",
      "amount": "320",
      "date": "01-14-2020"
    }],
    travel:[{
      "id": 7,
      "description": "Vacation",
      "category": "Travel",
      "amount": "3430",
      "date": "01-18-2020"
    }]
  }
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'SET_BUDGET': {
      return {
        ...state,
        totalBudget: action.payload
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
      return {
        ...state
      }
    }
    case 'DELETE_BILL': {
      return {
        ...state
      }
    }
    default:
      return state
  }
}
