// let chartTitles = ['total', 'profit', 'capital', 'total_units', 'total_orders']

// let getCharts = () => {
//     if(ChartsYaxis.length !== 0) {
//         let barCharts = [
//             {
//                 _id: 'total_visits',
//                 name: 'Visits',
//                 img: 'visits.svg',
//                 type: ChartType,
//                 diff: DiffTime,
//                 currency: false,
//                 x: ChartsXaxis,
//                 y: VisitorsData.map(y => y['total_visits']),
//                 total: calcTotal(VisitorsData, 'total_visits'),
//                 series: [],
//                 percent: calcPercent(CompareVisitorsData, VisitorsData, 'total_visits'),
//                 single: 'visitor',
//             },
//             {
//                 _id: 'new_clients',
//                 name: 'Registed Clients',
//                 img: 'client.svg',
//                 type: ChartType,
//                 diff: DiffTime,
//                 currency: false,
//                 x: ChartsXaxis,
//                 y: RegistredClients.map(y => y['total_visits']),
//                 total: calcTotal(RegistredClients, 'total_visits'),
//                 series: [],
//                 percent: calcPercent(CompareRegistredClients, RegistredClients, 'total_visits'),
//                 single: 'new client',
//             },
//             {
//                 _id: 'total_slaes',
//                 name: 'Total Sales',
//                 img: 'total.svg',
//                 type: ChartType,
//                 diff: DiffTime,
//                 currency: true,
//                 x: ChartsXaxis,
//                 y: ChartsYaxis.map(y => y[chartTitles[0]]),
//                 total: calcTotal(ChartsYaxis, chartTitles[0]),
//                 series: [],
//                 percent: calcPercent(CompareChartsYaxis, ChartsYaxis, chartTitles[0]),
//                 single: '',
//             },
//             {
//                 _id: 'total_sales_profit',
//                 name: 'Sales Profit',
//                 img: 'profit.svg',
//                 type: ChartType,
//                 diff: DiffTime,
//                 currency: true,
//                 x: ChartsXaxis,
//                 y: ChartsYaxis.map(y => y[chartTitles[1]]),
//                 total: calcTotal(ChartsYaxis, chartTitles[1]),
//                 series: [],
//                 percent: calcPercent(CompareChartsYaxis, ChartsYaxis, chartTitles[1]),
//                 single: '',
//             },
//             {
//                 _id: 'total_sales_capital',
//                 name: 'Sales Capital',
//                 img: 'wallet.svg',
//                 type: ChartType,
//                 diff: DiffTime,
//                 currency: true,
//                 x: ChartsXaxis,
//                 y: ChartsYaxis.map(y => y[chartTitles[2]]),
//                 total: calcTotal(ChartsYaxis, chartTitles[2]),
//                 series: [],
//                 percent: calcPercent(CompareChartsYaxis, ChartsYaxis, chartTitles[2]),
//                 single: '',
//             },
//             {
//                 _id: 'total_sold_units',
//                 name: 'Total Sold Units',
//                 img: 'tshirt.svg',
//                 type: ChartType,
//                 diff: DiffTime,
//                 currency: false,
//                 x: ChartsXaxis,
//                 y: ChartsYaxis.map(y => y[chartTitles[3]]),
//                 total: calcTotal(ChartsYaxis, chartTitles[3]),
//                 series: [],
//                 percent: calcPercent(CompareChartsYaxis, ChartsYaxis, chartTitles[3]),
//                 single: 'unit',
//             },
//             {
//                 _id: 'total_orders',
//                 name: 'Total Orders',
//                 img: 'order.svg',
//                 type: ChartType,
//                 diff: DiffTime,
//                 currency: false,
//                 x: ChartsXaxis,
//                 y: ChartsYaxis.map(y => y[chartTitles[4]]),
//                 series: [],
//                 total: calcTotal(ChartsYaxis, chartTitles[4]),
//                 percent: calcPercent(CompareChartsYaxis, ChartsYaxis, chartTitles[4]),
//                 single: 'order',
//             },
//             {
//                 _id: 'combine_sales',
//                 name: 'Combine Sales (Total - Profit - Capital)',
//                 img: 'total.svg',
//                 type: 'line',
//                 diff: DiffTime,
//                 currency: true,
//                 x: ChartsXaxis,
//                 y: [],
//                 series: [
//                     {
//                         name: 'Total',
//                         data: ChartsYaxis.map(y => y[chartTitles[0]]),
//                     },
//                     {
//                         name: 'Profit',
//                         data: ChartsYaxis.map(y => y[chartTitles[1]]),
//                     },
//                     {
//                         name: 'Capital',
//                         data: ChartsYaxis.map(y => y[chartTitles[2]]),
//                     },
//                 ],
//                 total: calcTotal(ChartsYaxis, chartTitles[0]),
//                 percent: calcPercent(CompareChartsYaxis, ChartsYaxis, chartTitles[0]),
//                 single: '',
//             },
//         ]

//         let rowCharts = [
//             {
//                 _id: 'total_sales_by_',
//                 title: 'Total Sales by ',
//                 name: 'total',
//                 img: 'tshirt.svg',
//                 by: 'Product',
//                 currency: true,
//                 total: calcTotal(ChartsYaxis, chartTitles[0]),
//                 percent: calcPercent(CompareChartsYaxis, ChartsYaxis, chartTitles[0]),
//                 single: '',
//             },
//             {
//                 _id: 'sales_profit_by_',
//                 title: 'Sales Profit by ',
//                 name: 'profit',
//                 img: 'tshirt.svg',
//                 by: 'Product',
//                 currency: true,
//                 total: calcTotal(ChartsYaxis, chartTitles[1]),
//                 percent: calcPercent(CompareChartsYaxis, ChartsYaxis, chartTitles[1]),
//                 single: '',
//             },
//             {
//                 _id: 'capital_spent_by_',
//                 title: 'Capital Spent by ',
//                 name: 'capital',
//                 img: 'tshirt.svg',
//                 by: 'Product',
//                 currency: true,
//                 total: calcTotal(ChartsYaxis, chartTitles[2]),
//                 percent: calcPercent(CompareChartsYaxis, ChartsYaxis, chartTitles[2]),
//                 single: '',
//             },
//             {
//                 _id: 'total_sold_units_by_',
//                 title: 'Total Sold Units by ',
//                 name: 'total_units',
//                 img: 'tshirt.svg',
//                 by: 'Product',
//                 currency: false,
//                 total: calcTotal(ChartsYaxis, chartTitles[3]),
//                 percent: calcPercent(CompareChartsYaxis, ChartsYaxis, chartTitles[3]),
//                 single: 'unit',
//             },
//             {
//                 _id: 'visits_by_country_',
//                 title: 'Visits By Countries',
//                 name: 'total_visits',
//                 img: 'visits.svg',
//                 by: '',
//                 currency: false,
//                 total: calcTotal(BestCountriesByVisits, 'total_visits'),
//                 percent: calcPercent(CompareBestCountriesByVisits, BestCountriesByVisits, 'total_visits'),
//                 single: '',
//                 Data: BestCountriesByVisits
//             },
//             {
//                 _id: 'visits_by_social_media_',
//                 title: 'Visits By Social Media',
//                 name: 'total_visits',
//                 img: 'social_media.svg',
//                 by: '',
//                 currency: false,
//                 total: calcTotal(BestReferrersByVisits, 'total_visits'),
//                 percent: calcPercent(CompareBestReferrersByVisits, BestReferrersByVisits, 'total_visits'),
//                 single: '',
//                 Data: BestReferrersByVisits
//             }
//         ]

//         let multipleRowsCharts = [
//             {
//                 _id: 'multiple_rows_sales_by_product',
//                 main: 'total',
//                 title: 'Sales by Product (Total - Profit - Units)',
//                 img: 'tshirt.svg',
//                 Data: BestProducts,
//                 CompareChartsYaxis: CompareChartsYaxis,
//                 ChartsYaxis: ChartsYaxis,
//                 MainElements: [
//                     { name: 'total', title: 'Total', currency: true },
//                     { name: 'profit', title: 'Profit', currency: true },
//                     { name: 'total_units', title: 'Total Units', currency: false }
//                 ],
//                 sortBy: 'total',
//                 by: '',
//             },
//             {
//                 _id: 'multiple_rows_sales_by_country',
//                 main: 'total',
//                 title: 'Sales by Country (Total - Profit - Units)',
//                 img:  'countries.svg',
//                 Data:  BestCountries,
//                 CompareChartsYaxis:  CompareChartsYaxis,
//                 ChartsYaxis:  ChartsYaxis,
//                 MainElements: [
//                     { name: 'total', title: 'Total', currency: true },
//                     { name: 'profit', title: 'Profit', currency: true },
//                     { name: 'total_units', title: 'Total Units', currency: false }
//                 ],
//                 sortBy: 'total',
//                 by: 'Country'
//             },
//             {
//                 _id: 'multiple_rows_sales_by_channel',
//                 main: 'total',
//                 title: 'Sales by Channel (Total - Profit - Units)',
//                 img: 'social_media.svg',
//                 Data: BestReferrersBySales,
//                 CompareChartsYaxis: CompareChartsYaxis,
//                 ChartsYaxis: ChartsYaxis,
//                 MainElements: [
//                     { name: 'total', title: 'Total', currency: true },
//                     { name: 'profit', title: 'Profit', currency: true },
//                     { name: 'total_units', title: 'Total Units', currency: false }
//                 ],
//                 sortBy: 'total',
//                 by: 'Channel',
//             }
//         ]

//         setBarCharts(barCharts)
//         setRowCharts(rowCharts)
//         setMultipleRowCharts(multipleRowsCharts)
//     }
// }

// GetDashboardsData(DiffTime, BarCharts, setBarCharts, RowCharts, setRowCharts, MultipleRowCharts, setMultipleRowCharts, ChartType, ChartsXaxis, ChartsYaxis, CompareChartsYaxis, BestProducts, BestCountries, BestReferrersBySales, BestCountriesByVisits, BestReferrersByVisits, CompareBestCountriesByVisits, CompareBestReferrersByVisits, VisitorsData, CompareVisitorsData, RegistredClients, CompareRegistredClients)

// useEffect(() => {
//     // console.log(GetDashboardsData());
//     // getCharts()
// }, [ChartsXaxis, ChartsYaxis, CompareChartsYaxis, ChartType])
