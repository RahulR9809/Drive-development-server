import express from 'express'
import { GetDriverOnlineController } from '../../controllers/driverController/getOnlineController.js'
import { AcceptRideController } from '../../controllers/driverController/acceptRideController.js'
import { RejectRideController } from '../../controllers/driverController/rejectRideController.js'
import { StartRideController } from '../../controllers/driverController/startRideController.js'
import { RideCompleteController } from '../../controllers/driverController/rideCompleteController.js'
import { GetDriverOfflineController } from '../../controllers/driverController/getOfflineController.js'
import { TripCountController } from '../../controllers/driverController/tripCountController.js'
import { dependencies } from '../../../config/dependencies.js'
import { AuthHandler } from '../../middleware/authMiddleware.js'

const driverRouter =  express.Router()


const controllers = {
   getOnlineController: new GetDriverOnlineController(dependencies),
   getOfflineController: new GetDriverOfflineController(dependencies),
   rideAcceptController: new AcceptRideController(dependencies),
   rideRejectController: new RejectRideController(dependencies),
   startRideController:new StartRideController(dependencies),
   rideCompleteController : new RideCompleteController(dependencies),
   tripCountController : new TripCountController(dependencies),
   
}

driverRouter.put('/online',AuthHandler.isDriverLogin,async(req,res,next)=>{controllers.getOnlineController.getOnline(req,res,next)})
driverRouter.put('/offline',AuthHandler.isDriverLogin,async(req,res,next)=>{controllers.getOfflineController.getOffline(req,res,next)})
driverRouter.post('/accept-ride',AuthHandler.isDriverLogin,async(req,res,next)=>{controllers.rideAcceptController.acceptRide(req,res,next)})
driverRouter.post('/reject-ride',AuthHandler.isDriverLogin,async(req,res,next)=>{controllers.rideRejectController.rejectRide(req,res,next)})
driverRouter.post('/start-ride',AuthHandler.isDriverLogin,async(req,res,next)=>{controllers.startRideController.startRide(req,res,next)})
driverRouter.post('/complete-ride',AuthHandler.isDriverLogin,async(req,res,next)=>{controllers.rideCompleteController.completeRide(req,res,next)})
driverRouter.get('/tripcount',AuthHandler.isDriverLogin,async(req,res,next)=>controllers.tripCountController.tripCount(req,res,next))
export default driverRouter