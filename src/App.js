import { useEffect, useState } from 'react';
import { useDashboardGlobalContext } from './DashboardGlobaleContext';
import { calcPercent, calcTotal } from './Orders/OrderDatesFunctions';
import GlobalChart from './components/GlobalChart';

function App() {
  let state = useDashboardGlobalContext()
  const [ChartType, setChartType] = useState('bar')
  let [StartDate, setStartDate] = state.StartDate
  let [EndDate, setEndDate] = state.EndDate
  let [DiffTime] = state.DiffTime
  let [ChartsXaxis] = state.ChartsXaxis
  let [ChartsYaxis] = state.ChartsYaxis
  let [CompareChartsYaxis] = state.CompareChartsYaxis
  const [Charts, setCharts] = useState([])

  let chartTitles = ['total', 'profit', 'capital', 'total_units', 'total_orders']

  let getCharts = () => {
    if(ChartsYaxis.length !== 0) {
      let charts = [
        {
          _id: 0,
          name: 'Total',
          type: ChartType,
          diff: DiffTime,
          currency: true,
          x: ChartsXaxis,
          y: ChartsYaxis.map(y => y[chartTitles[0]]),
          total: calcTotal(ChartsYaxis, chartTitles[0]),
          series: [],
          percent: calcPercent(CompareChartsYaxis, ChartsYaxis, chartTitles[0]),
          single: '',
        },
        {
          _id: 1,
          name: 'Profit',
          type: ChartType,
          diff: DiffTime,
          currency: true,
          x: ChartsXaxis,
          y: ChartsYaxis.map(y => y[chartTitles[1]]),
          total: calcTotal(ChartsYaxis, chartTitles[1]),
          series: [],
          percent: calcPercent(CompareChartsYaxis, ChartsYaxis, chartTitles[1]),
          single: '',
        },
        {
          _id: 2,
          name: 'Capital',
          type: ChartType,
          diff: DiffTime,
          currency: true,
          x: ChartsXaxis,
          y: ChartsYaxis.map(y => y[chartTitles[2]]),
          total: calcTotal(ChartsYaxis, chartTitles[2]),
          series: [],
          percent: calcPercent(CompareChartsYaxis, ChartsYaxis, chartTitles[2]),
          single: '',
        },
        {
          _id: 3,
          name: 'Total Units',
          type: ChartType,
          diff: DiffTime,
          currency: false,
          x: ChartsXaxis,
          y: ChartsYaxis.map(y => y[chartTitles[3]]),
          total: calcTotal(ChartsYaxis, chartTitles[3]),
          series: [],
          percent: calcPercent(CompareChartsYaxis, ChartsYaxis, chartTitles[3]),
          single: 'unit',
        },
        {
          _id: 4,
          name: 'Total Orders',
          type: ChartType,
          diff: DiffTime,
          currency: false,
          x: ChartsXaxis,
          y: ChartsYaxis.map(y => y[chartTitles[4]]),
          series: [],
          total: calcTotal(ChartsYaxis, chartTitles[4]),
          percent: calcPercent(CompareChartsYaxis, ChartsYaxis, chartTitles[4]),
          single: 'order',
        },
        {
          _id: 5,
          name: 'Total - Profit - Capital',
          type: 'line',
          diff: DiffTime,
          currency: true,
          x: ChartsXaxis,
          y: [],
          series: [
            {
              name: 'Total',
              data: ChartsYaxis.map(y => y[chartTitles[0]]),
            },
            {
              name: 'Profit',
              data: ChartsYaxis.map(y => y[chartTitles[1]]),
            },
            {
              name: 'Capital',
              data: ChartsYaxis.map(y => y[chartTitles[2]]),
            },
          ],
          total: calcTotal(ChartsYaxis, chartTitles[0]),
          percent: calcPercent(CompareChartsYaxis, ChartsYaxis, chartTitles[0]),
          single: '',
        },
        
      ]

      setCharts(charts)
    }
  }

  useEffect(() => {
    getCharts()
  }, [ChartsXaxis, ChartsYaxis, CompareChartsYaxis, ChartType])

  if(Charts.length === 0 || ChartsXaxis.length === 0 || ChartsYaxis.length === 0 || CompareChartsYaxis.length === 0) return 'Loading...'

  return (
    <>
      <div>
        <input type="date" onChange={e => setStartDate(e.target.value)} value={StartDate} />
        <input type="date" onChange={e => setEndDate(e.target.value)} value={EndDate} />
      </div>

      <div>
        <select onChange={e => setChartType(e.target.value)}>
          <option value={'bar'}>Bar</option>
          <option value={'line'}>Line</option>
        </select>
      </div>
      
      {
        Charts.map(chart => <GlobalChart key={chart._id} props={ chart } />)
      }

    </>
  )
}

export default App