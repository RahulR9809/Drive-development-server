export class GetAllUserUseCase {
  constructor(dependencies) {
    this.userRepository = new dependencies.repository.MongoUserRepository();
  }
  async execute(search, page) {
    try {
      console.log("njn evide");
      const query = {};
      console.log(query);
      const searchResult =
        search != undefined ? new RegExp(search, "i") : new RegExp(".*", "i");
      console.log("search", searchResult);
      const currentPage = page != undefined ? page : 1;
      query.name = searchResult;
      console.log(query);
      const limit = 10;
      const allUsers = await this.userRepository.getAllUsers(
        query,
        currentPage,
        limit
      );
      const totalPages = search
        ? this.userRepository.getTotalDocs()
        : allUsers.length;
        console.log(allUsers);
      return { allUsers, totalPages };
    } catch (error) {
        console.log(error);
        throw error
        
    }

  }
}
