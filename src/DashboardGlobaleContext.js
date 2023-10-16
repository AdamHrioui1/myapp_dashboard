import { useEffect } from "react";
import { createContext, useContext, useState } from "react";
import Products from "./Orders/Products";
import MainOrders from "./Orders/Orders";
import { getDiffTime } from "./Orders/OrderDatesFunctions";
import OrdersDataByHours from "./OrdersDataByHours";
import OrdersDataByDays from "./OrdersDataByDays";

let GlobaleContext = createContext()

export let GlobaleProvider = ({ children }) => {
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const [StartDate, setStartDate] = useState('2023-10-10')
    const [EndDate, setEndDate] = useState('2023-10-14')
    const [StartDay, setStartDay] = useState('05 Oct')
    const [EndDay, setEndDay] = useState('15 Oct')
    const [ChartsXaxis, setChartsXaxis] = useState([])
    const [ChartsYaxis, setChartsYaxis] = useState([])
    const [CompareChartsYaxis, setCompareChartsYaxis] = useState([])
    const [DiffTime, setDiffTime] = useState(1)
    
    let updateChart = () => {
        let data = []
        let compareData = []
        
        let startDateTime = new Date(new Date(StartDate).setHours(0)).getTime()
        let compareDateStart = new Date(startDateTime - 86400000 * (getDiffTime(StartDate, EndDate) + 1))
        let compareDateEnd = new Date(new Date(startDateTime).getTime() - 86400000)
        let diff = getDiffTime(StartDate, EndDate) + 1
        setDiffTime(diff)

        if(diff < 16) {
            data = OrdersDataByHours(Products, MainOrders, StartDate, EndDate)
            compareData = OrdersDataByHours(Products, MainOrders, compareDateStart, compareDateEnd)
        }
        else {
            data = OrdersDataByDays(Products, MainOrders, StartDate, EndDate)
            compareData = OrdersDataByDays(Products, MainOrders, compareDateStart, compareDateEnd)
        }
        setChartsXaxis(data[0].map(d => d.time))
        setChartsYaxis(data[0])
        setCompareChartsYaxis(compareData[0])
    }

    useEffect(() => {
        setStartDay(`${new Date(StartDate).getDate().toString().padStart(2, '0')} ${monthNames[new Date(StartDate).getMonth()]}`)
        setEndDay(`${new Date(EndDate).getDate().toString().padStart(2, '0')} ${monthNames[new Date(EndDate).getMonth()]}`)
        updateChart()
    }, [StartDate, EndDate])
    
    let state = {
        StartDate: [StartDate, setStartDate],
        EndDate: [EndDate, setEndDate],
        StartDay: [StartDay, setStartDay],
        EndDay: [EndDay, setEndDay],
        ChartsXaxis: [ChartsXaxis, setChartsXaxis],
        ChartsYaxis: [ChartsYaxis, setChartsYaxis],
        CompareChartsYaxis: [CompareChartsYaxis, setCompareChartsYaxis],
        DiffTime: [DiffTime, setDiffTime],
    }

    return (
        <GlobaleContext.Provider value={state} >
            { children}
        </GlobaleContext.Provider>
    )
}

export let useDashboardGlobalContext = () =>  useContext(GlobaleContext)