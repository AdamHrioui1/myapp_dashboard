// import { filterOrdersByDate } from "./OrderDatesFunctions"
import { filterOrdersByDate, getDiffTime } from "./Orders/OrderDatesFunctions";

function getTime(hour, day, month, year) {
    const date = new Date(year, month, day, hour);
    return date.getTime();
}

// GET DATA BY HOURLY INTERVAL
let OrdersDataByHours = (products, orders, date1, date2) => {
    let hoursInterval = 24
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    let [arrOfDates, filtredOrders] = filterOrdersByDate(orders, date1, date2)
    let barsData = []
    let groups = []

    let diff = getDiffTime(date1, date2) + 1

    if(diff === 1) {
        hoursInterval = 1
    }
    else if(diff === 2) {
        hoursInterval = 2
    }
    else if(diff === 3) {
        hoursInterval = 3
    }
    else if(diff >= 4 && diff < 7) {
        hoursInterval = 4
    }
    else if(diff === 7) {
        hoursInterval = 6
    }
    else if(diff >= 8 && diff < 11) {
        hoursInterval = 8
    }
    else if(diff >= 11 && diff < 16) {
        hoursInterval = 12
    }

    // PUSH FILTRED ORDERS TO BARS DATA
    if(filtredOrders.length !== 0) {
        filtredOrders.forEach(order => {
            let date = order.created_date
            let day = new Date(date).getDate().toString().padStart(2, '0')
            let month = new Date(date).getMonth()
            let monthString = monthNames[month]
            let year = new Date(date).getFullYear()
            let dayAndMonth = `${day} ${monthString}`
            let OriginHour = new Date(date).getHours()
            let hour = (Math.floor(OriginHour / hoursInterval) * hoursInterval).toString().padStart(2, '0') + ':00'
            let dayAndMonthAndHour = `${day} ${monthString} ${hour}`
            // let time = getTime((Math.floor(OriginHour / hoursInterval) * hoursInterval), new Date(date).getDate(), month, year)
            let time = new Date(date).getTime()
            
            let total = 0
            let capital = 0
            let profit = 0
            let total_units = 0
            let total_orders = 0
    
            order.products.forEach(product => {
                let targetProduct = products.filter(p => p._id === product._id)
                targetProduct = targetProduct[0]
                total += targetProduct.price * product.units
                capital += targetProduct.capital * product.units
                profit += targetProduct.profit * product.units
                total_units += product.units
            })
            total_orders += 1
    
            // ADD OR UPDATE THE DATA IN THE BARS DATA ARRAY
            let dataFounded = barsData.find(d => d.dayAndMonth === dayAndMonth && d.hour === hour)
    
            if(dataFounded === undefined) {
                let initialData = {
                    date: date,
                    time: time,
                    day: day,
                    month: monthString,
                    year: year,
                    dayAndMonth: dayAndMonth,
                    dayAndMonthAndHour: dayAndMonthAndHour,
                    hour: hour,
                    total: total,
                    capital: capital,
                    profit: profit,
                    total_units: total_units,
                    total_orders: total_orders,
                }
                barsData.push(initialData)
            }
            else {
                dataFounded.total += total
                dataFounded.capital += capital
                dataFounded.profit += profit
                dataFounded.total_units += total_units
                dataFounded.total_orders += total_orders
            }
    
            // GENERATE DATE & HOURS WITH EMPTY DATA (CAPITAL, PROFIT, TOTAL_UNITS, TOTAL_ORDERS)
            for (let i = 0; i < arrOfDates.length; i++) {
                let date = arrOfDates[i]
                let day = new Date(date).getDate().toString().padStart(2, '0')
                let month = new Date(date).getMonth()
                let monthString = monthNames[month]
                let year = new Date(date).getFullYear()
                let dayAndMonth = `${day} ${monthString}`
                
                for (let j = 0; j < 24; j += hoursInterval) {
                    let hour = j.toString().padStart(2, '0') + ':00'        
                    let time = getTime((Math.floor(j / hoursInterval) * hoursInterval), new Date(date).getDate(), month, year)
                    let dataFounded = barsData.find(d => d.dayAndMonth === dayAndMonth && d.hour === hour)
                    if(dataFounded === undefined) {
                        let initialData = {
                            date: date,
                            time: time,
                            day: day,
                            month: monthString,
                            year: year,
                            dayAndMonth: dayAndMonth,
                            dayAndMonthAndHour: `${day} ${monthString} ${hour}`,
                            hour: hour,
                            total: 0,
                            capital: 0,
                            profit: 0,
                            total_units: 0,
                            total_orders: 0,
                        }
                        barsData.push(initialData)
                    }                
                }
            }
        })

        barsData.sort((a, b) => a.time - b.time)

        if(diff === 1) {
            groups.push({ title: barsData[0].dayAndMonth, cols: 24 })
        }
        else if(diff === 2) {
            for (let i = 0; i < barsData.length; i+=12) {
                groups.push({ title: barsData[i].dayAndMonth, cols: 12 })
            }
        }
        else if(diff === 3) {
            for (let i = 0; i < barsData.length; i+=8) {
                groups.push({ title: barsData[i].dayAndMonth, cols: 8 })
            }
        }
        else if(diff >= 4 && diff < 7) {
            for (let i = 0; i < barsData.length; i+=6) {
                groups.push({ title: barsData[i].dayAndMonth, cols: 6 })
            }
        }
        else if(diff === 7) {
            for (let i = 0; i < barsData.length; i+=4) {
                groups.push({ title: barsData[i].dayAndMonth, cols: 4 })
            }
        }
        else if(diff >= 8 && diff < 11) {
            for (let i = 0; i < barsData.length; i+=3) {
                groups.push({ title: barsData[i].dayAndMonth, cols: 3 })
            }
        }
        else if(diff >= 11 && diff < 16) {
            for (let i = 0; i < barsData.length; i+=2) {
                groups.push({ title: barsData[i].dayAndMonth, cols: 2 })
            }
        }
    }
    else {
        for (let i = 0; i < diff; i++) {
            let d1 = new Date(new Date(new Date(date1).setHours(0))).getTime()
            let date = new Date(d1 + (i * 86400000))
            let day = new Date(date).getDate().toString().padStart(2, '0')
            let month = new Date(date).getMonth()
            let monthString = monthNames[month]
            let year = new Date(date).getFullYear()
            let dayAndMonth = `${day} ${monthString}`
            let time = date.getTime()
            let hour = '00:00'        
            
            let initialData = {
                date: date,
                time: time,
                day: day,
                month: monthString,
                year: year,
                dayAndMonth: dayAndMonth,
                dayAndMonthAndHour: `${day} ${monthString} ${hour}`,
                hour: hour,
                total: 0,
                capital: 0,
                profit: 0,
                total_units: 0,
                total_orders: 0,
            }

            barsData.push(initialData)
        }

        barsData.sort((a, b) => a.time - b.time)

        for (let i = 0; i < barsData.length; i++) {
            groups.push({ title: barsData[i].dayAndMonth, cols: 1 })
        }
    }


    return [barsData, groups]
}

export default OrdersDataByHours