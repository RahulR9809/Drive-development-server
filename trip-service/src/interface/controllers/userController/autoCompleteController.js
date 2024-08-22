export class LocationAutoCompleteController{
constructor(dependencies){
this.autoCompleteUseCase = new dependencies.useCase.LocationAutoCompleteUseCase(dependencies)
}
async autoComplete(req,res,next){
    try {
        const {search} = req.query
      const searchResults =   await this.autoCompleteUseCase.execute(search)
        res.status(201).json({searchResults})
    } catch (error) {
        console.error(error);  
    }
}
}