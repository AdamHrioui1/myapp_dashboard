import React from 'react'
import { useDashboardGlobalContext } from '../DashboardGlobaleContext'
import { getLastDate } from '../Orders/OrderDatesFunctions'

function DashboardHeader() {
    
    let state = useDashboardGlobalContext()
    let setChartType = state.ChartType[1]
    let [StartDay] = state.StartDay
    let [EndDay] = state.EndDay
    let setStartDate = state.StartDate[1]
    let setEndDate = state.EndDate[1]
    let setRange = state.Range[1]
    let [ShowDatePicker, setShowDatePicker] = state.ShowDatePicker

    let pickDate = (num) => {
        setStartDate(getLastDate(num).startDate)
        setEndDate(getLastDate(num).endDate)
        setRange([{ 
            key: "selection", 
            startDate: getLastDate(num).startDate,
            endDate: getLastDate(num).endDate,
        }])
    }
    
    let displayDatePicker = () => setShowDatePicker(!ShowDatePicker)

    let pickDateBtns = [
        { name: '1D', numOfDays: 1 },
        { name: '2D', numOfDays: 2 },
        { name: '1W', numOfDays: 7 },
        { name: '2W', numOfDays: 14 },
        { name: '1M', numOfDays: 30 },
        { name: '2M', numOfDays: 60 },
        { name: '6M', numOfDays: 180 },
        { name: '1Y', numOfDays: 365 },
        { name: '2Y', numOfDays: 730 },
    ]

    return (
        <div className='dashboard_header'>
                <div className="date__range">
                    <button className="date__picker__btn" onClick={displayDatePicker}>
                        <img src="/assets/dashboard_icons/calendar.svg" alt="" />
                        <span>From:</span>
                        <p>{StartDay}</p>
                        <span>To:</span>
                        <p>{EndDay}</p>
                    </button>
                </div>

                <div className="btns__container">
                    {
                        pickDateBtns.map(btn => {
                            return (
                                <button key={btn.name} className='btn' onClick={() => pickDate(btn.numOfDays)}>{btn.name}</button>
                            )
                        })
                    }
                </div>
                
                <div className='select__chart__type'>
                    <select onChange={e => setChartType(e.target.value)}>
                        <option value={'bar'}>Bar</option>
                        <option value={'line'}>Line</option>
                    </select>
                </div>
        </div>
    )
}

export default DashboardHeader