export const getDailyFilters = (now)=>{
        const dailyDateRange = []
        const currentTime = new Date(now)
        const startTime = new Date(currentTime)
        startTime.setHours(0,0,0,0) 
       dailyDateRange.push({
        day:startTime.toLocaleString('en-US',{weekday:'long'}),
        startTime,
        endTime:currentTime
       })

        for(let i=1;i<7;i++){
            const currentDay = new Date(currentTime)
            const prevDayStart = new Date(currentDay)
            prevDayStart.setDate(prevDayStart.getDate()-i)
            prevDayStart.setHours(0,0,0,0)
            const prevDayEnd =new Date(currentDay)
            prevDayEnd.setDate(prevDayEnd.getDate()-i)
            prevDayEnd.setHours(23,59,59,999)
            dailyDateRange.push({
                day:prevDayStart.toLocaleString('en-US',{weekday:'long'}),
                startTime:prevDayStart,
                endTime:prevDayEnd
            })
        }
// console.log(dailyDateRange);
return dailyDateRange
}