import React from 'react'
import { DateRange } from 'react-date-range';
import { useDashboardGlobalContext } from '../DashboardGlobaleContext';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file

function DashboardDatePicker() {
    let state = useDashboardGlobalContext()
    let [ShowDatePicker] = state.ShowDatePicker
    let setStartDate = state.StartDate[1]
    let setEndDate = state.EndDate[1]
    let [Range, setRange] = state.Range

    let rangeHandler = item => {
        setStartDate(item.selection.startDate)
        setEndDate(item.selection.endDate)
        setRange([item.selection])
    }

    return (
        <div className={`date__picker ${ShowDatePicker ? 'show' : 'hide' }`}>
            <DateRange
                editableDateInputs={true}
                onChange={item => rangeHandler(item)}
                moveRangeOnFirstSelection={false}
                ranges={Range}
                months={2}
                direction="horizontal"
            />
        </div>
    )
}

export default DashboardDatePicker