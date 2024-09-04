export class GetDriverWalletDetailsUseCase{
    constructor(dependencies){
        this.walletRepository = new dependencies.repository.MongoWalletRepository()
        this.driverRepository = new dependencies.repository.MongoDriverRepository()
    }
    async execute(driverId){
        try {

            const getDriverPromise =    this.driverRepository.findDriverbyId(driverId)
            const getDriverWalletHistoryPromie = this.walletRepository.getAllWalletsByDriverId(driverId)
            const [getDriver,getDriverWalletHistory] = await Promise.all([getDriverPromise,getDriverWalletHistoryPromie])
            return {
                driverWalletBalance:getDriver?.walletBalance,
                getDriverWalletHistory
            }
            
        } catch (error) {
            console.error(error);
            
        }
    }
}