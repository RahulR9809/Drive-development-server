export class UserBlockUnblockUseCase {
    constructor(dependencies) {
      this.userRepository = new dependencies.repository.MongoUserRepository();
    }
    async execute(userId) {
      console.log('njn evidem ethi');
      const getuser = await this.userRepository.findUserById(userId);
      console.log(getuser);
      if (getuser) {
        const updateUser = await this.userRepository.findByIdUpdate(
            userId,
          { isBlocked: !getuser.isBlocked }
        );
        console.log('updateUser',updateUser);
        return updateUser ;
      } else {
      }
    }
  }
  