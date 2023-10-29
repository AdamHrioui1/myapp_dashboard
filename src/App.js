import { useEffect, useState } from 'react';
import { useDashboardGlobalContext } from './DashboardGlobaleContext';
import { calcPercent, calcTotal } from './Orders/OrderDatesFunctions';
import GlobalChart from './components/GlobalChart';
import RowChart from './components/RowChart';
import CompareRowChart from './components/CompareRowChart';

function App() {
  let [ChartType, setChartType] = useState('bar')
  let [Charts, setCharts] = useState([])
  let [RowCharts, setRowCharts] = useState([])
  let state = useDashboardGlobalContext()
  let [StartDate, setStartDate] = state.StartDate
  let [EndDate, setEndDate] = state.EndDate
  let [DiffTime] = state.DiffTime
  let [ChartsXaxis] = state.ChartsXaxis
  let [ChartsYaxis] = state.ChartsYaxis
  let [CompareChartsYaxis] = state.CompareChartsYaxis
  let [BestProducts] = state.BestProducts
  let [BestCountries] = state.BestCountries
  let [BestReferrersBySales] = state.BestReferrersBySales
  let [BestCountriesByVisits] = state.BestCountriesByVisits
  let [BestReferrersByVisits] = state.BestReferrersByVisits
  let [CompareBestCountriesByVisits] = state.CompareBestCountriesByVisits
  let [CompareBestReferrersByVisits] = state.CompareBestReferrersByVisits
  let [VisitorsData] = state.VisitorsData
  let [CompareVisitorsData] = state.CompareVisitorsData
  let [RegistredClients] = state.RegistredClients
  let [CompareRegistredClients] = state.CompareRegistredClients
  
  let chartTitles = ['total', 'profit', 'capital', 'total_units', 'total_orders']

  let getCharts = () => {
    if(ChartsYaxis.length !== 0) {
      let charts = [
        {
          _id: 10,
          name: 'Visits',
          img: 'visits.svg',
          type: ChartType,
          diff: DiffTime,
          currency: false,
          x: ChartsXaxis,
          y: VisitorsData.map(y => y['total_visits']),
          total: calcTotal(VisitorsData, 'total_visits'),
          series: [],
          percent: calcPercent(CompareVisitorsData, VisitorsData, 'total_visits'),
          single: 'visitor',
        },
        {
          _id: 20,
          name: 'Registed Clients',
          img: 'client.svg',
          type: ChartType,
          diff: DiffTime,
          currency: false,
          x: ChartsXaxis,
          y: RegistredClients.map(y => y['total_visits']),
          total: calcTotal(RegistredClients, 'total_visits'),
          series: [],
          percent: calcPercent(CompareRegistredClients, RegistredClients, 'total_visits'),
          single: 'new client',
        },
        {
          _id: 0,
          name: 'Total Sales',
          img: 'total.svg',
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
          name: 'Sales Profit',
          img: 'profit.svg',
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
          name: 'Sales Capital',
          img: 'wallet.svg',
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
          name: 'Total Sold Units',
          img: 'tshirt.svg',
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
          img: 'order.svg',
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
          name: 'Combine Sales (Total - Profit - Capital)',
          img: 'total.svg',
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

      let rowCharts = [
        {
          _id: 0,
          title: 'Total Sales by ',
          name: 'total',
          img: 'tshirt.svg',
          by: 'Product',
          currency: true,
          total: calcTotal(ChartsYaxis, chartTitles[0]),
          percent: calcPercent(CompareChartsYaxis, ChartsYaxis, chartTitles[0]),
          single: '',
        },
        {
          _id: 1,
          title: 'Sales Profit by ',
          name: 'profit',
          img: 'tshirt.svg',
          by: 'Product',
          currency: true,
          total: calcTotal(ChartsYaxis, chartTitles[1]),
          percent: calcPercent(CompareChartsYaxis, ChartsYaxis, chartTitles[1]),
          single: '',
        },
        {
          _id: 2,
          title: 'Capital Spent by ',
          name: 'capital',
          img: 'tshirt.svg',
          by: 'Product',
          currency: true,
          total: calcTotal(ChartsYaxis, chartTitles[2]),
          percent: calcPercent(CompareChartsYaxis, ChartsYaxis, chartTitles[2]),
          single: '',
        },
        {
          _id: 3,
          title: 'Total Sold Units by ',
          name: 'total_units',
          img: 'tshirt.svg',
          by: 'Product',
          currency: false,
          total: calcTotal(ChartsYaxis, chartTitles[3]),
          percent: calcPercent(CompareChartsYaxis, ChartsYaxis, chartTitles[3]),
          single: 'unit',
        },
      ]

      setCharts(charts)
      setRowCharts(rowCharts)
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
      
      <div className="home__charts__container">
        { Charts.map(chart => <GlobalChart key={Math.random()} props={ chart } />) }
        { RowCharts.map(chart => <RowChart key={Math.random()} props={ chart } Data={BestProducts} />) }
        <CompareRowChart 
          main='total' 
          title={'Sales by Product (Total - Profit - Units)'}
          img={'tshirt.svg'}
          Data={BestProducts}
          CompareChartsYaxis={CompareChartsYaxis}
          ChartsYaxis={ChartsYaxis}
          MainElements={[
            { name: 'total', title: 'Total', currency: true },
            { name: 'profit', title: 'Profit', currency: true },
            { name: 'total_units', title: 'Total Units', currency: false }
          ]}
          sortBy='total'
        />
        
        { RowCharts.map(chart => <RowChart key={Math.random()} props={{ ...chart, img: 'countries.svg', by: 'Country' }} Data={BestCountries} />) }
        
        <CompareRowChart 
          main='total' 
          title={'Sales by Country (Total - Profit - Units)'}
          img={'countries.svg'}
          Data={BestCountries}
          CompareChartsYaxis={CompareChartsYaxis}
          ChartsYaxis={ChartsYaxis}
          MainElements={[
            { name: 'total', title: 'Total', currency: true },
            { name: 'profit', title: 'Profit', currency: true },
            { name: 'total_units', title: 'Total Units', currency: false }
          ]}
          sortBy='total'
          by='Country'
        />
        
        
        { RowCharts.map(chart => <RowChart key={Math.random()} props={{ ...chart, img: 'social_media.svg', by: 'Channel' }} Data={BestReferrersBySales} />) }

        <CompareRowChart 
          main='total' 
          title={'Sales by Channel (Total - Profit - Units)'}
          by='Channel'
          img={'social_media.svg'}
          Data={BestReferrersBySales}
          CompareChartsYaxis={CompareChartsYaxis}
          ChartsYaxis={ChartsYaxis}
          MainElements={[
            { name: 'total', title: 'Total', currency: true },
            { name: 'profit', title: 'Profit', currency: true },
            { name: 'total_units', title: 'Total Units', currency: false }
          ]}
          sortBy='total'
        />

        <RowChart key={Math.random() + "horay"} props={ 
          {
            _id: 0,
            title: 'Visits By Countries',
            name: 'total_visits',
            img: 'visits.svg',
            by: '',
            currency: false,
            total: calcTotal(BestCountriesByVisits, 'total_visits'),
            percent: calcPercent(CompareBestCountriesByVisits, BestCountriesByVisits, 'total_visits'),
            single: '',
          }  
        } Data={BestCountriesByVisits} />
        
        <RowChart key={Math.random() + "woow"} props={ 
          {
            _id: Math.random(),
            title: 'Visits By Social Media',
            name: 'total_visits',
            img: 'social_media.svg',
            by: '',
            currency: false,
            total: calcTotal(BestReferrersByVisits, 'total_visits'),
            percent: calcPercent(CompareBestReferrersByVisits, BestReferrersByVisits, 'total_visits'),
            single: '',
          }  
        } Data={BestReferrersByVisits} />
      </div>
    </>
  )
}



export default App