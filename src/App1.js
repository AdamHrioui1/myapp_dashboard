import { useDashboardGlobalContext } from './DashboardGlobaleContext';
import GlobalChart from './components/GlobalChart';
import RowChart from './components/RowChart';
import CompareRowChart from './components/CompareRowChart';
import DashboardNavbar from './components/DashboardNavbar';
import DashboardSidebar from './components/DashboardSidebar';
import DashboardHeader from './components/DashboardHeader';
import DashboardDatePicker from './components/DashboardDatePicker';
import DashboardGroupsTitle from './components/DashboardGroupsTitle';

function App1() {
    let state = useDashboardGlobalContext()

    let [BarCharts] = state.BarCharts
    let [RowCharts] = state.RowCharts
    let [MultipleRowCharts] = state.MultipleRowCharts
    let [ChartsXaxis] = state.ChartsXaxis
    let [ChartsYaxis] = state.ChartsYaxis
    let [CompareChartsYaxis] = state.CompareChartsYaxis
    let [BestProducts] = state.BestProducts
    let [BestCountries] = state.BestCountries
    let [BestReferrersBySales] = state.BestReferrersBySales

    let Best = [
        { title: 'Top Selling Products', by: 'Products', img: 'tshirt.svg', data: BestProducts },
        { title: 'Top Selling Countries', by: 'Countries', img: 'countries.svg', data: BestCountries },
        { title: 'Top Selling Channels', by: 'Channels', img: 'social_media.svg', data: BestReferrersBySales },
    ]
    
    if(BarCharts.length === 0 || RowCharts.length === 0 || MultipleRowCharts.length === 0 || ChartsXaxis.length === 0 || ChartsYaxis.length === 0 || CompareChartsYaxis.length === 0) return 'Loading...'

    return (
        <>
            <DashboardNavbar title={'Analytics'} />
            <DashboardSidebar />
            <DashboardHeader />
            <DashboardDatePicker />

            <div className="home__charts__container">
                { <GlobalChart key={BarCharts[0]._id} props={ BarCharts[0] } /> }
                { <GlobalChart key={BarCharts[2]._id} props={ BarCharts[2] } /> }
                { <GlobalChart key={BarCharts[7]._id} props={ BarCharts[7] } /> }
                { MultipleRowCharts.map(chart => <CompareRowChart key={chart._id} props={chart} />) }
                { <GlobalChart key={BarCharts[1]._id} props={ BarCharts[1] } /> }
                <DashboardGroupsTitle title='Sales' />
                { BarCharts.slice(2, -1).map(chart => <GlobalChart key={chart._id} props={ chart } />) }
                {
                    Best.map(item => {
                        return (
                            <div className='group__charts' key={item.title}>     
                                <DashboardGroupsTitle title={item.title} />
                                { RowCharts.slice(0, -2).map(chart => <RowChart key={chart._id + item.title} props={{ ...chart, img: item.img, by: item.by, Data: item.data }} />) }
                            </div>
                        )
                    })
                }                
                <DashboardGroupsTitle title='Visits Analytics' />
                { RowCharts.slice(4, 6).map(chart => <RowChart key={chart._id} props={{ ...chart, Data: chart.Data }} />) }
            </div>
        </>
    )
}



export default App1