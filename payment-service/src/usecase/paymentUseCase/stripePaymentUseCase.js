import Stripe from 'stripe'
export class StripePaymentUseCase{
    constructor(dependencies){
        this.paymentRepository = new dependencies.repository.MongoPaymentRepository()
        this.userRepository = new dependencies.repository.MongoUserRepository()
        this.tripRepository = new dependencies.repository.MongoTripRepository()
    }
    async execute(data){
        try {
            const {userId,tripId,paymentMethod,fare} = data

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
        // metadata: {
        //     trip_id: tripId,
        //     user_id: userDetails?._id,
        //     pickup_location: tripDetails?.pickUpLocation,
        //     dropoff_location: tripDetails?.dropOffLocation,
        //     // distance: tripDetails?.distance,
        //     // date: tripDetails?.date,
        // }
       })

       const payment = await this.paymentRepository.createPayment(data)
       return {
        createStripeSession,
        payment
       }
        } catch (error) {
           console.error(error);
            
        }
    }
}