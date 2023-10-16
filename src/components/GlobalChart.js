import React, { useEffect, useState } from 'react'
import Chart from "react-apexcharts";
import { useDashboardGlobalContext } from '../DashboardGlobaleContext';
import { ChartObj } from './ChartObj';
import { formatter } from '../Orders/OrderDatesFunctions';
import incomeUp from '../assets/income_up.svg'
import incomeDown from '../assets/income_down.svg'

function GlobalChart({ props }) {
    // const [ChartData, setChartData] = useState({options: {}, series: []})
    const { name, type, diff, currency, x, y, total, percent, single, series } = props
    let state = useDashboardGlobalContext()
    let [StartDay] = state.StartDay
    let [EndDay] = state.EndDay
    
    let options = ChartObj(x, y, name, type, diff, currency, [], series)

    if(Object.keys(options).length === 0) return 'loading... '

    return (
        <div className="chart__container">
            <div className="title_container">
                <div className='chart_title_left'>
                    <span>{name}: </span>
                    <h1>{currency ? formatter('USD').format(total) : total.toLocaleString()} <span>{single}</span></h1>
                </div>
                <div className='chart_title_right'>
                    <div className="c_t_r_top">
                        <span>{StartDay} - {EndDay}</span>
                    </div>
                    <div className="c_t_r_bottom">
                        <span style={{ color: percent >= 0 ? '#4ccb00' : '#ff7070' }} >{percent > 0 && '+'} {percent.toFixed(2)}%</span>
                        <img src={percent >= 0 ? incomeUp : incomeDown} alt="" />
                    </div>
                </div>
            </div>

            <Chart
                options={options.options}
                series={options.series}
                type={type}
                width="600"
                height={300}
            />
        </div>
    )
}

export default GlobalChart