export class ApproveProfileUpdateUseCase{
    constructor(dependencies){
        this.adminRepository = new dependencies.repository.MongoAdminRepository()
    }
    async execute(driverId){
        try {
            return await this.adminRepository.approveProfileUpdateRequest(driverId)
        } catch (error) {
            console.error(error)
        }
    }
}