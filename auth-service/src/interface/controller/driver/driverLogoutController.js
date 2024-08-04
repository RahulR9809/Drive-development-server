export class DriverLogoutController{
    constructor(dependencies){
    }

    async logout(req,res,next){
try {
    console.log('user');
    res.clearCookie('driverRefreshToken')
    res.status(201).json({success:true});
} catch (error) {
    console.error(error);
}
    }
}