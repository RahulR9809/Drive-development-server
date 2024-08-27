import express from 'express'
import {AuthHandler} from '../middleware/authMiddleware.js'
import { PaymentController } from '../controllers/paymentController/paymentController.js'
import { dependencies } from '../../config/dependencies.js'

const paymentRouter = express.Router()

const controllers ={
    stripeController:new PaymentController(dependencies)
}

paymentRouter.post('/stripe-session',AuthHandler.isUserLogin,async(req,res,next)=>controllers.stripeController.payment(req,res,next))

export default paymentRouter