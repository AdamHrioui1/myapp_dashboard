import React from 'react'

function DashboardNavbar({ title }) {
    return (
        <div className="dashboard__navbar">
            <div className="title">
                <h1>{title}</h1>
            </div>
        </div>
    )
}

export default DashboardNavbar