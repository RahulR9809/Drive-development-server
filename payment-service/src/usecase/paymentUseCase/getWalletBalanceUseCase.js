export class GetWalletBalanceUseCase{
    constructor(dependencies){
        this.userRepository = new dependencies.repository.MongoUserRepository()
    }
    async execute(userId){
        try {
        const getUser =   await this.userRepository.findUserById(userId)
        const getUsersWalletBalance = getUser.walletBalance
        console.log("getWalletBalance",getUsersWalletBalance);
        return getUsersWalletBalance
        } catch (error) {
            console.error(error)
        }
    }
}