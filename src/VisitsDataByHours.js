// import { filterOrdersByDate } from "./OrderDatesFunctions"
import { filterOrdersByDate, getDiffTime } from "./Orders/OrderDatesFunctions";

function getTime(hour, day, month, year) {
    const date = new Date(year, month, day, hour);
    return date.getTime();}
// GET DATA BY HOURLY INTERVAL
let VisitorsDataByHours = (visitors, date1, date2) => {
    let hoursInterval = 24
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    let [arrOfDates, filtredVisitors] = filterOrdersByDate(visitors, date1, date2)
    let barsData = []

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
    if(filtredVisitors.length !== 0) {
        filtredVisitors.forEach(visitor => {
            let date = visitor.created_date
            let day = new Date(date).getDate().toString().padStart(2, '0')
            let month = new Date(date).getMonth()
            let monthString = monthNames[month]
            let year = new Date(date).getFullYear()
            let dayAndMonth = `${day} ${monthString}`
            let OriginHour = new Date(date).getHours()
            let hour = (Math.floor(OriginHour / hoursInterval) * hoursInterval).toString().padStart(2, '0') + ':00'
            let dayAndMonthAndHour = `${day} ${monthString} ${hour}`
            let time = new Date(date).getTime()
    
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
                    total_visits: 1,
                }
                barsData.push(initialData)
            }
            else {
                dataFounded.total_visits += 1
            }
    
            // GENERATE DATE & HOURS WITH EMPTY DATA (TOTAL_VISITS)
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
                            total_visits: 0,
                        }
                        barsData.push(initialData)
                    }                
                }
            }
        })

        barsData.sort((a, b) => a.time - b.time)
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
                total_visits: 0,
            }

            barsData.push(initialData)
        }

        barsData.sort((a, b) => a.time - b.time)
    }


    return barsData
}

export default VisitorsDataByHours