// export class CancelRideController{
//     constructor(dependencies){
//         this.cancelRideUseCase = new dependencies.useCase.CancelRideUseCase(dependencies)
//     }
//     async cancelRide(req,res,next){
//         try {
//         const cancelDetails = await this.cancelRideUseCase.execute(req.body)
      
        
//         res.status(201).json({status:"cancelled"})
//         } catch (error) {
//             console.error(error);
//             next(error)
//         }
//     }
// }


export class CancelRideController{
    constructor(dependencies){
        this.cancelRideUseCase = new dependencies.useCase.CancelRideUseCase(dependencies)
    }
    async cancelRide(req,res,next){
        try {
            console.log('what is happening')

         await this.cancelRideUseCase.execute(req.body)
        res.status(201).json({status:"cancelled"})
        } catch (error) {
            console.error('er in contr',error);
            next(error)
        }
        
    }
}