import { paymentModel } from "../../database/schema/paymentSchema/paymentSchema.js";
export class PaymentRepository {
  constructor() {}
  async createPayment(data) {
    try {
      const payment = await paymentModel.create({
        tripId: data?.tripId,
        userId: data?.userId,
        fare: data?.fare,
        paymentMethod: data?.paymentMethod,
        paymentStatus: "paid",
      });
    } catch (error) {
      console.error(error);
    }
  }
  async findPaymentByTrip_Update(id, data) {
    return await paymentModel.findOneAndUpdate({ tripId: id }, { $set: data },{new:true})
  }
}
