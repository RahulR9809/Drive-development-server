export class UpdatePaymentModecontroller{
    constructor(dependencies){
        this.updatePaymentUseCase = new dependencies.useCase.UpdatePaymentUseCase(dependencies)
    }
    async updatePayment(data){
        try {
            const {_id,...rest} = data
            await this.updatePaymentUseCase.execute(_id,rest)
        } catch (error) {
            console.error(error);
            
        }
    }
}