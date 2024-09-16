import express from 'express'
import {AuthHandler} from '../middleware/authMiddleware.js'
import { PaymentController } from '../controllers/paymentController/paymentController.js'
// import { GetTripDetailsController } from '../controllers/paymentController/getTripDetailsController.js'
import { GetTripDetailByIdController } from '../controllers/paymentController/getTripDetailByIdController.js'
import { WalletController } from '../controllers/paymentController/walletController.js'
import { AddMoneyToWalletController } from '../controllers/paymentController/AddMoneyToWalletController.js'
import { GetWalletBalanceController } from '../controllers/paymentController/getWalletBalanceController.js'
import { GetWalletHistoryController } from '../controllers/paymentController/getWalletHistoryController.js'
import { GetDriverWalletBalanceController } from '../controllers/paymentController/getDriverBalanceController.js'
// import { GetDriverWalletHistoryController } from '../controllers/paymentController/getDriverWalletHistoryController.js'
import { GetDriverWalletDetailsController } from '../controllers/paymentController/getDriverWalletDetailsController.js'
import { GetCompanyWalletBalanceController } from '../controllers/paymentController/companyBalanceController.js'
import { dependencies } from '../../config/dependencies.js'
import { MongoCompanyWalletRepository } from '../repository/index.js'

const paymentRouter = express.Router()

const controllers = {
    // stripeController:new PaymentController(dependencies),
    // getAllTripDetailsController: new GetTripDetailsController(dependencies),
    getTripDetailByIdController: new GetTripDetailByIdController(dependencies),
    walletController: new WalletController(dependencies),
    addMoneytoWallet: new AddMoneyToWalletController(dependencies),
    getWalletBalanceController : new GetWalletBalanceController(dependencies),
    getDriverWalletBalanceController: new GetDriverWalletBalanceController(dependencies),
    getWalletHistoryController: new GetWalletHistoryController(dependencies),
    // getDriverWalletHistory: new GetDriverWalletHistoryController(dependencies),
    getDriverWalletDetailsController: new GetDriverWalletDetailsController(dependencies),
    paymentController:new PaymentController(dependencies),
    companyBalance: new GetCompanyWalletBalanceController(dependencies)


}

// paymentRouter.post('/stripe-session',AuthHandler.isUserLogin,async(req,res,next)=>controllers.stripeController.payment(req,res,next))
paymentRouter.post('/wallet',AuthHandler.isUserLogin,async(req,res,next)=>controllers.walletController.walletPayment(req,res,next))
// paymentRouter.get('/trip-details/:userId',AuthHandler.isUserLogin,async(req,res,next)=>controllers.getAllTripDetailsController.getTripDetails(req,res,next))
paymentRouter.get('/trip-deatils/:tripId',AuthHandler.isUserLogin,async(req,res,next)=>controllers.getTripDetailByIdController.getTripDetailById(req,res,next))
paymentRouter.post('/wallet/addmoney',AuthHandler.isUserLogin,async(req,res,next)=>controllers.addMoneytoWallet.addMoney(req,res,next))
paymentRouter.get('/user/get-walletbalance/:userId',AuthHandler.isUserLogin,async(req,res,next)=>controllers.getWalletBalanceController.getWalletBalance(req,res,next))
paymentRouter.get('/driver/walletbalance/:driverId',AuthHandler.isDriverLogin,async(req,res,next)=>controllers.getDriverWalletBalanceController.getDriverBalance(req,res,next))
// paymentRouter.get('/driver/wallethistory/:driverId',AuthHandler.isDriverLogin,async(req,res,next)=>controllers.getDriverWalletHistory.getDriverWalletHistory(req,res,next))
paymentRouter.get(`/driver/walletdetails/:driverId`,AuthHandler.isDriverLogin,async(req,res,next)=>controllers.getDriverWalletDetailsController.getDriverWalletDetails(req,res,next))


// paymentRouter.get('/user/get-walletbalance/:userId',AuthHandler.isUserLogin,async(req,res,next)=>controllers.getWalletBalanceController.getWalletBalance(req,res,next))
paymentRouter.get('/user/wallethistory/:userId',AuthHandler.isUserLogin,async(req,res,next)=>controllers.getWalletHistoryController.getWalletHistory(req,res,next))
paymentRouter.post('/user/payment',AuthHandler.isUserLogin,async(req,res,next)=>controllers.paymentController.payment(req,res,next))
paymentRouter.get('/admin/balance', async(req,res,next)=>controllers.companyBalance.getComapanyWalletBalance(req,res,next))




export default paymentRouter