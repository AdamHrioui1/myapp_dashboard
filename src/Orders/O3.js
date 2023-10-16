import { filterOrdersByDate } from "./OrderDatesFunctions"

let date1 = 'Sun Oct 11 2023 00:00:00 GMT+0100 (GMT+01:00)'
let date2 = 'Thu Oct 11 2023 00:00:00 GMT+0100 (GMT+01:00)'

function getTime(hour, day, month, year) {
    const date = new Date(year, month, day, hour);
    return date.getTime();
}

let O3 = (products, orders) => {
    let hoursRange = 1
    let [arrOfDates, filtredOrders] = filterOrdersByDate(orders, date1, date2)
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    
    let barsData = []
    console.log(arrOfDates, '\n', filtredOrders)

    console.log(orders);
    console.log(filtredOrders);

    // PUSH FILTRED ORDERS TO BARS DATA
    filtredOrders.forEach(order => {
        let date = order.created_date
        let day = new Date(date).getDate().toString().padStart(2, '0')
        let month = new Date(date).getMonth()
        let monthString = monthNames[month]
        let year = new Date(date).getFullYear()
        let dayAndMonth = `${day} ${monthString}`
        let OriginHour = new Date(date).getHours()
        let hour = (Math.floor(OriginHour / hoursRange) * hoursRange).toString().padStart(2, '0') + ':00'
        let dayAndMonthAndHour = `${day} ${monthString} ${hour}`
        let time = getTime((Math.floor(OriginHour / hoursRange) * hoursRange), new Date(date).getDate(), month, year)
        
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
                time: time.toString(),
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
            
            for (let j = 0; j < 24; j += hoursRange) {
                let hour = j.toString().padStart(2, '0') + ':00'        
                let time = getTime((Math.floor(j / hoursRange) * hoursRange), new Date(date).getDate(), month, year)
                let dataFounded = barsData.find(d => d.dayAndMonth === dayAndMonth && d.hour === hour)
                if(dataFounded === undefined) {
                    let initialData = {
                        time: time.toString(),
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
    console.log('barsData: ', barsData);
    return barsData
}


export default O3