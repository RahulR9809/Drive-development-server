export class CashOnDeliveryUseCase{
    constructor(dependencies){
this.paymentRepository = new dependencies.repository.MongoPaymentRepository()
    }
    async execute(data){
        try {
         const createCOD =    await this.paymentRepository.createPayment(data)
         return createCOD
        } catch (error) {
            console.error(error);
            
        }
    }
}