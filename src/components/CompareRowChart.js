import { useEffect, useState } from "react"
import { useDashboardGlobalContext } from "../DashboardGlobaleContext"
import { calcPercent, calcTotal, formatter } from "../Orders/OrderDatesFunctions"
import incomeUp from '../assets/income_up.svg'
import incomeDown from '../assets/income_down.svg'

let CompareRowChart = ({ props }) => {
    let { main, title, Data, CompareChartsYaxis, ChartsYaxis, MainElements, sortBy, img } = props
    const [Percent, setPercent] = useState(0)
    const [Total, setTotal] = useState(0)
    const [ClickedItem, setClickedItem] = useState({ item: '', clicked: false, currency: true })
    
    let state = useDashboardGlobalContext()
    let [StartDay] = state.StartDay
    let [EndDay] = state.EndDay
    
    let TotalsTotal = Data.reduce((a, b) => a + b[MainElements[0].name], 0)
    let ProfitsTotal = Data.reduce((a, b) => a + b[MainElements[1].name], 0)
    let UnitsTotal = Data.reduce((a, b) => a + b[MainElements[2].name], 0)
    let Totals = [TotalsTotal, ProfitsTotal, UnitsTotal]

    let MaxTotal = Math.max(...Data.map(p => p[MainElements[0].name]))
    let MaxProfit = Math.max(...Data.map(p => p[MainElements[1].name]))
    let MaxUnits = Math.max(...Data.map(p => p[MainElements[2].name]))
    let Maxes = [MaxTotal, MaxProfit, MaxUnits]

    let ClickInItem = item => {
        setPercent(calcPercent(CompareChartsYaxis, ChartsYaxis, item.name))
        setTotal(calcTotal(ChartsYaxis, item.name))
        setClickedItem({ item: item.name, clicked: item.name === ClickedItem.item ? !ClickedItem.clicked : true, currency: item.currency })
    }

    useEffect(() => {
        setPercent(calcPercent(CompareChartsYaxis, ChartsYaxis, main))
        setTotal(calcTotal(ChartsYaxis, main))
    }, [ChartsYaxis, CompareChartsYaxis, StartDay, EndDay, main])
    
    return (
        <div className='simple__chart__container'>
            <div className="header">
                <div className='left'>
                    <div className="img__title">
                        <div className="img_container">
                            <img src={`/assets/charts_icons/${img}`} alt="" />
                        </div>
                        <span>{title}</span>
                    </div>
                    <h1>
                        {
                            ClickedItem.currency ?
                            formatter('USD').format(Total) :
                            Total
                        }
                    </h1>
                </div>

                <div className='right'>
                    <div className="top">
                        <span>{StartDay} - {EndDay}</span>
                    </div>
                    <div className="bottom">
                        <span style={{ color: Percent >= 0 ? '#4ccb00' : '#ff7070' }}>
                            { Percent >= 0 && '+' } { Percent.toFixed(2) }%
                        </span>
                        <img src={Percent >= 0 ? incomeUp : incomeDown} alt="arrow up" />
                    </div>
                </div>
            </div>

            <div className="content">
                {
                    Data.length !== 0 ?
                    Data
                    .sort((a, b) => b[sortBy] - a[sortBy])
                    .slice(0, 4)
                    .map((product, i) => {
                        return (
                            <div className='body multiple' key={title + i}>
                                <div className="left">
                                    <img src={product.small_img} alt="" title={product.name} />
                                    {/* <div className="percent">
                                        {
                                            MainElements.map((element, i) => {
                                                return (
                                                    <div key={(i+1)*234} className={`content ${ClickedItem.clicked ? ClickedItem.item === MainElements[i].name ? '' : 'hide' : ''}`}>
                                                        <span>
                                                            ({ (product[element.name] / Totals[i] * 100).toFixed(2) }%)
                                                        </span>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div> */}
                                </div>

                                <div className="center multiple_bars">
                                    {
                                        MainElements.map((element, i) => {
                                            return (
                                                <div
                                                    key={(i+1)*123} 
                                                    className={`bar ${ClickedItem.clicked ? ClickedItem.item === MainElements[i].name ? '' : 'hide' : ''}`} 
                                                    style={{ width: product[element.name] / Maxes[i] * 100 + '%' }}
                                                    onClick={() => ClickInItem(MainElements[i])}
                                                >
                                                    <div className="popup">
                                                        <span></span>
                                                        {(product[element.name] / Totals[i] * 100).toFixed(2)}%
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>

                                <div className="right multiple_content">
                                {
                                    MainElements.map((element, i) => {
                                        return (
                                            <div key={(i+1)*234} className={`content ${ClickedItem.clicked ? ClickedItem.item === MainElements[i].name ? '' : 'hide' : ''}`}>
                                                
                                                <span>
                                                    {
                                                        element.currency ?
                                                        formatter('USD').format(product[element.name]) :
                                                        product[element.name]
                                                    }
                                                </span>

                                                {/* <span>
                                                    ({ (product[element.name] / Totals[i] * 100).toFixed(2) }%)
                                                </span> */}
                                            </div>
                                        )
                                    })
                                }
                                </div>
                            </div>
                        )
                    }) : 
                    
                    <div className='no__data'>
                        <p>There was no data found for this date range.</p>
                    </div>
                }
            </div>

            {
                Data.length !== 0 ? 
                <div className="footer">
                    {
                        MainElements.map((item, i) => {
                            return (
                                <div 
                                    className="item" 
                                    key={(i+1)*345} 
                                    onClick={() => ClickInItem(item)}
                                >
                                    <div></div>
                                    <span>{item.title}</span>
                                </div>
                            )
                        })
                    }
                </div> : ''
            }

            <div className="see_more">
                <a href="/">See more 🡒</a>                
            </div>
        </div>
    )
}

export default CompareRowChart