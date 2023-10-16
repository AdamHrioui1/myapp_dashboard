import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import Chart from "react-apexcharts";
import { concatinateCustomerDataAndGeneratedDates } from './finaleOrderFunction'

function OrdersChart() {
    const [ChartData, setChartData] = useState({})
    const [StartDate, setStartDate] = useState(new Date())
    const [EndDate, setEndDate] = useState(new Date())
    
    let chartObj = (days, orders) => {
        return (
            {
                options: {
                    chart: {
                        id: "basic-bar",
                        toolbar: {
                            show: false,
                        },
                    },
                    xaxis: {
                        categories: days,
                        tickAmount: 12,
                        labels: {
                            rotate: 0,
                            style: {
                                colors: "#70707b",
                                fontSize: '12px',
                                fontFamily: 'Helvetica, Arial, sans-serif',
                                fontWeight: 200,
                                cssClass: 'apexcharts-xaxis-label',
                            }, 
                        },
                        axisBorder: {
                            show: false,
                        },
                        axisTicks: {
                            show: true,
                            height: 3,
                        },
                        group: {
                            style: {
                                fontSize: '10px',
                                fontWeight: 700
                            },
                            groups: [
                                { title: '2019', cols: 12 },
                                { title: '2020', cols: 12 }
                            ]
                        }
                    },
                    yaxis: {
                        tickAmount: 3.5,
                        labels: {
                            style: {
                                colors: "#70707b",
                            }
                        }
                    },
                    fill: {
                        type: 'solid',
                        colors: '#70e0ff',
                    },
                    dataLabels: {
                        enabled: false,
                    },
                    tooltip: {
                        enabled: true,
                        shared: true,
                        intersect: false,
                        fillSeriesColor: false,
                        marker: {
                            show: true,
                        },
                        fixed: {
                            enabled: false,
                        },
                    },
                    grid: {
                        show: true,
                        borderColor: '#eee',
                        strokeDashArray: 0,
                        position: 'back',
                        xaxis: {
                            lines: {
                                show: false,
                            },
                        },   
                        yaxis: {
                            lines: {
                                show: true,
                            }
                        },
                    }
                },
                series: [
                    {
                        name: "Orders",
                        data: orders,
                    }
                ]
            }
        )
    }
    
    useEffect(() => {
        let date1 = 'Fri Sep 27 2023 00:00:00 GMT+0100 (GMT+01:00)'
        let date2 = 'Wed Nov 27 2023 00:00:00 GMT+0100 (GMT+01:00)'
        let data = concatinateCustomerDataAndGeneratedDates(date1, date2)
        
        let days = data.map(d => d.date)
        let orders = data.map(o => o.orders)
        let obj = chartObj(days, orders)
        setChartData(obj)
    }, [])

    useEffect(() => {
        let data = concatinateCustomerDataAndGeneratedDates(StartDate, EndDate)
        let days = data.map(d => d.date)
        let orders = data.map(o => o.orders)
        let obj = chartObj(days, orders)
        setChartData(obj)
    }, [StartDate, EndDate])
    
    
    if(Object.keys(ChartData).length === 0) return null
    return (
        <div className="chart__container">
            <div className="choose__date">
                {/* <button onClick={() => changeDate(1)}>1d</button>
                <button onClick={() => changeDate(3)}>3d</button>
                <button onClick={() => changeDate(7)}>1W</button>
                <button onClick={() => changeDate(14)}>2W</button>
                <button onClick={() => changeDate(30)}>1M</button>
                <button onClick={() => changeDate(60)}>2M</button>
                <button onClick={() => changeDate(365)}>1Y</button> */}
            </div>

            <div>
                <input type="date" onChange={e => setStartDate(e.target.value)} value={StartDate} />
                <input type="date" onChange={e => setEndDate(e.target.value)} value={EndDate} />
            </div>

            <h1>Orders: 56 <span>Last week</span></h1>
            <Chart
                options={ChartData.options}
                series={ChartData.series}
                type="bar"
                width="500"
                height={300}
            />
        </div>
    )
}

export default OrdersChart