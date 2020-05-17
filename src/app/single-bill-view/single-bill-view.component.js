import React from 'react'
import './single-bill-view.component.scss'

function SingleBillView (props) {
  const { bill } = props

  return (
    <div key={bill.id} className='single-bill-container'>
      <div className='bill-desc'>{bill.description}</div>
      <div className='bill-category'>{bill.category}</div>
      <div className='bill-amount'>{bill.amount}</div>
      <div className='bill-date'>{bill.date}</div>
    </div>
  )
}

export default SingleBillView
