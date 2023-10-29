import { useEffect } from "react";
import { createContext, useContext, useState } from "react";
import Products from "./Orders/Products";
import MainOrders from "./Orders/Orders";
import { monthNames, calcPercent, calcTotal, getDiffTime } from "./Orders/OrderDatesFunctions";
import OrdersDataByHours from "./OrdersDataByHours";
import OrdersDataByDays from "./OrdersDataByDays";
import GetBestProducts from "./GetBestProducts";
import GetBestCountries from "./GetBestCountries";
import Countries from "./Orders/Countries0";
import Visitors from "./Orders/Visitors";
import Referrers from "./Orders/Referrers";
import GetBestByVisits from "./GetBestByVisits";
import VisitorsDataByHours from "./VisitsDataByHours";
import VisitorsDataByDays from "./VisitorsDataByDays";
import Registers from "./Orders/Registers";
import { addDays } from 'date-fns';

let GlobaleContext = createContext()

export let GlobaleProvider = ({ children }) => {
    const [ChartType, setChartType] = useState('bar')
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
    const [Range, setRange] = useState([{ startDate: new Date(), endDate: addDays(new Date(), 7), key: 'selection' }])
    const [ShowDatePicker, setShowDatePicker] = useState(false)

    
    let [BarCharts, setBarCharts] = useState([])
    let [RowCharts, setRowCharts] = useState([])
    let [MultipleRowCharts, setMultipleRowCharts] = useState([])
    
    let chartTitles = ['total', 'profit', 'capital', 'total_units', 'total_orders']

    const updateChart = () => {
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

            registred = VisitorsDataByDays(Registers, StartDate, EndDate)
            compareRegistred = VisitorsDataByDays(Registers, compareDateStart, compareDateEnd)
        }
        
        setChartsXaxis(data[0].map(d => d.time))
        
        setChartsYaxis(data[0])
        setCompareChartsYaxis(compareData[0])

        setVisitorsData(visitors)
        setCompareVisitorsData(compareVisitors)
        
        setRegistredClients(registred)
        setCompareRegistredClients(compareRegistred)
    }

    const getCharts = () => {
        if(ChartsYaxis.length !== 0) {
            let barCharts = [
                {
                    _id: 'total_visits',
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
                    _id: 'new_clients',
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
                    _id: 'total_slaes',
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
                    _id: 'total_sales_profit',
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
                    _id: 'total_sales_capital',
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
                    _id: 'total_sold_units',
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
                    _id: 'total_orders',
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
                    _id: 'combine_sales',
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
                    _id: 'total_sales_by_',
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
                    _id: 'sales_profit_by_',
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
                    _id: 'capital_spent_by_',
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
                    _id: 'total_sold_units_by_',
                    title: 'Total Sold Units by ',
                    name: 'total_units',
                    img: 'tshirt.svg',
                    by: 'Product',
                    currency: false,
                    total: calcTotal(ChartsYaxis, chartTitles[3]),
                    percent: calcPercent(CompareChartsYaxis, ChartsYaxis, chartTitles[3]),
                    single: 'unit',
                },
                {
                    _id: 'visits_by_country_',
                    title: 'Visits By Countries',
                    name: 'total_visits',
                    img: 'visits.svg',
                    by: '',
                    currency: false,
                    total: calcTotal(BestCountriesByVisits, 'total_visits'),
                    percent: calcPercent(CompareBestCountriesByVisits, BestCountriesByVisits, 'total_visits'),
                    single: '',
                    Data: BestCountriesByVisits
                },
                {
                    _id: 'visits_by_social_media_',
                    title: 'Visits By Social Media',
                    name: 'total_visits',
                    img: 'social_media.svg',
                    by: '',
                    currency: false,
                    total: calcTotal(BestReferrersByVisits, 'total_visits'),
                    percent: calcPercent(CompareBestReferrersByVisits, BestReferrersByVisits, 'total_visits'),
                    single: '',
                    Data: BestReferrersByVisits
                }
            ]

            let multipleRowsCharts = [
                {
                    _id: 'multiple_rows_sales_by_product',
                    main: 'total',
                    title: 'Sales by Product (Total - Profit - Units)',
                    img: 'tshirt.svg',
                    Data: BestProducts,
                    CompareChartsYaxis: CompareChartsYaxis,
                    ChartsYaxis: ChartsYaxis,
                    MainElements: [
                        { name: 'total', title: 'Total', currency: true },
                        { name: 'profit', title: 'Profit', currency: true },
                        { name: 'total_units', title: 'Total Units', currency: false }
                    ],
                    sortBy: 'total',
                    by: '',
                },
                {
                    _id: 'multiple_rows_sales_by_country',
                    main: 'total',
                    title: 'Sales by Country (Total - Profit - Units)',
                    img:  'countries.svg',
                    Data:  BestCountries,
                    CompareChartsYaxis:  CompareChartsYaxis,
                    ChartsYaxis:  ChartsYaxis,
                    MainElements: [
                        { name: 'total', title: 'Total', currency: true },
                        { name: 'profit', title: 'Profit', currency: true },
                        { name: 'total_units', title: 'Total Units', currency: false }
                    ],
                    sortBy: 'total',
                    by: 'Country'
                },
                {
                    _id: 'multiple_rows_sales_by_channel',
                    main: 'total',
                    title: 'Sales by Channel (Total - Profit - Units)',
                    img: 'social_media.svg',
                    Data: BestReferrersBySales,
                    CompareChartsYaxis: CompareChartsYaxis,
                    ChartsYaxis: ChartsYaxis,
                    MainElements: [
                        { name: 'total', title: 'Total', currency: true },
                        { name: 'profit', title: 'Profit', currency: true },
                        { name: 'total_units', title: 'Total Units', currency: false }
                    ],
                    sortBy: 'total',
                    by: 'Channel',
                }
            ]

            setBarCharts(barCharts)
            setRowCharts(rowCharts)
            setMultipleRowCharts(multipleRowsCharts)
        }
    }

    useEffect(() => {
        getCharts()
    }, [ChartsXaxis, ChartsYaxis, CompareChartsYaxis, ChartType])

    useEffect(() => {
        setStartDay(`${new Date(StartDate).getDate().toString().padStart(2, '0')} ${monthNames[new Date(StartDate).getMonth()]}`)
        setEndDay(`${new Date(EndDate).getDate().toString().padStart(2, '0')} ${monthNames[new Date(EndDate).getMonth()]}`)
        updateChart()
    }, [StartDate, EndDate])

    
    let state = {
        ChartType: [ChartType, setChartType],
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
        Range: [Range, setRange],
        ShowDatePicker: [ShowDatePicker, setShowDatePicker],
        BarCharts: [BarCharts, setBarCharts],
        RowCharts: [RowCharts, setRowCharts],
        MultipleRowCharts: [MultipleRowCharts, setMultipleRowCharts],
    }

    return (
        <GlobaleContext.Provider value={state} >
            { children}
        </GlobaleContext.Provider>
    )
}

export let useDashboardGlobalContext = () =>  useContext(GlobaleContext)