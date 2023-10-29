import { filterOrdersByDate } from "./Orders/OrderDatesFunctions"

let GetBestProducts = (products, orders, date1, date2) => {
    let arrayOfBestProducts = []
    let bestProducts = {}
    let filtredOrders = filterOrdersByDate(orders, date1, date2)[1]
    // let d1 = new Date(date1).setHours(0)
    // d1 = new Date(d1).getTime()
    // let d1 = new Date(new Date(date1).setHours(0)).getTime()

    filtredOrders.forEach(order => {
        
        order.products.forEach(product => {
            let total = 0
            let capital = 0
            let profit = 0
            let total_units = 0

            let targetProduct = products.filter(p => p._id === product._id)
            
            targetProduct = targetProduct[0]
            total = targetProduct.price * product.units
            capital = targetProduct.capital * product.units
            profit = targetProduct.profit * product.units
            total_units = product.units
            
            let productExist = Object.keys(bestProducts).find(p => p === targetProduct._id)
            
            if(productExist) {
                bestProducts[targetProduct._id].total += total
                bestProducts[targetProduct._id].capital += capital
                bestProducts[targetProduct._id].profit += profit
                bestProducts[targetProduct._id].total_units += total_units
            }
            else {
                bestProducts[targetProduct._id] = { 
                    _id: targetProduct._id, 
                    name: targetProduct.name, 
                    small_img: targetProduct.small_img, 
                    total, capital, profit, total_units 
                }
                // if(Object.keys(targetProduct).length !== 0) {
                //     bestProducts[targetProduct._id] = { 
                //         _id: targetProduct._id, 
                //         name: targetProduct.name, 
                //         small_img: targetProduct.small_img, 
                //         total, capital, profit, total_units 
                //     }
                // }
                // else {
                //     bestProducts[visit.referrer] = { 
                //         _id: visit.referrer,
                //         small_img: 'https://cdn-icons-png.flaticon.com/64/3083/3083741.png ', 
                //         total_visits: 1,
                //     }
                // }
            }
        })
    })
    
    Object.keys(bestProducts).map(p => arrayOfBestProducts.push(bestProducts[p]))
    
    return arrayOfBestProducts
}

export default GetBestProducts