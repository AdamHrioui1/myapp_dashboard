import { filterOrdersByDate, getDiffTime } from "./OrderDatesFunctions";
let date1 = 'Sun Oct 11 2023 00:00:00 GMT+0100 (GMT+01:00)'
let date2 = 'Thu Dec 11 2023 00:00:00 GMT+0100 (GMT+01:00)'

let O5 = (products, orders, daysInterval = 3) => {
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    let [_, filtredOrders] = filterOrdersByDate(orders, date1, date2)
    let arrOfDates = []
    let diff = getDiffTime(date1, date2)
    let d1 = new Date(date1).getTime()

    for (let i = 0; i < diff; i+=daysInterval) {
        let date = new Date(d1 + (i * 86400000))
        let day = new Date(date).getDate().toString().padStart(2, '0')
        let month = new Date(date).getMonth()
        let monthString = monthNames[month]
        let year = new Date(date).getFullYear()
        let dayAndMonth = `${day} ${monthString}`
        let time = date.getTime()

        let initialData = {
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

    console.log(arrOfDates);
    return arrOfDates
}

export default O5