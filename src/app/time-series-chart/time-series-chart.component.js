import React from 'react'
import { connect } from 'react-redux'
import FusionCharts from 'fusioncharts'
import TimeSeries from 'fusioncharts/fusioncharts.timeseries'
import ReactFC from 'react-fusioncharts'
import moment from 'moment'
import './time-series-chart.component.scss'
import { getDateTimes } from '../utils/date.utils'

ReactFC.fcRoot(FusionCharts, TimeSeries);
const schema = [{
  "name": "Date",
  "type": "date",
  "format": "%-m-%-d-%Y"
}, {
  "name": "Amount",
  "type": "number"
}]

class TimeSeriesChart extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
          timeseriesDs: {
              type: 'timeseries',
              renderAt: 'container',
              width: '1000',
              height: '400',
              dataSource: {
                  caption: { text: 'Budget Management' },
                  data: null,
                  yAxis: [{
                    "connectNullData": "1"
                  }]
              }
          }
      };
  }

  handleBack = () => {
    this.props.history.push('/')
  }

  componentDidMount() {
    const billsCopy = this.props.bills.allBills
    billsCopy.sort((a, b) => {
      return moment(a.date, 'MM-DD-YYYY') - moment(b.date, 'MM-DD-YYYY')
    })
    const existingData = {}
    billsCopy.forEach((bill) => {
      existingData[bill.date] = bill.amount
    })

    const datetimes = billsCopy.length ? getDateTimes(billsCopy[0].date, billsCopy[billsCopy.length - 1].date) : getDateTimes(moment().startOf('month').format('MM-DD-YYYY'), moment().endOf('month').format('MM-DD-YYYY'))
    const data = datetimes.map((date) => {
      const formattedDate = moment(date).format('MM-DD-YYYY')
      return ([
        formattedDate,
        existingData[formattedDate] || 0
      ])
    })

    const fusionTable = new FusionCharts.DataStore().createDataTable(data, schema);
    const timeseriesDs = Object.assign({}, this.state.timeseriesDs)
    timeseriesDs.dataSource.data = fusionTable
    this.setState({
      timeseriesDs
    })
  }
  render() {
      return (
        <div className='time-series-chart-container'>
          <div className='back' onClick={this.handleBack}>{'<--- Back'}</div>
          <div className='time-series-header'>
            Time Series Chart
          </div>
          <div className='time-series-chart'>
            {
              this.state.timeseriesDs.dataSource.data ? <ReactFC {...this.state.timeseriesDs} /> : 'loading'
            }
          </div>
        </div>
      )
  }
}

function mapStateToProps (state) {
  return {
    bills: state.billManagement.bills
  }
}

export default (connect(mapStateToProps, null)(TimeSeriesChart))
