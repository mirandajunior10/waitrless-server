import { inject, injectable } from "tsyringe";
import AppError from "../../../shared/errors/AppError";
import IUsersRepository from "../../users/repositories/IUsersRepository";
import Table from "../infra/typeorm/schemas/Table";
import IFirestoreTablesRepository from "../repositories/IFirestoreTablesRepository";
import IRestaurantsRepository from "../repositories/IRestaurantsRepository";

@injectable()
export default class FetchOpenTablesService {
  constructor(
    @inject('RestaurantsRepository')
    private restaurantsRepository: IRestaurantsRepository,

    @inject('FirestoreTablesRepository')
    private firestoreTablesRepository: IFirestoreTablesRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

  ) { }

  public async execute(user_id: string): Promise<Table[]> {

    const user = await this.usersRepository.findById(user_id)

    if (!user) {
      throw new AppError('user not found', 401);
    }

    const restaurant = await this.restaurantsRepository.findById(user.restaurant_id);
    if (!restaurant) {
      throw new AppError('Restaurant not found', 401)
    }

    const tables = await this.firestoreTablesRepository.fetchOpenTables(restaurant.id)

    return tables
  }
}