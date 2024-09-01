import axios from "axios";

export class ReverseGeoCodeUseCase{
    constructor(dependencies){
    }
    async execute(coords){
        try {
         const response =   await axios.get(`https://api.mapbox.com/search/geocode/v6/reverse?longitude=${coords[0]}&latitude=${coords[1]}&access_token=${process.env.MAPBOX_ACCESS_TOKEN}`)
         console.log(response.data);
         return response.data.features[0]
        } catch (error) {
            
        }
    }
}