import { filterOrdersByDate } from "./Orders/OrderDatesFunctions"

let GetBestByVisits = (visits, date1, date2, countries, referrers) => {
    let arrayOfBestCountries = []
    let arrayOfBestReferrers = []
    let bestCountries = {}
    let bestReferrers = {}
    let filtredVisits = filterOrdersByDate(visits, date1, date2)[1]

    filtredVisits.forEach(visit => {

        let countryExist = Object.keys(bestCountries).find(c => c === visit.country)
        let targetCountry = countries.filter(c => c._id === visit.country)[0]

        let referrerExist = Object.keys(bestReferrers).find(r => r === visit.referrer)
        let targetReferrer = {}
        targetReferrer = referrers.filter(r => r._id === visit.referrer)[0]
        
        if(countryExist) {
            bestCountries[targetCountry._id].total_visits += 1
        }
        else {
            bestCountries[targetCountry._id] = { 
                _id: targetCountry._id, 
                name: targetCountry.name, 
                small_img: targetCountry.small_img, 
                total_visits: 1,
            }
        }

        if(referrerExist) {
            bestReferrers[targetReferrer._id].total_visits += 1
        }
        else {
            if(targetReferrer) {
                bestReferrers[targetReferrer._id] = { 
                    _id: targetReferrer._id,
                    small_img: targetReferrer.small_img, 
                    total_visits: 1,
                }
            }
            else {
                bestReferrers[visit.referrer] = { 
                    _id: visit.referrer,
                    small_img: 'https://cdn-icons-png.flaticon.com/64/3083/3083741.png ', 
                    total_visits: 1,
                }
            }
        }
    })
    
    // Object.keys(bestCountries).map(c => arrayOfBestCountries.push(bestCountries[c]))
    Object.keys(bestCountries).map(c => arrayOfBestCountries.push(bestCountries[c]))
    Object.keys(bestReferrers).map(r => arrayOfBestReferrers.push(bestReferrers[r]))
    
    return [arrayOfBestCountries, arrayOfBestReferrers]
}

export default GetBestByVisits