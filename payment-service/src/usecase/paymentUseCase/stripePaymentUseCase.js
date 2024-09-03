import Stripe from 'stripe'
export class StripePaymentUseCase{
    constructor(dependencies){
        this.paymentRepository = new dependencies.repository.MongoPaymentRepository()
        this.userRepository = new dependencies.repository.MongoUserRepository()
        this.tripRepository = new dependencies.repository.MongoTripRepository()
        this.driverRepository =  new dependencies.repository.MongoDriverRepository()
        this.walletRepository = new dependencies.repository.MongoWalletRepository()
        this.comapnyWalletRepository =  new dependencies.repository.MongoCompanyWalletRepository()
    }
    async execute(data){
        try {
            const {userId,tripId,paymentMethod,fare,driverId} = data

            const userDetails = await this.userRepository.findUserById(userId)

            const tripDetails = await this.tripRepository.findTrip(tripId)

       const  stripe =   new Stripe(process.env.STRIPE_SECRET_KEY)
       const createStripeSession = await stripe.checkout.sessions.create({
        payment_method_types:['card'],
        mode:'payment',
        success_url:"http://localhost:3000/payment-success",
        cancel_url:"http://localhost:3000/payment-failure",
        customer_email:userDetails?.email,
        client_reference_id:tripId,
        line_items:[{
            price_data:{
                currency:'inr',
            product_data:{
                name:`Cab Booked from ${tripDetails?.pickUpLocation} to ${tripDetails?.dropOffLocation}`
            },
            unit_amount:tripDetails?.fare * 100
            },
            quantity:1
        }],
       })
       const driversCommision = parseFloat(fare) * 80/100
       const companyCommision = parseFloat(fare) * 20/100
       console.log("commisiosssssssss",driversCommision,companyCommision);
       
       const driverWalletHistory = await this.walletRepository.createWallet({
        driverId:driverId,
        tripId:tripId,
        amount:driversCommision,
        description:"Money recieveed from trip",
        type:"credit"
       })

       console.log("driverWalletHistory",driverWalletHistory);
       
       const addDriversBalance = await this.driverRepository.updateWalletBalance(driverId,{walletBalance:driversCommision})
       console.log("addDriversBalance",addDriversBalance);
       
       const companyWalletHistory = await this.comapnyWalletRepository.findCompanyWalletUpdate({balance:companyCommision},{
        transactions:{
            tripId:tripId,
            transactionType:'credit',
            description:"money added to wallet"
        }})
       console.log("companyWalletHistory",companyWalletHistory);
       const payment = await this.paymentRepository.findPaymentByTrip_Update(tripId,{
        fare,
        paymentStatus:'paid'
       })
       console.log("payment",payment);
       
       return {
        createStripeSession,
        payment
       }
        } catch (error) {
           console.error(error);
            
        }
    }
}