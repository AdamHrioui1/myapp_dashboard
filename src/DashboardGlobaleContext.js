import { useEffect } from "react";
import { createContext, useContext, useState } from "react";
import Products from "./Orders/Products";
import MainOrders from "./Orders/Orders";
import { getDiffTime } from "./Orders/OrderDatesFunctions";
import OrdersDataByHours from "./OrdersDataByHours";
import OrdersDataByDays from "./OrdersDataByDays";
import GetBestProducts from "./GetBestProducts";
import GetBestCountries from "./GetBestCountries";
import Countries from "./Orders/Countries";
import Visitors from "./Orders/Visitors";
import Referrers from "./Orders/Referrers";
import GetBestByVisits from "./GetBestByVisits";
import VisitorsDataByHours from "./VisitsDataByHours";
import VisitorsDataByDays from "./VisitorsDataByDays";
import Registers from "./Orders/Registers";

let GlobaleContext = createContext()

export let GlobaleProvider = ({ children }) => {
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const [StartDate, setStartDate] = useState('2023-10-10')
    const [EndDate, setEndDate] = useState('2023-10-14')
    const [StartDay, setStartDay] = useState('05 Oct')
    const [EndDay, setEndDay] = useState('15 Oct')
    const [ChartsXaxis, setChartsXaxis] = useState([])
    const [ChartsYaxis, setChartsYaxis] = useState([])
    const [VisitorsData, setVisitorsData] = useState([])
    const [CompareVisitorsData, setCompareVisitorsData] = useState([])
    const [BestProducts, setBestProducts] = useState([])
    const [BestCountries, setBestCountries] = useState([])
    const [BestReferrersBySales, setBestReferrersBySales] = useState([])
    const [BestCountriesByVisits, setBestCountriesByVisits] = useState([])
    const [BestReferrersByVisits, setBestReferrersByVisits] = useState([])
    const [CompareBestCountriesByVisits, setCompareBestCountriesByVisits] = useState([])
    const [CompareBestReferrersByVisits, setCompareBestReferrersByVisits] = useState([])
    const [CompareChartsYaxis, setCompareChartsYaxis] = useState([])
    const [DiffTime, setDiffTime] = useState(1)
    const [RegistredClients, setRegistredClients] = useState([])
    const [CompareRegistredClients, setCompareRegistredClients] = useState([])
    
    let updateChart = () => {
        let data = []
        let compareData = []
        let visitors = []
        let compareVisitors = []
        let registred = []
        let compareRegistred = []
        
        let startDateTime = new Date(new Date(StartDate).setHours(0)).getTime()
        let compareDateStart = new Date(startDateTime - 86400000 * (getDiffTime(StartDate, EndDate) + 1))
        let compareDateEnd = new Date(new Date(startDateTime).getTime() - 86400000)
        
        
        let diff = getDiffTime(StartDate, EndDate) + 1
        let bestProducts = GetBestProducts(Products, MainOrders, StartDate, EndDate)
        let bestCountries = GetBestCountries(Products, MainOrders, StartDate, EndDate, Countries, Referrers)
        let visits = GetBestByVisits(Visitors, StartDate, EndDate, Countries, Referrers)
        let compareVisits = GetBestByVisits(Visitors, compareDateStart, compareDateEnd, Countries, Referrers)
        
        
        setDiffTime(diff)
        setBestProducts(bestProducts)
        setBestCountries(bestCountries[0])
        setBestReferrersBySales(bestCountries[1])

        setBestCountriesByVisits(visits[0])
        setBestReferrersByVisits(visits[1])
        setCompareBestCountriesByVisits(compareVisits[0])
        setCompareBestReferrersByVisits(compareVisits[1])

        if(diff < 16) {
            data = OrdersDataByHours(Products, MainOrders, StartDate, EndDate)
            compareData = OrdersDataByHours(Products, MainOrders, compareDateStart, compareDateEnd)

            visitors = VisitorsDataByHours(Visitors, StartDate, EndDate)
            compareVisitors = VisitorsDataByHours(Visitors, compareDateStart, compareDateEnd)
            
            registred = VisitorsDataByHours(Registers, StartDate, EndDate)
            compareRegistred = VisitorsDataByHours(Registers, StartDate, EndDate)
        }
        else {
            data = OrdersDataByDays(Products, MainOrders, StartDate, EndDate)
            compareData = OrdersDataByDays(Products, MainOrders, compareDateStart, compareDateEnd)
            
            visitors = VisitorsDataByDays(Visitors, StartDate, EndDate)
            compareVisitors = VisitorsDataByDays(Visitors, compareDateStart, compareDateEnd)

            registred = VisitorsDataByDays(Visitors, StartDate, EndDate)
            compareRegistred = VisitorsDataByDays(Visitors, compareDateStart, compareDateEnd)
        }
        setChartsXaxis(data[0].map(d => d.time))
        
        setChartsYaxis(data[0])
        setCompareChartsYaxis(compareData[0])

        setVisitorsData(visitors)
        setCompareVisitorsData(compareVisitors)
        
        setRegistredClients(registred)
        setCompareRegistredClients(compareRegistred)
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
        VisitorsData: [VisitorsData, setVisitorsData],
        CompareVisitorsData: [CompareVisitorsData, setCompareVisitorsData],
        DiffTime: [DiffTime, setDiffTime],
        BestProducts: [BestProducts, setBestProducts],
        BestCountries: [BestCountries, setBestCountries],
        BestReferrersBySales: [BestReferrersBySales, setBestReferrersBySales],
        BestCountriesByVisits: [BestCountriesByVisits, setBestCountriesByVisits],
        BestReferrersByVisits: [BestReferrersByVisits, setBestReferrersByVisits],
        CompareBestCountriesByVisits: [CompareBestCountriesByVisits, setCompareBestCountriesByVisits],
        CompareBestReferrersByVisits: [CompareBestReferrersByVisits, setCompareBestReferrersByVisits],
        RegistredClients: [RegistredClients, setRegistredClients],
        CompareRegistredClients: [CompareRegistredClients, setCompareRegistredClients],
    }

    return (
        <GlobaleContext.Provider value={state} >
            { children}
        </GlobaleContext.Provider>
    )
}

export let useDashboardGlobalContext = () =>  useContext(GlobaleContext)