import { notifyDriver } from "../../utils/socket.js";
import { RideRequestQueue } from "../../utils/helpers/rideRequestQueue.js";
import { generateRandomUniqueId } from "../../utils/createUniqueId.js";
export class RideRequestUseCase {
  constructor(dependencies) {
    this.driverRepository = new dependencies.repository.MongoDriverRepository();
    this.tripRepository = new dependencies.repository.MongoTripRepository();
    this.requestQueue = new RideRequestQueue();
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
    // Destructure and validate input data
    const { userId, fare, distance, duration, pickUpCoords, dropCoords, vehicleType,pickupLocation,dropLocation } = data;
    console.log('dropLocation',dropLocation);
    
    if (!userId || !fare || !distance || !duration || !pickUpCoords || !dropCoords) {
      throw new Error('Bad Request: Provide necessary details for the request');
    }

    // Parse coordinates
    const [pickupLongitude, pickupLatitude] = pickUpCoords.map(coord => parseFloat(coord));
    const [dropOffLongitude, dropOffLatitude] = dropCoords.map(coord => parseFloat(coord));

    // Generate a unique ID for the trip
    const tripId = generateRandomUniqueId();

    // Prepare data for insertion
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

    // Create the trip in the repository
    const createTrip = await this.tripRepository.createTrip(dataToInsert);

    // Find nearest drivers based on vehicle type
    const nearestDrivers = await this.driverRepository.rideRequestToSelectedVehicle(
      pickUpCoords, 
      vehicleType
    );

    // Enqueue drivers for request processing
    nearestDrivers.forEach(driver => this.requestQueue.enqueue(driver._id));
    console.log("Queue:", this.requestQueue.print());

    // Function to handle the request queue
    const handleRequest = async () => { 
      if (this.requestQueue.isEmpty()) {
        console.log("Request queue is empty");
        return;
      }

      const driverId = this.requestQueue.dequeue();
      console.log("Notifying driver:", driverId);

      // Notify the driver of the ride request
      notifyDriver("ride-request", createTrip, driverId);

      // Function to handle driver response
      const handleDriverResponse = async () => {
        try {
          const trip = await this.tripRepository.findTrip(createTrip._id);
          const { requestStatus } = trip;

          if (requestStatus === "accepted") {
            return;
          }

          if (["rejected", "pending"].includes(requestStatus)) {
            console.log("Driver rejected or did not respond, retrying...");
            handleRequest(); // Retry mechanism
          }
        } catch (error) {
          console.error("Error handling driver response:", error);
        }
      };

      // Wait for the driver to respond before proceeding
      setTimeout(handleDriverResponse, 15000);
    };

    // Start processing the request queue
    handleRequest();

  } catch (error) {
    console.error("Error executing ride request:", error);
    throw error;
  }

}
}
