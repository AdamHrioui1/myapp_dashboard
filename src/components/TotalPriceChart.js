import React, { useEffect, useState } from 'react'
import Chart from "react-apexcharts";
import { ChartObj, currencyChartNames } from './ChartObj'
import Products from '../Orders/Products'
import MainOrders from '../Orders/Orders'
import OrdersDataByDays from '../OrdersDataByDays';
import { formatter, getDiffTime } from '../Orders/OrderDatesFunctions';
import OrdersDataByHours from '../OrdersDataByHours';
import incomeUp from '../assets/income_up.svg'
import incomeDown from '../assets/income_down.svg'

function TotalPriceChart(props) {
    let { chartName, StartDate, EndDate, StartDay, EndDay, type } = props
    const [ChartData, setChartData] = useState({options: {}, series: []})
    const [Total, setTotal] = useState({ total: 0, name: '' })
    const [CompareInPercent, setCompareInPercent] = useState(0)
    
    let total = 0
    let compareTotal = 0
    let chartTitle = ''

    let updateChart = () => {
        let data = []
        let compareData = []
        let x = []
        let y = []
        
        let startDateTime = new Date(new Date(StartDate).setHours(0)).getTime()
        let compareDateStart = new Date(startDateTime - 86400000 * (getDiffTime(StartDate, EndDate) + 1))
        let compareDateEnd = new Date(new Date(startDateTime).getTime() - 86400000)
        let diff = getDiffTime(StartDate, EndDate) + 1

        if(diff < 16) {
            data = OrdersDataByHours(Products, MainOrders, StartDate, EndDate)
            compareData = OrdersDataByHours(Products, MainOrders, compareDateStart, compareDateEnd)
        }
        else {
            data = OrdersDataByDays(Products, MainOrders, StartDate, EndDate)
            compareData = OrdersDataByDays(Products, MainOrders, compareDateStart, compareDateEnd)
        }
        
        x = data[0].map(d => d.time)
        y = data[0].map(d => d[chartName])
        total = y.reduce((a, b) => a + b)
        compareTotal = compareData[0].map(d => d[chartName]).reduce((a, b) => a + b)

        if(compareTotal !== 0) {
            setCompareInPercent((100 / compareTotal * total) - 100)
        }
        else {
            setCompareInPercent(0)
        }

        switch (chartName) {
            case 'total':
                chartTitle = 'Total'
                break;

            case 'profit':
                chartTitle = 'Profit'
                break;
        
            case 'capital':
                chartTitle = 'Capital'
                break;
                
            case 'total_units':
                chartTitle = 'Total Units'
                break;
                
            case 'total_orders':
                chartTitle = 'Total Orders'
                break;
            default:
                chartTitle = 'Total'
                break;
        }

        setTotal({ title: chartTitle, total: total })
        let obj = ChartObj(x, y, chartTitle, [], type, diff)
        setChartData(obj)
    }

    useEffect(() => {
        updateChart()
    }, [StartDate, EndDate])

    return (
        <div className="chart__container">
            <div className="title_container">
                <div className='chart_title_left'>
                    <span>{Total.title}: </span>
                    <h1>{currencyChartNames.includes(Total.title) ? formatter('USD').format(Total.total) : Total.total.toLocaleString()}</h1>
                </div>
                <div className='chart_title_right'>
                    <div className="c_t_r_top">
                        <span>{StartDay} - {EndDay}</span>
                    </div>
                    <div className="c_t_r_bottom">
                        <span style={{ color: CompareInPercent >= 0 ? '#4ccb00' : '#ff7070' }} >{CompareInPercent > 0 && '+'} {CompareInPercent.toFixed(2)}%</span>
                        <img src={CompareInPercent >= 0 ? incomeUp : incomeDown} alt="" />
                    </div>
                </div>
            </div>
            <Chart
                options={ChartData.options}
                series={ChartData.series}
                type={type}
                width="500"
                height={300}
            />
        </div>
    )
}

export default TotalPriceChart