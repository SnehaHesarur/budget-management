import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Button } from '@material-ui/core'
import './profile-view.component.scss'
import SingleBillView from '../single-bill-view/single-bill-view.component';
import FiltersView from '../common/filters-view/filters.component'
import AddBudgetDialog from '../add-budget/add-budget.component'
import AddBillDialog from '../add-bills/add-bills.component'
import { deleteBill } from '../bill-management/bill-management.action-creator'

function ProfileView (props) {
  const { bills, totalBudget, deleteBill, optimalPayments, totalBillAmount } = props
  const [filter, setFilter] = useState('allBills')
  const [billsToDisplay, setBillsToDisplay] = useState()
  const [addBudgetOpen, setAddBudgetOpen] = useState(false)
  const [addOrEditBillOpen, setAddOrEditBillOpen] = useState(false)
  const [editBillInfo, setEditBillInfo] = useState()

  const handleFilter = (value) => {
    setFilter(value)
  }

  const renderEmptyView = () => {
    return (
      <div className='empty-view'>No Bills Available...</div>
    )
  }

  const renderBillsView = () => {
    return (
      <div className='bills-list-container'>
        {
          billsToDisplay.map((bill) => {
            return <SingleBillView optimalPayments={optimalPayments} handleEdit={handleEdit} handleDelete={handleDelete} bill={bill} key={bill.id} />
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
    if (editBillInfo) {
      setEditBillInfo()
    }
  }

  const handleOpenAddBill = () => {
    setAddOrEditBillOpen(true)
  }

  const handleEdit = (bill) => {
    setEditBillInfo(bill)
    handleOpenAddBill()
  }

  const handleDelete = (bill) => {
    deleteBill(bill)
  }

  const handleViewTimeSeries = () => {
    props.history.push('/time-series')
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
          <div className='actions'>
            <Button className='add-bill-btn' variant="contained" color="primary" onClick={handleOpenAddBill}>Add Bill</Button>
            <Button variant="contained" color="primary" onClick={handleOpenAddBudget}>Update Budget</Button>
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
              <div className='content'>{`Rs. ${totalBillAmount}`}</div>
            </div>
          </div>
          <div className='remaining-amount'>
            {`Available budget after bill payments: Rs: ${totalBudget}`}
          </div>
          <div className='view-time-series' onClick={handleViewTimeSeries}>
            View Time Series
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
            editBillInfo={editBillInfo}
          />
      }
    </div>
  )
}

function mapStateToProps (state) {
  return {
    bills: state.billManagement.bills,
    totalBudget: state.billManagement.totalBudget,
    optimalPayments: state.billManagement.optimalPayments,
    totalBillAmount: state.billManagement.totalBillAmount
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    deleteBill
  }, dispatch)
}


export default (connect(mapStateToProps, mapDispatchToProps)(ProfileView))
