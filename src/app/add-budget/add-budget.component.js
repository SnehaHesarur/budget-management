import React, { useState } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Dialog, Input, Button } from '@material-ui/core'
import { setBudget } from '../bill-management/bill-management.action-creator'

import './add-budget.component.scss'

function AddBudgetDialog (props) {
  const { handleOnClose, budget, setBudget } = props
  const [inputVal, setInputValue] = useState(budget || 0)

  const handleOnChange = (e) => {
    setInputValue(e.target.value)
  }

  const handleUpdateBudget = () => {
    if (inputVal) {
      setBudget(inputVal)
      handleOnClose()
    }
  }

  return (
    <Dialog
      open
      onClose={handleOnClose}
      maxWidth='md'
      classes={{
        paper: 'update-budget-dialog'
      }}
    >
      <div className='dialog-header'>
        Update Budget
        <span className='close' onClick={handleOnClose}>X</span>
      </div>
      <div className='dialog-content'>
        <div className='label'>Budget</div>
        <Input value={inputVal} onChange={handleOnChange} className='budget-input' placeholder='Input budget...' />
      </div>
      <div className='dialog-footer'>
        <Button onClick={handleUpdateBudget}>Update</Button>
      </div>
    </Dialog>
  )
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    setBudget
  }, dispatch)
}

export default (connect(null, mapDispatchToProps)(AddBudgetDialog))
