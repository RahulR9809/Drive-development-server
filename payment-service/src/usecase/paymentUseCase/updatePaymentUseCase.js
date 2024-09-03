export class UpdatePaymentUseCase{
    constructor(dependencies){
        this.paymentRepository = new dependencies.repository.MongoPaymentRepository()
    }
    async execute(id,data){
        try {
            await this.paymentRepository.findPaymentByTrip_Update(id,data)
        } catch (error) {
            console.error(error)
        }
    }
}