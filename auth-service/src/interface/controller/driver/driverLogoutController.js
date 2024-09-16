export class DriverLogoutController{
    constructor(dependencies){
    }

    async logout(req,res,next){
try {
    console.log('user');
    console.log(req.cookies);
    
    res.clearCookie('driverRefreshToken')
    res.status(200).json({success:true});
} catch (error) {
    console.error(error);
}
    }
}