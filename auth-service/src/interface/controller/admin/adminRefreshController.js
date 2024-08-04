export class AdminRefreshTokenController {
    constructor(dependencies) {
      this.adminRefreshTokenUseCase =
        new dependencies.useCase.AdminRefreshTokenUseCase(dependencies);
    }
    async refreshUserToken(req, res, next) {
      try {
          
        const { adminRefreshToken } = req.cookies;
        if (!adminRefreshToken) {
          const error = new Error();
          error.message = "No Token";
          error.status = 400;
        }
      const newUserAceessToken =  await this.adminRefreshTokenUseCase.execute(adminRefreshToken)
      if(!newUserAceessToken){
          const error = new Error(); 
          error.message = "No Token";
          error.status = 400;
      } 
      
      res.status(200).json(newUserAceessToken)
        
      } catch (error) {
          console.error(error);
          next(error)
      }
    }
  }
  