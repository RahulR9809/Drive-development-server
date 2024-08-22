import axios from "axios";
export class GetAdditionalTripDataUseCase {
  constructor(dependencies) {}
  async execute(pickupLat, pickupLong, dropLat, dropLong) {
    try {
      console.log("pickup", pickupLat, pickupLong, dropLat, dropLong);


      const response =   await axios.get(
          `https://api.mapbox.com/directions/v5/mapbox/driving/${pickupLong},${pickupLat};${dropLong},${dropLat}?alternatives=false&annotations=distance,duration&geometries=polyline&overview=full&steps=false&access_token=${process.env.MAPBOX_ACCESS_TOKEN}`
        );
        const data = response.data?.routes[0]
        const journeyDetails = {
          duration:data?.duration,
          distance:data?.distance
        }
        console.log('journeyDetails',journeyDetails);
        return journeyDetails
    } catch (error) {
      console.error(error);
    }
  }
}
