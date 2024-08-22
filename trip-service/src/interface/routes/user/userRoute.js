import express from 'express'
import {UserCurrentLocationController} from '../../controllers/userController/userCurrentLocationController.js'
import { LocationAutoCompleteController } from '../../controllers/userController/autoCompleteController.js'
import { GetNearByDriversController } from '../../controllers/userController/getNearByDriverController.js'
import { RideRequestController } from '../../controllers/userController/driveRequestController.js'

import { dependencies } from '../../../config/dependencies.js'
import { AuthHandler } from '../../middleware/authMiddleware.js'
const userRouter =  express.Router()


const controllers = {
    getUserCurrentLocationController : new UserCurrentLocationController(dependencies),
    autoCompleteLocationController : new LocationAutoCompleteController(dependencies),
    getNearByDriversController: new GetNearByDriversController(dependencies),
    rideRequestController: new RideRequestController(dependencies),

}
userRouter.post('/location',AuthHandler.isUserLogin,async(req,res,next)=>controllers.getUserCurrentLocationController.getCurrentLocation(req,res,next))
userRouter.get('/pickup-location-autocomplete',AuthHandler.isUserLogin,async(req,res,next)=>{controllers.autoCompleteLocationController.autoComplete(req,res,next)})
userRouter.get('/nearby-drivers',AuthHandler.isUserLogin,async(req,res,next)=>{controllers.getNearByDriversController.getNearByDrivers(req,res,next)})
userRouter.post('/request-ride',AuthHandler.isUserLogin,async(req,res,next)=>{controllers.rideRequestController.requestRide(req,res,next)})

export default userRouter