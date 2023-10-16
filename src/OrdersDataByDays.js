import { filterOrdersByDate, getDiffTime } from "./Orders/OrderDatesFunctions"

let OrdersDataByDays = (products, orders, date1, date2) => {
    let daysInterval = 1
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    let [_, filtredOrders] = filterOrdersByDate(orders, date1, date2)
    let arrOfDates = []
    let diff = getDiffTime(date1, date2) + 1
    let d1 = new Date(date1).setHours(0)
    d1 = new Date(d1).getTime()
    
    if(diff >= 16 && diff < 60) {
        daysInterval = 1
    }
    else if(diff >= 60 && diff < 90) {
        daysInterval = 2
    }
    else if(diff >= 90 && diff < 120) {
        daysInterval = 3
    }
    else if(diff >= 120 && diff < 180) {
        daysInterval = 7
    }
    else if(diff >= 180 && diff < 365) {
        daysInterval = 14
    }
    else if(diff >= 365) {
        daysInterval = 30
    }

    for (let i = 0; i < diff; i+=daysInterval) {
        let date = new Date(d1 + (i * 86400000))
        let day = new Date(date).getDate().toString().padStart(2, '0')
        let month = new Date(date).getMonth()
        let monthString = monthNames[month]
        let year = new Date(date).getFullYear()
        let dayAndMonth = `${day} ${monthString}`
        let time = date.getTime()

        let initialData = {
            date: date,
            time, 
            day,
            month: monthString,
            year, 
            dayAndMonth, 
            total: 0,
            capital: 0,
            profit: 0,
            total_units: 0,
            total_orders: 0,
        }
        arrOfDates.push(initialData)
    }

    filtredOrders.forEach(order => {
        let date = order.created_date
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
        let dataFounded = arrOfDates.find(d => parseInt(time) >= parseInt(d.time) && parseInt(time) < (parseInt(d.time) + (daysInterval * 86400000)))
        
        if(dataFounded) {
            dataFounded.total += total
            dataFounded.capital += capital
            dataFounded.profit += profit
            dataFounded.total_units += total_units
            dataFounded.total_orders += total_orders
        }
    })

    return [arrOfDates]
}

export default OrdersDataByDays