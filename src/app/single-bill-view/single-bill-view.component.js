import React from 'react'
import './single-bill-view.component.scss'
import { IconButton } from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'

function SingleBillView (props) {
  const { bill, handleEdit, handleDelete } = props

  return (
    <div key={bill.id} className='single-bill-container'>
      <div className='bill-desc'>{bill.description}</div>
      <div className='bill-category'>{bill.category}</div>
      <div className='bill-amount'>{bill.amount}</div>
      <div className='bill-date'>{bill.date}</div>
      <div className='action-container'>
        <IconButton onClick={() => handleEdit(bill)} aria-label="edit">
          <EditIcon />
        </IconButton>
        <IconButton onClick={() => handleDelete(bill)} aria-label="delete">
          <DeleteIcon />
        </IconButton>
      </div>
    </div>
  )
}

export default SingleBillView
