import express from 'express'
import {AuthHandler} from '../middleware/authMiddleware.js'
import { PaymentController } from '../controllers/paymentController/paymentController.js'
import { GetTripDetailsController } from '../controllers/paymentController/getTripDetailsController.js'
import { GetTripDetailByIdController } from '../controllers/paymentController/getTripDetailByIdController.js'
import { WalletController } from '../controllers/paymentController/walletController.js'
import { AddMoneyToWalletController } from '../controllers/paymentController/AddMoneyToWalletController.js'
import { GetWalletBalanceController } from '../controllers/paymentController/getWalletBalanceController.js'
import { GetWalletHistoryController } from '../controllers/paymentController/getWalletHistoryController.js'
import { dependencies } from '../../config/dependencies.js'
import { MongoCompanyWalletRepository } from '../repository/index.js'

const paymentRouter = express.Router()

const controllers = {
    stripeController:new PaymentController(dependencies),
    getAllTripDetailsController: new GetTripDetailsController(dependencies),
    getTripDetailByIdController: new GetTripDetailByIdController(dependencies),
    walletController: new WalletController(dependencies),
    addMoneytoWallet: new AddMoneyToWalletController(dependencies),
    getWalletBalanceController : new GetWalletBalanceController(dependencies),
    getWalletHistoryController: new GetWalletHistoryController(dependencies)
}

paymentRouter.post('/stripe-session',AuthHandler.isUserLogin,async(req,res,next)=>controllers.stripeController.payment(req,res,next))
paymentRouter.post('/wallet',AuthHandler.isUserLogin,async(req,res,next)=>controllers.walletController.walletPayment(req,res,next))
paymentRouter.get('/trip-details/:userId',AuthHandler.isUserLogin,async(req,res,next)=>controllers.getAllTripDetailsController.getTripDetails(req,res,next))
paymentRouter.get('/trip-deatils/:tripId',AuthHandler.isUserLogin,async(req,res,next)=>controllers.getTripDetailByIdController.getTripDetailById(req,res,next))
paymentRouter.post('/wallet/addmoney',AuthHandler.isUserLogin,async(req,res,next)=>controllers.addMoneytoWallet.addMoney(req,res,next))
paymentRouter.get('/user/get-walletbalance/:userId',AuthHandler.isUserLogin,async(req,res,next)=>controllers.getWalletBalanceController.getWalletBalance(req,res,next))
paymentRouter.get('/user/wallethistory/:userId',AuthHandler.isUserLogin,async(req,res,next)=>controllers.getWalletHistoryController.getWalletHistory(req,res,next))




export default paymentRouter