import express from 'express'
import {AuthHandler} from '../middleware/authMiddleware.js'
import { PaymentController } from '../controllers/paymentController/paymentController.js'
import { GetTripDetailsController } from '../controllers/paymentController/getTripDetailsController.js'
import { GetTripDetailByIdController } from '../controllers/paymentController/getTripDetailByIdController.js'
import { dependencies } from '../../config/dependencies.js'

const paymentRouter = express.Router()

const controllers ={
    stripeController:new PaymentController(dependencies),
    getAllTripDetailsController: new GetTripDetailsController(dependencies),
    getTripDetailByIdController: new GetTripDetailByIdController(dependencies)
}

paymentRouter.post('/stripe-session',AuthHandler.isUserLogin,async(req,res,next)=>controllers.stripeController.payment(req,res,next))
paymentRouter.get('/trip-details/:userId',AuthHandler.isUserLogin,async(req,res,next)=>controllers.getAllTripDetailsController.getTripDetails(req,res,next))
paymentRouter.get('/trip-deatils/:tripId',AuthHandler.isUserLogin,async(req,res,next)=>controllers.getTripDetailByIdController.getTripDetailById(req,res,next))

export default paymentRouter