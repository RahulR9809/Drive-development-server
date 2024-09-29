import { getDailyFilters,getWeeklyFilters,getMonthlyFilter,getYearlyFilter} from "../../utils/dateFilters.js";
export class TripReportUseCase{
    constructor(dependencies){
        this.tripRepository = new dependencies.repository.MongoTripRepository()
    }
    async execute(filter){
        console.log('em');
        
        let labels = []
        let tripCompletedStat
        
       if(filter == "Daily"){
        const currentTime = new Date()
        const dateRange =  getDailyFilters(currentTime)
        console.log("dat",dateRange);
      
        
        tripCompletedStat = await this.tripRepository.tripSalesReport(dateRange)
        console.log('trip',tripCompletedStat);
        
        
       }else if(filter == "Weekly"){
        const currentTime = new Date()
        const dateRange = getWeeklyFilters(currentTime)
        tripCompletedStat = await this.tripRepository.tripSalesReport(dateRange)

       
        

       }else if(filter == "Monthly"){
        const currentTime = new Date()
        const dateRange = getMonthlyFilter(currentTime)
        tripCompletedStat = await this.tripRepository.tripSalesReport(dateRange)

       
       }else{
        const currentTime = new Date()
        const dateRange = getYearlyFilter(currentTime)
        tripCompletedStat = await this.tripRepository.tripSalesReport(dateRange)

       }
       console.log('hei');
       console.log(tripCompletedStat);
       
     try{ 

      const data =  tripCompletedStat.map((el)=>Object.entries(el)).flat()
      console.log(data);
      const result = data.map(([key, value]) =>{
        const totalRide = value.length > 0 ? value[0].totalAmountFromTrips : 0
        labels.push({[key]:totalRide})
      });
      }catch(error){
        console.error(error);
        
      }
      console.log('lll',labels);
      return labels
    }
}