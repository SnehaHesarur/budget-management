import { combineReducers } from 'redux'
import billManagementReducer from '../app/bill-management/bill-management.reducer'

const rootReducer = combineReducers({
  billManagement: billManagementReducer
})

export default rootReducer
