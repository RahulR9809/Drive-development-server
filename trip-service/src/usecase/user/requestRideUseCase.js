import { notifyDriver } from "../../utils/socket.js";
import { RideRequestQueue } from "../../utils/helpers/rideRequestQueue.js";
import { generateRandomUniqueId } from "../../utils/createUniqueId.js";
import { KafkaClient } from "../../events/KafkaClient.js";
import { TRIP_TOPIC,TRIP_CREATED } from "../../events/config.js";
export class RideRequestUseCase {
  constructor(dependencies) {
    this.driverRepository = new dependencies.repository.MongoDriverRepository();
    this.tripRepository = new dependencies.repository.MongoTripRepository();
    this.requestQueue = new RideRequestQueue();
    this.kafka = new KafkaClient()
  }
  async execute(data) {
  //   try {
  //     //   console.log(data);
  //     const {userId,fare,distance,duration,pickUpCoords,dropCoords} = data
  //     if(!userId||!fare||!distance||!duration||!pickUpCoords||!dropCoords){
  //       const error = new Error('Bad Request Provide necessary Details for Request')
  //       error.status = 400
  //       throw error
  //     }
  //     const pickupLongituide = parseFloat(data?.pickUpCoords[0]);
  //     const pickupLatitude = parseFloat(data?.pickUpCoords[1]);
  //     const dropOffLongitude = parseFloat(data?.dropCoords[0]);
  //     const dropOffLatitude = parseFloat(data?.dropCoords[1]);

  //     generateRandomUniqueId()
  //     const dataToInsert = {
  //       userId: data?.userId,
  //       fare: data?.fare,
  //       distance: parseInt(data?.distance),
  //       duration: parseInt(data?.duration),
  //       startLocation: {
  //         type: "Point",
  //         coordinates: [pickupLongituide, pickupLatitude],
  //       },
  //       endLocation: {
  //         type: "Point",
  //         coordinates: [dropOffLongitude, dropOffLatitude],
  //       },
  //     };
  //     const createTrip = await this.tripRepository.createTrip(dataToInsert);
  //     const nearestDrivers =
  //       await this.driverRepository.rideRequestToSelectedVehicle(
  //         data?.pickUpCoords,
  //         data.vehicleType
  //       );
  //     for (const nearByDriver of nearestDrivers) {
  //       this.requestQueue.enqueue(nearByDriver._id);
  //     }

  //     console.log("queue", this.requestQueue.print());

  //     // let driverFound = false

  //     const handlereqest = () => {
  //       if (this.requestQueue.isEmpty()) {
  //         console.log("isEmpty");

  //         return;
  //       }

  //       // Notifiacation To the Driver In the Request Queue
  //       let driverDataToString = this.requestQueue.dequeue();
  //       console.log(driverDataToString);

  //       notifyDriver("ride-request", createTrip, driverDataToString);
  //       console.log("comeback");

  //       const handleDriverResponse = async () => {
  //         try {
  //           console.log("entry");
  //           // handle Driver Accept Request

  //           const getTripById = await this.tripRepository.findTrip(
  //             createTrip._id
  //           );
  //           const tripStatus = getTripById.tripStatus;

  //           //handle the rerquest if handled properly

  //           if (tripStatus == "accepted") {
  //             return;
  //           } else if (tripStatus == "rejected" || tripStatus == "requested") {
  //             console.log("inside Reject");

  //             //implement retry mechanism
  //             handlereqest();
  //           }
  //         } catch (error) {
  //           console.error(error);
  //         }
  //       };
  //       console.log("before set");

  //       setTimeout(() => {
  //         console.log("inside the timeout");
  //         handleDriverResponse();
  //       }, 15000);
  //     };
  //     handlereqest();
  //   } catch (error) {
  //     console.error(error);
  //     throw error
  //   }
  // }
  try {
   
    const { userId, fare, distance, duration, pickUpCoords, dropCoords, vehicleType,pickupLocation,dropLocation } = data;
    console.log('dropLocation',dropLocation);
    
    if (!userId || !fare || !distance || !duration || !pickUpCoords || !dropCoords) {
      throw new Error('Bad Request: Provide necessary details for the request');
    }

    
    const [pickupLongitude, pickupLatitude] = pickUpCoords.map(coord => parseFloat(coord));
    const [dropOffLongitude, dropOffLatitude] = dropCoords.map(coord => parseFloat(coord));

    
    const tripId = generateRandomUniqueId();

    
    const dataToInsert = {
      tripId,
      userId,
      fare,
      distance: parseInt(distance),
      duration: parseInt(duration),
      startLocation: {
        type: "Point",
        coordinates: [pickupLongitude, pickupLatitude],
      },
      endLocation: {
        type: "Point",
        coordinates: [dropOffLongitude, dropOffLatitude],
      },
      pickUpLocation:pickupLocation,
      dropOffLocation:dropLocation,
    };

  
    const createTrip = await this.tripRepository.createTrip(dataToInsert);
    console.log("createtrips",createTrip);
    

    const dataToPublish ={
      _id:createTrip?._id,
      userId:createTrip?.userId,
      driverId:createTrip?.driverId,
      tripStatus:createTrip?.tripStatus,
      requestStatus:createTrip?.requestStatus,
      rejectedDrivers:createTrip?.rejectedDrivers,
      fare:createTrip?.fare,
      startLocation:createTrip?.startLocation,
      endLocation:createTrip?.endLocation,
      startTime:createTrip?.startTime,
      endTime:createTrip?.endTime,
      distance:createTrip?.distance,
      duration:createTrip?.duration,
      pickUpLocation:createTrip?.pickUpLocation,
      dropOffLocation:createTrip?.dropOffLocation,
      createdAt:createTrip?.createdAt
    }

    this.kafka.produceMessage(TRIP_TOPIC,{
      type:TRIP_CREATED,
      value:JSON.stringify(dataToPublish)
    })

   
    const nearestDrivers = await this.driverRepository.rideRequestToSelectedVehicle(
      pickUpCoords, 
      vehicleType
    );

    
    nearestDrivers.forEach(driver => this.requestQueue.enqueue(driver._id));
    console.log("Queue:", this.requestQueue.print());

   
    const handleRequest = async () => { 
      if (this.requestQueue.isEmpty()) {
        console.log("Request queue is empty");
        return;
      }

      const driverId = this.requestQueue.dequeue();
      console.log("Notifying driver:", driverId);

     
      notifyDriver("ride-request", createTrip, driverId);

     
      const handleDriverResponse = async () => {
        try {
          const trip = await this.tripRepository.findTrip(createTrip._id);
          const { requestStatus } = trip;

          if (requestStatus === "accepted") {
            return;
          }

          if (["rejected", "pending"].includes(requestStatus)) {
            console.log("Driver rejected or did not respond, retrying...");
            handleRequest(); 
          }
        } catch (error) {
          console.error("Error handling driver response:", error);
        }
      };

    
      setTimeout(handleDriverResponse, 15000);
    };

    
    handleRequest();

  } catch (error) {
    console.error("Error executing ride request:", error);
    throw error;
  }

}
}
