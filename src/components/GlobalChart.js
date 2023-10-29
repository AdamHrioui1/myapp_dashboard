import Chart from "react-apexcharts";
import { useDashboardGlobalContext } from '../DashboardGlobaleContext';
import { ChartObj } from './ChartObj';
import { formatter } from '../Orders/OrderDatesFunctions';
import incomeUp from '../assets/income_up.svg'
import incomeDown from '../assets/income_down.svg'

function GlobalChart({ props }) {
    const { name, type, diff, currency, x, y, total, percent, single, series, img } = props
    let state = useDashboardGlobalContext()
    let [StartDay] = state.StartDay
    let [EndDay] = state.EndDay
    let options = ChartObj(x, y, name, type, diff, currency, [], series)

    if(Object.keys(options).length === 0) return <h1>Loading...</h1>

    return (
        <div className="simple__chart__container">
            <div className="header">
                <div className='left'>
                    <div className="img__title">
                        <div className="img_container">
                            <img src={`/assets/charts_icons/${img}`} alt="" />
                        </div>
                        <span>{name}</span>
                    </div>
                    <h1>
                        {
                            currency ? 
                            formatter('USD').format(total) :
                            total.toLocaleString()
                        }
                        <span>{single}</span>
                    </h1>
                </div>

                <div className='right'>
                    <div className="top">
                        <span>{StartDay} - {EndDay}</span>
                    </div>
                    <div className="bottom">
                        <span style={{ color: percent >= 0 ? '#4ccb00' : '#ff7070' }}>
                            { percent >= 0 && '+' } { percent.toFixed(2) }%
                        </span>
                        <img src={percent >= 0 ? incomeUp : incomeDown} alt="arrow up" />
                    </div>
                </div>
            </div>

            <Chart
                options={options.options}
                series={options.series}
                type={type}
                width="100%"
                height={250}
            />

            <div className="see_more">
                <a href="/">See more 🡒</a>                
            </div>
        </div>
    )
}

export default GlobalChart