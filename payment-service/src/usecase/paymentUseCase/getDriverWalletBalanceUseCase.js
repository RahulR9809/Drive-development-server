export class GetDriverWalletBalanceUseCase{
    constructor(dependencies){
        this.driverRepository =  new dependencies.repository.MongoDriverRepository()
    }
    async execute(driverId){
        try {
            const getDriver =   await this.driverRepository.findDriverbyId(driverId)
            const getDriversWalletBalance = getDriver.walletBalance
            console.log("getWalletBalance",getDriversWalletBalance);
            return getDriversWalletBalance
        } catch (error) {
            console.error(error)
        }
    }
}