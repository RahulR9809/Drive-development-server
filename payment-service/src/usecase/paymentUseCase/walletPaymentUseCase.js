export class WalletPaymentUseCase{
    constructor(dependencies){
        this.paymentRepository = new dependencies.repository.MongoPaymentRepository()
        this.userRepository = new dependencies.repository.MongoUserRepository()
        this.tripRepository = new dependencies.repository.MongoTripRepository()
        this.driverRepository =  new dependencies.repository.MongoDriverRepository()
        this.walletRepository = new dependencies.repository.MongoWalletRepository()
        this.comapnyWalletRepository =  new dependencies.repository.MongoCompanyWalletRepository()
    }
    async execute(data){
        try {

            const {userId,tripId,driverId,paymentMethod,fare} = data
            const driversCommision = parseFloat(fare) * 80/100
            const companyCommision = parseFloat(fare) * 20/100
            console.log("commisiosssssssss",driversCommision,companyCommision);
            const parsedFare = parseInt(fare)
            const deductWalletBalance = await this.userRepository.deductWalletBalance(userId,{walletBalance:-parsedFare})
            const userWalletHistory = await this.walletRepository.createWallet({
                userId:userId,
                tripId:tripId,
                amount:fare,
                description:"Money Paid for trip",
                type:"debit"
            })
            const driverWalletHistory = await this.walletRepository.createWallet({
             driverId:driverId,
             tripId:tripId,
             amount:driversCommision,
             description:"Money recieveed from trip",
             type:"credit"
            })
     
            console.log("driverWalletHistory",driverWalletHistory);
            
            const addDriversBalance = await this.driverRepository.updateWalletBalance(driverId,{walletBalance:driversCommision})
            console.log("addDriversBalance",addDriversBalance);
            
            const companyWalletHistory = await this.comapnyWalletRepository.findCompanyWalletUpdate({balance:companyCommision},{
             transactions:{
                 tripId:tripId,
                 transactionType:'credit',
                 description:"money added to wallet"
             }})
            console.log("companyWalletHistory",companyWalletHistory);
            const payment = await this.paymentRepository.findPaymentByTrip_Update(tripId,{
             fare,
             paymentStatus:'paid'
            })
            console.log("payment",payment);
        } catch (error) {
            console.error(error)
        }
    }
}