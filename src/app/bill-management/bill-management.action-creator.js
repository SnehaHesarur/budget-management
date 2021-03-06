import { getUUid } from "../utils/misc-utils"

export const setBudget = (data) => ({
  type: 'SET_BUDGET',
  payload: data
})

export const addNewBill = (data) => ({
  type: 'ADD_NEW_BILLS',
  payload: {...data, id: getUUid()}
})

export const deleteBill = (data) => ({
  type: 'DELETE_BILL',
  payload: data
})

export const editBill = (data) => ({
  type: 'EDIT_BILL',
  payload: data
})
