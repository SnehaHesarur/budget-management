import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import FusionCharts from 'fusioncharts'
import TimeSeries from 'fusioncharts/fusioncharts.timeseries'
import ReactFC from 'react-fusioncharts'
import moment from 'moment'
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
                      connectNullData: true
                  }]
              }
          }
      };
  }
  // We are creating our DataStore immediately after a component is mounted
  componentDidMount() {
    const billsCopy = this.props.bills
    billsCopy.sort((a, b) => {
      return moment(a.date, 'MM-DD-YYYY') - moment(b.date, 'MM-DD-YYYY')
    })
    const data = billsCopy.map((bill) => {
    console.log(bill.date)
      return ([
        bill.date,
        bill.amount
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
        <div>
          {
            this.state.timeseriesDs.dataSource.data ? <ReactFC {...this.state.timeseriesDs} /> : 'loading'
          }
        </div>
      )
  }
}

function mapStateToProps (state) {
  return {
    bills: state.billManagement.billsForChart
  }
}

export default (connect(mapStateToProps, null)(TimeSeriesChart))
