import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import ProfileView from '../app/profile-view/profile-view.component'
import BaseLayout from '../app/common/base-layout/base-layout.component'
import TimeSeriesChartComponent from '../app/time-series-chart/time-series-chart.component'

export default () => {
  return (
    <BrowserRouter>
      <Switch>
        <BaseLayout>
          <Route exact path='/' component={ProfileView} />
          <Route exact path='/time-series' component={TimeSeriesChartComponent} />
        </BaseLayout>
      </Switch>
    </BrowserRouter>
  )
}
