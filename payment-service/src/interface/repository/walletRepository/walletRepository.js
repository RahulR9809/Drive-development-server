import {walletModel} from '../../database/schema/walletSchema/walletSchema.js'
export class WalletRepository{
    constructor(){}
    async createWallet(data){
       return await walletModel.create(data)
    }
    async getAllWalletsByUserId(id){
        return await walletModel.find({userId:id})
    }
}