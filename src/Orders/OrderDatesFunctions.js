// MONTHS NAMES
export const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

// GET ARRAY OF DATES FROM DATE AND NUMBER -> RETURN ALL THE DATES BEFORE THE DATE IN THE PARAMS
export let Dates = (date, num) => {
    let datesArray = []
    let dayInMs = 86400000
    date.setHours(0)
    date.setMinutes(0)
    date.setSeconds(0)
    
    for (let i = num-1; i >= 0; i--) {
        datesArray.push(new Date(date.getTime() - (dayInMs*i)))
    }

    return datesArray
}

// GET START DATE AND END DATE FROM LAST (1D - 2D - 1W - 2W - 1M - 2M - 6M - 1Y - 2Y)
export let getLastDate = num => {
    let endDate = new Date();
    endDate.setHours(0);
    endDate.setMinutes(0);
    endDate.setSeconds(0);
    let startDate = new Date(endDate - (num * 86400000))
    
    return { startDate, endDate }
}

// GET THE DIFFERNCE BETWEEN TWO DAYS -> RETURN NUMBER
export let getDiffTime = (date1, date2) => {
    const d1 = new Date(date1).setHours(0)
    const d2 = new Date(date2).setHours(0)
    const diffTime = Math.abs(d2 - d1)
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
}

// GET THE MINIMUM DATE AND THE MAXIMUM DATE
function getMinMaxDates(date1Str, date2Str) {
    const date1 = new Date(date1Str).setHours(0)
    const date2 = new Date(date2Str).setHours(0)
    const minDate = new Date(Math.min(date1, date2));
    const maxDate = new Date(Math.max(date1, date2));
    return [minDate, maxDate];
}

// FILTER ORDERS BY DATES
export let filterOrdersByDate = (orders, date1, date2) => {
    let [minDate, maxDate] = getMinMaxDates(date1, date2)
    let diffTime = getDiffTime(minDate, maxDate)
    let arrOfDates = Dates(maxDate, diffTime+1)
    let filtredOrders = []

    orders.forEach(o => {
        if(new Date(o.created_date) >= new Date(minDate) && new Date(o.created_date) <= new Date(maxDate.getTime() + 86400000)) {
            filtredOrders.push(o)
        }
    })

    return [arrOfDates, filtredOrders]
}

// CREATE NUMBER FORMATTER. HOW TO USE IT: formatter('USD').format(1250) => $1,250
export let formatter = (currency) => new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: currency,
});

export let calcTotal = (arr, name) => {
    return arr.length > 0 ? arr.map(d => d[name]).reduce((a, b) => a + b) : 0
}

export let calcPercent = (compArr, arr, name) => {
    return calcTotal(compArr, name) === 0 ? 0 : (100 / calcTotal(compArr, name) * calcTotal(arr, name)) - 100
}
