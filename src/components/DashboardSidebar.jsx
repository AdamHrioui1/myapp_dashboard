import React from 'react'
import DashboardSidebarObject from './DashboardSidebarObject'

function DashboardSidebar() {
    
    return (
        <div className="left__side__bar">
            <div className="header">
                <div className="logo">
                    <h1>MyApp</h1>
                </div>

                <div className="store__switch">
                    <div className="top">
                        { DashboardSidebarObject[0].img }
                        <span>{ DashboardSidebarObject[0].name }</span>
                    </div>

                    <select name="" id="">
                        <option value="cool">Cool</option>
                        <option value="cool">Woow</option>
                        <option value="cool">Yawyaw</option>
                    </select>
                </div>
            </div>

            <div className="body">
                {
                    DashboardSidebarObject
                    .slice(1, -2)
                    .map(item => {
                        return (
                            <div className="item" key={item.name}>
                                <div className="img_container">
                                    { item.img ? item.img : <img src="/assets/charts_icons/tshirt.svg" alt="" /> }                                
                                </div>
                                <span>{item.name}</span>
                            </div>
                        )
                    })
                }
            </div>

            <div className="footer">
                {
                    DashboardSidebarObject
                    .slice(DashboardSidebarObject.length - 2, DashboardSidebarObject.length)
                    .map(item => {
                        return (
                            <div className="item" key={item.name}>
                                <div className="img_container">
                                    { item.img ? item.img : <img src="/assets/charts_icons/tshirt.svg" alt="" /> }                                
                                </div>
                                <span>{item.name}</span>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default DashboardSidebar