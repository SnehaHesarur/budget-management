import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Button } from '@material-ui/core'
import './profile-view.component.scss'
import moment from 'moment'
import SingleBillView from '../single-bill-view/single-bill-view.component';
import FiltersView from '../common/filters-view/filters.component'
import AddBudgetDialog from '../add-budget/add-budget.component'
import AddBillDialog from '../add-bills/add-bills.component'

function ProfileView (props) {
  const { bills, totalBudget } = props
  const [filter, setFilter] = useState('allBills')
  const [billsToDisplay, setBillsToDisplay] = useState()
  const [addBudgetOpen, setAddBudgetOpen] = useState(false)
  const [addOrEditBillOpen, setAddOrEditBillOpen] = useState(false)

  const handleFilter = (value) => {
    debugger
    setFilter(value)
  }

  const renderEmptyView = () => {
    return (
      <div className='empty-view'>Add new bills...</div>
    )
  }

  const renderBillsView = () => {
    return (
      <div className='bills-list-container'>
        {
          billsToDisplay.map((bill) => {
            return <SingleBillView bill={bill} key={bill.id} />
          })
        }
      </div>
    )
  }

  const handleOpenAddBudget = () => {
    setAddBudgetOpen(true)
  }

  const handleCloseAddBudget = () => {
    setAddBudgetOpen(false)
  }

  const handleCloseAddBill = () => {
    setAddOrEditBillOpen(false)
  }

  const handleOpenAddBill = () => {
    setAddOrEditBillOpen(true)
  }

  useEffect(() => {
    setBillsToDisplay(bills[filter])
  }, [bills, filter])

  return (
    <div className='profile-main-container'>
      <div className='left-container'>
          <FiltersView handleFilterCallback={handleFilter} />
      </div>
      <div className='right-container'>
        <div className='bills-main-container-header'>
          <div className='current-month'>Month: {moment().format('MMM, YYYY')}</div>
          <div className='actions'>
            <Button onClick={handleOpenAddBill}>Add Bill</Button>
            <Button onClick={handleOpenAddBudget}>Update Budget</Button>
          </div>
          <div className='budget-details'>
            <div className='item budget'>
              <div className='label'>Budget</div>
              <div className='content'>{`Rs. ${totalBudget || 0}`}</div>
            </div>
            <div className='item paid'>
              <div className='label'>Paid</div>
              <div className='content'>Rs. 00</div>
            </div>
            <div className='item unpaid'>
              <div className='label'>Pending</div>
              <div className='content'>Rs. 00</div>
            </div>
          </div>
          <div className='remaining-amount'>
            {`Available budget after bill payments: Rs: 00`}
          </div>
        </div>
        <div className='budget-container'>
          {
            billsToDisplay && billsToDisplay.length ? renderBillsView() : renderEmptyView()
          }
        </div>
      </div>
      {
        addBudgetOpen &&
          <AddBudgetDialog
            handleOnClose={handleCloseAddBudget}
            budget={totalBudget}
          />
      }
      {
        addOrEditBillOpen &&
          <AddBillDialog
            handleOnClose={handleCloseAddBill}
          />
      }
    </div>
  )
}

function mapStateToProps (state) {
  return {
    bills: state.billManagement.bills,
    totalBudget: state.billManagement.totalBudget
  }
}

export default (connect(mapStateToProps, null)(ProfileView))
