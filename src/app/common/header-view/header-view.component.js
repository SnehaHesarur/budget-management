import React from 'react'
import LocalCarWashIcon from '@material-ui/icons/LocalCarWash'
import './header-view.component.scss'

function HeaderView () {
  return (
    <div className='header-view'>
      <div className='header-content'>
        <div className='icon'>
          <LocalCarWashIcon />
        </div>
        Car Wash Budget Management
      </div>
    </div>
  )
}

export default HeaderView
