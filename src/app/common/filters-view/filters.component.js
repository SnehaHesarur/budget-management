import React, { useState } from 'react'
import { FILTERS_DATA } from '../../constants/misc.constants'

import './filters.component.scss'

function FiltersView (props) {
  const { handleFilterCallback } = props
  const [filterValue, setFiltersValue] = useState('allBills')

  const handleFilters = (value) => {
    setFiltersValue(value)
    if (handleFilterCallback) {
      handleFilterCallback(value)
    }
  }

  return (
    <div className='filters-view'>
      <div className='filter-header'>Filters</div>
      {
        FILTERS_DATA.map((filter, index) => {
          return (
            <div key={index} className={'filter-item' + (filterValue === filter.value ? ' selected' : '')} onClick={() => handleFilters(filter.value)}>
              {filter.name}
            </div>
          )
        })
      }
    </div>
  )
}

export default FiltersView
