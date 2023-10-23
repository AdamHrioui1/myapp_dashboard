import { useDashboardGlobalContext } from '../DashboardGlobaleContext';
import { formatter } from '../Orders/OrderDatesFunctions';
import incomeUp from '../assets/income_up.svg'
import incomeDown from '../assets/income_down.svg'

let RowChart = ({ props, Data }) => {
    const { name, title, currency, total, percent, single } = props
    let state = useDashboardGlobalContext()
    let [StartDay] = state.StartDay
    let [EndDay] = state.EndDay
    
    return (
        <div className='simple__chart__container'>
            <div className="header">
                <div className='left'>
                    <span>{title}:</span>
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
                    Data
                    .sort((a, b) => b[name] - a[name])
                    .map(product => {
                        return (
                            <div className='body' key={product.name + Math.random()} datatype={product.name + Math.random()}>
                                <div className="left">
                                    <img src={product.small_img} alt="" title={product.name} />
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
                                            {
                                                currency ?
                                                `${formatter('USD').format(product[name])} (${(product[name] / total * 100).toFixed(2)}%)` :
                                                `${product[name]} (${(product[name] / total * 100).toFixed(2)}%)`
                                            }
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
                    })
                }
            </div>
        </div>
    )
}

export default RowChart