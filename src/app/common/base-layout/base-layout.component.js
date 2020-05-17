import React from 'react'
import HeaderView from '../header-view/header-view.component'
import './base-layout.component.scss'

function BaseLayout (props) {
  return (
    <div className='base-layout'>
      <HeaderView />
      <div className='main-container'>
        {props.children}
      </div>
    </div>
  )
}

export default BaseLayout
