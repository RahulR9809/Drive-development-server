import axios from 'axios'
export class LocationAutoCompleteUseCase{
   async execute(search){
    try {
        console.log(process.env.MAPBOX_ACCESS_TOKEN);
        
        const response =   await axios.get(`https://api.mapbox.com/search/geocode/v6/forward?q=${encodeURI(search)}.json&access_token=${process.env.MAPBOX_ACCESS_TOKEN}&autocomplete=true&limit=5`)
        const data = response.data
        const searchResults = response.data?.features
        return searchResults
        
    } catch (error) {
        console.error(error);
        
    }

  
   }
}