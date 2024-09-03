export class GetWalletHistoryUseCase{
    constructor(dependencies){
        this.walletRepository = new dependencies.repository.MongoWalletRepository()
    }
    async execute(userId){
        try {
          const getAllTransactions =   await this.walletRepository.getAllWalletsByUserId(userId)
          console.log("getAllTransactions",getAllTransactions);
          return getAllTransactions
        } catch (error) {
            console.error(error)
        }
    }
}