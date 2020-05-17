import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import ProfileView from '../app/profile-view/profile-view.component'
import BaseLayout from '../app/common/base-layout/base-layout.component'

export default () => {
  return (
    <BrowserRouter>
      <Switch>
        <BaseLayout>
          <Route exact path='/' component={ProfileView} />
        </BaseLayout>
      </Switch>
    </BrowserRouter>
  )
}
