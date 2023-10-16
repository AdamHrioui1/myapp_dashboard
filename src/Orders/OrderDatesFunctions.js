// GET ARRAY OF DATES FROM DATE AND NUMBER -> RETURN ALL THE DATES BEFORE THE DATE IN THE PARAMS
export let Dates = (date, num) => {
    let datesArray = []
    let dayInMs = 1000*60*60*24
    let h_m_s = 1000 * (60*60 * new Date(date).getHours() + 60 * new Date(date).getMinutes() + new Date(date).getSeconds())
    for (let i = num-1; i >= 0; i--) {
        datesArray.push(new Date(date - (dayInMs*i) - h_m_s))
    }
    return datesArray
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

// CREATE NUMBER FORMATTER
export let formatter = (currency) => new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: currency,
});

export let calcTotal = (arr, name) => {
    return arr.map(d => d[name]).reduce((a, b) => a + b)
}

export let calcPercent = (compArr, arr, name) => {
    return calcTotal(compArr, name) === 0 ? 0 : (100 / calcTotal(compArr, name) * calcTotal(arr, name)) - 100
}
