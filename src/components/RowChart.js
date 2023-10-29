import { useDashboardGlobalContext } from '../DashboardGlobaleContext';
import { formatter } from '../Orders/OrderDatesFunctions';
import incomeUp from '../assets/income_up.svg'
import incomeDown from '../assets/income_down.svg'

let RowChart = ({ props }) => {
    const { name, title, by, currency, total, percent, single, img, Data } = props
    let state = useDashboardGlobalContext()
    let [StartDay] = state.StartDay
    let [EndDay] = state.EndDay
    
    return (
        <div className='simple__chart__container'>
            <div className="header">
                <div className='left'>
                    <div className="img__title">
                        <div className="img_container">
                            <img src={`/assets/charts_icons/${img}`} alt="" />
                        </div>
                        <span>{title} {!by ? '' : by}</span>
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

            <div className="content">
                {
                    Data.length !== 0 ?
                    Data
                    .sort((a, b) => b[name] - a[name])
                    .slice(0, 6)
                    .map((product, i) => {
                        return (
                            <div className='body' key={title + i}>
                                <div className="left">
                                    <img src={product.small_img} alt="" title={product.name ? product.name : product._id} />
                                </div>

                                <div className="center" 
                                    style={{ 
                                        width: product[name] / Data[0][name] * 100 + '%' 
                                    }}
                                >
                                    <div className='bar' 
                                        style={{ 
                                            width: product[name] / Data[0][name] * 100 + '%' 
                                        }}
                                    >
                                        <div className="popup">
                                            <span></span>
                                            {(product[name] / total * 100).toFixed(2)}%
                                        </div>
                                    </div>
                                </div>

                                <div className="right">
                                    <div className="content">
                                        {/* <span>({ (product[name] / total * 100).toFixed(2) }%)</span> */}

                                        <span>
                                            { 
                                                currency ? 
                                                formatter('USD').format(product[name]) :
                                                product[name]
                                            }
                                        </span>
                                    </div>
                                </div>
                            </div>
                        )
                    }) :

                    <div className='no__data'>
                        <p>There was no data found for this date range.</p>
                    </div>
                }
            </div>

            <div className="see_more">
                <a href="/">See more 🡒</a>                
            </div>
        </div>
    )
}

export default RowChart