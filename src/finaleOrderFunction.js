// GET ARRAY OF DATES FROM DATE AND NUMBER -> RETURN ALL THE DATES BEFORE THE DATE IN THE PARAMS
let Dates = (date, num) => {
    let datesArray = []
    let dayInMs = 1000*60*60*24
    let h_m_s = 1000 * (60*60 * new Date(date).getHours() + 60 * new Date(date).getMinutes() + new Date(date).getSeconds())
    for (let i = num-1; i >= 0; i--) {
        datesArray.push(new Date(date - (dayInMs*i) - h_m_s))
    }
    return datesArray
}

// GET THE DIFFERNCE BETWEEN TWO DAYS -> RETURN NUMBER
let getDiffTime = (date1, date2) => {
    const d1 = new Date(date1)
    const d2 = new Date(date2)
    const diffTime = Math.abs(d2 - d1)
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
}

// GET ALL DATES BETWEEN TWO DATES
let getDatesFromCalendar = (date1, date2) => {
    const d1 = new Date(date1)
    const d2 = new Date(date2)
    const maxDate = Math.max(d2, d1)
    const diffTime = Math.abs(d2 - d1)
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return Dates(maxDate - (1000 * 60 * 60 * 24), diffDays)
}

// EDIT ON ARRAY OF GENERATED DATES
let editOnGeneratedDates = (dates) => {
    let newArr = []
    for (let i = 0; i < dates.length; i++) {
        newArr.push({ date: dates[i] + '', cart: 0 })
    }
    return newArr
}

// GET THE MINIMUM DATE AND THE MAXIMUM DATE
function getMinMaxDates(date1Str, date2Str) {
    const date1 = new Date(date1Str);
    const date2 = new Date(date2Str);
    const minDate = new Date(Math.min(date1, date2));
    const maxDate = new Date(Math.max(date1, date2));
    return [minDate, maxDate];
}

// GET ARRAY OF DATA'S DATES BETWEEN FIRST AND LAST DATES
function filterDatesByRange(datesArray, date1, date2) {
    const [d1, d2] = getMinMaxDates(date1, date2)
    const filteredDates = datesArray.filter(date => new Date(date.date) >= d1 && new Date(date.date) <= d2);
    return filteredDates;
}

// SORT DATES BY DATE
function sortDates(dateStrings) {
    const sortedDates = dateStrings.sort((a, b) => new Date(a.date) - new Date(b.date));
    return sortedDates;
}

let getTotalOrders = (array) => {
    let total = 0
    for (let i = 0; i < array.length; i++) {
        total += array[i]
    }
    return total
}

let groups = (xaxis_label2, xaxis_label1) => {
    let group = []
    for (let i = 0; i < xaxis_label2.length; i++) {
        group.push({ title: xaxis_label2[i], cols: xaxis_label1.length / xaxis_label2.length })
    }
    return group
}

export let concatinateCustomerDataAndGeneratedDates = (from, to) => {
    let [minDate, maxDate] = getMinMaxDates(from, to)
    let filtredData = []
    let datesFromTo = getDatesFromCalendar(minDate, maxDate)
    let editedDates = editOnGeneratedDates(datesFromTo)
    let concatinatedData = editedDates.concat(filtredData)
    let sortedDates = sortDates(concatinatedData)
    
    let diff = getDiffTime(minDate, maxDate)
    
    if(diff === 1){
        let data = []
        let xaxis_label1 = data.map(d => d.date)
        let xaxis_label2 = data[0].day
        let yaxis = data.map(o => o.orders)
        let total = getTotalOrders(yaxis)
        let groups = []

        let obj = {
            data,
            xaxis_label1,
            xaxis_label2,
            yaxis,
            total,
            groups
        }
        // console.log(obj);
        // return [data, total]
        return data
    }
    else if (diff === 2){
        let data = []
        let xaxis_label1 = data.map(d => d.date)
        let xaxis_label2 = Array.from(new Set(data.map(d => d.monthAndDay)))
        let yaxis = data.map(o => o.orders)
        let total = getTotalOrders(yaxis)
        let groups = [
            { title: xaxis_label2[0], cols: 12 },
            { title: xaxis_label2[1], cols: 12 },
        ]

        let obj = {
            data,
            xaxis_label1,
            xaxis_label2,
            yaxis,
            total,
            groups,
        }

        return data
    }
    else if (diff === 3){
        let data = []
        let xaxis_label1 = data.map(d => d.date)
        let xaxis_label2 = Array.from(new Set(data.map(d => d.monthAndDay)))
        let yaxis = data.map(o => o.orders)
        let total = getTotalOrders(yaxis)
        let groups = [
            { title: xaxis_label2[0], cols: 8 },
            { title: xaxis_label2[1], cols: 8 },
            { title: xaxis_label2[2], cols: 8 },
        ]

        let obj = {
            data,
            xaxis_label1,
            xaxis_label2,
            yaxis,
            total,
            groups,
        }
        // console.log(obj);

        return data
    }
    
    else if (diff >= 4 && diff < 7) {
        // console.log('between 4 & 7');
        // console.log(sortedDates)
        // console.log(get4DaysOrders(sortedDates))
        
        // let data = get4DaysOrders(sortedDates)
        let data = []
        let xaxis_label1 = data.map(d => d.date)
        let xaxis_label2 = Array.from(new Set(data.map(d => d.monthAndDay)))
        let yaxis = data.map(o => o.orders)
        let total = getTotalOrders(yaxis)

        let obj = {
            data,
            xaxis_label1,
            xaxis_label2,
            yaxis,
            total,
            groups: groups(xaxis_label2, xaxis_label1)
        }
        // console.log(obj);
        return data
    }
    else if (diff === 7){
        // console.log('week');
        // console.log(sortedDates)
        // console.log(get7DaysOrders(sortedDates))
        
        
        // let data = get7DaysOrders(sortedDates)
        let data = []
        let xaxis_label1 = data.map(d => d.date)
        let xaxis_label2 = Array.from(new Set(data.map(d => d.monthAndDay)))
        let yaxis = data.map(o => o.orders)
        let total = getTotalOrders(yaxis)

        let obj = {
            data,
            xaxis_label1,
            xaxis_label2,
            yaxis,
            total,
            groups: groups(xaxis_label2, xaxis_label1)
        }
        // console.log(obj);
        return data
    }
    else if (diff >= 8 && diff < 11) {
        // console.log('between 8 & 11');
        // console.log(sortedDates)
        // console.log(get8DaysOrders(sortedDates))
        
        // let data = get8DaysOrders(sortedDates)
        let data = []
        let xaxis_label1 = data.map(d => d.date)
        let xaxis_label2 = Array.from(new Set(data.map(d => d.monthName)))
        let yaxis = data.map(o => o.orders)
        let total = getTotalOrders(yaxis)

        let obj = {
            data,
            xaxis_label1,
            xaxis_label2,
            yaxis,
            total,
            groups: groups(xaxis_label2, xaxis_label1)
        }
        // console.log(obj);
        return data
    }
    else if (diff >= 11 && diff < 16) {
        // console.log('between 11 & 16');
        // console.log(sortedDates)
        // console.log(get11DayOrders(sortedDates))
        
        
        // let data = get11DayOrders(sortedDates)
        let data = []
        let xaxis_label1 = data.map(d => d.date)
        let xaxis_label2 = Array.from(new Set(data.map(d => d.monthName)))
        let yaxis = data.map(o => o.orders)
        let total = getTotalOrders(yaxis)

        let obj = {
            data,
            xaxis_label1,
            xaxis_label2,
            yaxis,
            total,
            groups: [],
        }
        // console.log(obj);
        return data
    }
    else if (diff >= 16 && diff < 60) {
        // console.log('between 16 & 60');
        // console.log(sortedDates)
        // console.log(get16DayOrders(sortedDates))
        
        // let data = get16DayOrders(sortedDates)
        let data = []
        let xaxis_label1 = data.map(d => d.monthAndDay)
        let xaxis_label2 = Array.from(new Set(data.map(d => d.monthName)))
        let yaxis = data.map(o => o.orders)
        let total = getTotalOrders(yaxis)

        let obj = {
            data,
            xaxis_label1,
            xaxis_label2,
            yaxis,
            total,
            groups: groups(xaxis_label2, xaxis_label1),
        }
        // console.log(obj);
        return data
    }
    else if (diff >= 60 && diff < 90) {
        // console.log('between 60 & 90');
        // console.log(sortedDates)
        // console.log(get60DayOrders(sortedDates))
        
        
        // let data = get60DayOrders(sortedDates)
        let data = []
        let xaxis_label1 = data.map(d => d.date)
        let xaxis_label2 = Array.from(new Set(data.map(d => d.monthName)))
        let yaxis = data.map(o => o.orders)
        let total = getTotalOrders(yaxis)

        let obj = {
            data,
            xaxis_label1,
            xaxis_label2,
            yaxis,
            total,
            groups: groups(xaxis_label2, xaxis_label1),
        }
        // console.log(obj);
        return data
    }
    else if (diff >= 90 && diff < 120) {
        // console.log('between 90 & 120');
        // console.log(sortedDates)
        // console.log(get90DayOrders(sortedDates))
        
        
        // let data = get90DayOrders(sortedDates)
        let data = []
        let xaxis_label1 = data.map(d => d.date)
        let xaxis_label2 = Array.from(new Set(data.map(d => d.monthName)))
        let yaxis = data.map(o => o.orders)
        let total = getTotalOrders(yaxis)

        let obj = {
            data,
            xaxis_label1,
            xaxis_label2,
            yaxis,
            total,
        }
        // console.log(obj);
        return data
    }
    else if (diff >= 120 && diff < 180) {
        // console.log('between 120 & 180');
        // console.log(sortedDates)
        // console.log(get120DayOrders(sortedDates))
        
        
        // let data = get120DayOrders(sortedDates)
        let data = []
        let xaxis_label1 = data.map(d => d.date)
        let xaxis_label2 = Array.from(new Set(data.map(d => d.monthName)))
        let yaxis = data.map(o => o.orders)
        let total = getTotalOrders(yaxis)

        let obj = {
            data,
            xaxis_label1,
            xaxis_label2,
            yaxis,
            total,
        }
        // console.log(obj);
        return data
    }
    else if (diff >= 180 && diff < 365) {
        // console.log('between 180 & 365');
        // console.log(sortedDates)
        // console.log(get180DayOrders(sortedDates))
        
        
        // let data = get180DayOrders(sortedDates)
        let data = []
        let xaxis_label1 = data.map(d => d.date)
        let xaxis_label2 = Array.from(new Set(data.map(d => d.monthName)))
        let yaxis = data.map(o => o.orders)
        let total = getTotalOrders(yaxis)

        let obj = {
            data,
            xaxis_label1,
            xaxis_label2,
            yaxis,
            total,
            xTickAmount: xaxis_label2.length - 1,
        }
        // console.log(obj);
        return data
    }
    else {
        // console.log('bigger than 365');
        // console.log(sortedDates)
        // console.log(get365DayOrders(sortedDates))
        
        
        // let data = get365DayOrders(sortedDates)
        let data = []
        let xaxis_label1 = data.map(d => d.date)
        let xaxis_label2 = Array.from(new Set(data.map(d => d.monthAndDay)))
        let yaxis = data.map(o => o.orders)
        let total = getTotalOrders(yaxis)

        let obj = {
            data,
            xaxis_label1,
            xaxis_label2,
            yaxis,
            xTickAmount: xaxis_label1.length - 1,
            total,
        }
        // console.log(obj);
        return data
    }
}

/*
groups: [
    { title: '2019', cols: 12 },
    { title: '2020', cols: 12 }
]
*/