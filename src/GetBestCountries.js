import { filterOrdersByDate } from "./Orders/OrderDatesFunctions"

let GetBestCountries = (products, orders, date1, date2, countries) => {
    let arrayOfBestCountries = []
    let bestCountries = {}
    let filtredOrders = filterOrdersByDate(orders, date1, date2)[1]
    // let d1 = new Date(date1).setHours(0)
    // d1 = new Date(d1).getTime()
    // let d1 = new Date(new Date(date1).setHours(0)).getTime()

    filtredOrders.forEach(order => {
        let total = 0
        let capital = 0
        let profit = 0
        let total_units = 0
        
        order.products.forEach(product => {
            let targetProduct = products.filter(p => p._id === product._id)
            
            targetProduct = targetProduct[0]
            total += targetProduct.price * product.units
            capital += targetProduct.capital * product.units
            profit += targetProduct.profit * product.units
            total_units += product.units
        })

        let countryExist = Object.keys(bestCountries).find(c => c === order.country)
        let targetCountry = countries.filter(c => c._id === order.country)[0]
        
        if(countryExist) {
            bestCountries[targetCountry._id].total += total
            bestCountries[targetCountry._id].capital += capital
            bestCountries[targetCountry._id].profit += profit
            bestCountries[targetCountry._id].total_units += total_units
        }
        else {
            bestCountries[targetCountry._id] = { 
                _id: targetCountry._id, 
                name: targetCountry.name, 
                small_img: targetCountry.small_img, 
                total, capital, profit, total_units 
            }
        }
    })
    
    Object.keys(bestCountries).map(c => arrayOfBestCountries.push(bestCountries[c]))
    
    return arrayOfBestCountries
}

export default GetBestCountries