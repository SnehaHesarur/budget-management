import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Dialog, Input, Button, TextField, Select, MenuItem } from '@material-ui/core'
import { addNewBill, editBill } from '../bill-management/bill-management.action-creator'

import './add-bills.component.scss'
import moment from 'moment'
import { FILTERS_DATA } from '../constants/misc.constants'

const categroyFilters = FILTERS_DATA.slice(1, FILTERS_DATA.length - 1)
function AddBillDialog (props) {
  const { handleOnClose, addNewBill, editBillInfo, editBill} = props
  const [fields, setFields] = useState({
    date: moment().format('YYYY-MM-DD')
  })

  const handleOnChange = (e) => {
    const fieldsCopy = {...fields}
    fieldsCopy[e.target.name] = e.target.value

    setFields(fieldsCopy)
  }

  useEffect(() => {
    if (editBillInfo) {
      setFields({
        ...editBillInfo,
        date: moment(editBillInfo.date, 'MM-DD-YYYY').format('YYYY-MM-DD')
      })
    }
  }, [editBillInfo])

  const renderCategorySelect = () => {
    return (
      <Select
        className='bill-input'
        value={fields.category || ''}
        name='category'
        onChange={handleOnChange}
      >
        {
          categroyFilters.map((filter, index) => {
            return (
              <MenuItem key={index} className='filter-item' value={filter.value}>
                {filter.name}
              </MenuItem>
            )
          })
        }
      </Select>
    )
  }

  const handleAddBill = () => {
    const isValid = validateForm()
    if (isValid) {
      if (fields.id) {
        editBill({
          ...fields,
          date: moment(fields.date, 'YYYY-MM-DD').format('MM-DD-YYYY')
        })
      } else {
        addNewBill({
          ...fields,
          date: moment(fields.date, 'YYYY-MM-DD').format('MM-DD-YYYY')
        })
      }
      handleOnClose()
    }
  }

  const validateForm = () => {
    if (!fields.description || !fields.category || !fields.amount || !fields.date) {
      return false
    }
    return true
  }

  return (
    <Dialog
      open
      onClose={handleOnClose}
      maxWidth='md'
      classes={{
        paper: 'add-bill-dialog'
      }}
    >
      <div className='dialog-header'>
        {fields.id ? 'Edit Bill' : 'Add Bill'}
        <span className='close' onClick={handleOnClose}>X</span>
      </div>
      <div className='dialog-content'>
        <div className='form-content'>
          <div className='label'>Description</div>
          <Input name='description' value={fields.description || ''} onChange={handleOnChange} className='bill-input' placeholder='Input bill description...' />
        </div>
        <div className='form-content'>
          <div className='label'>Amount</div>
          <Input name='amount' value={fields.amount || ''} onChange={handleOnChange} className='bill-input' placeholder='Input bill amount...' />
        </div>
        <div className='form-content'>
          <div className='label'>Category</div>
          {renderCategorySelect()}
        </div>
        <div className='form-content'>
          <div className='label'>Date</div>
          <TextField
            name="date"
            label="Bill Date"
            type="date"
            defaultValue={fields.date}
            className='bill-input'
            InputLabelProps={{
              shrink: true,
            }}
            onChange={handleOnChange}
          />
        </div>
      </div>
      <div className='dialog-footer'>
        <Button onClick={handleAddBill}>{fields.id ? 'Edit' : 'Add'}</Button>
      </div>
    </Dialog>
  )
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    addNewBill,
    editBill
  }, dispatch)
}

export default (connect(null, mapDispatchToProps)(AddBillDialog))
