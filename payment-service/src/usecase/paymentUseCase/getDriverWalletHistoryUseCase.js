export class GetDriverWalletHistoryUseCase{
    constructor(dependencies){
        this.walletRepository = new dependencies.repository.MongoWalletRepository()
    }
    async execute(driverId){
        try {
          const getDriverWalletHistory =   await this.walletRepository.getAllWalletsByDriverId(driverId)
          console.log("getDriverWalletHistory",getDriverWalletHistory);
          return getDriverWalletHistory
        } catch (error) {
            console.error(error)
        }
    }
}