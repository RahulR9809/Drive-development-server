

export class UserRefreshTokenController {
  constructor(dependencies) {
    this.userRefreshTokenUseCase =
      new dependencies.useCase.userRefreshTokenUseCase(dependencies);
  }
  async refreshUserToken(req, res, next) {
    try {
        
      const { userRefreshToken } = req.cookies;
    //   console.log('entry',userRefreshToken);

      if (!userRefreshToken) {
        const error = new Error();
        error.message = "No Token";
        error.status = 400;
      }
    const newUserAceessToken =  await this.userRefreshTokenUseCase.execute(userRefreshToken)
    if(!newUserAceessToken){
        const error = new Error(); 
        error.message = "No Token";
        error.status = 400;
    } 
    console.log('newwwwwww',newUserAceessToken);
    
    res.status(200).json(newUserAceessToken)
      
    } catch (error) {
        console.error(error);
        next(error)
    }
  }
}
