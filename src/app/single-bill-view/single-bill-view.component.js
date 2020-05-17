import React from 'react'
import './single-bill-view.component.scss'
import { IconButton, Paper } from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'

function SingleBillView (props) {
  const { bill, handleEdit, handleDelete, optimalPayments } = props

  return (
    <Paper key={bill.id} className={'single-bill-container' + (optimalPayments.indexOf(bill.id) >= 0 ? ' optimal-payment' : '')}>
      <div className='bill-amount'>{`Rs. ${bill.amount}`}</div>
      <div className='bill-desc'>{bill.description}</div>
      <div className='bill-category'>{bill.category}</div>
      <div className='bill-date'>{bill.date}</div>
      <div className='action-container'>
        <IconButton onClick={() => handleEdit(bill)} aria-label="edit">
          <EditIcon />
        </IconButton>
        <IconButton onClick={() => handleDelete(bill)} aria-label="delete">
          <DeleteIcon />
        </IconButton>
      </div>
    </Paper>
  )
}

export default SingleBillView
