import AppError from "../../../shared/errors/AppError";
import IRestaurantsRepository from "../repositories/IRestaurantsRepository";
import IUsersRepository from "../../users/repositories/IUsersRepository";
import { inject, injectable } from "tsyringe";
import ITablesRepository from "../repositories/ITablesRepository";
import Table from "../infra/typeorm/entities/Table";

interface IRequest {
  number: number;
  user_id: string;
}

@injectable()
export default class DeleteTableService {

  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('TablesRepository')
    private tablesRepository: ITablesRepository,

    @inject('RestaurantsRepository')
    private restaurantsRepository: IRestaurantsRepository,
  ) { }

  public async execute({ number, user_id }: IRequest): Promise<Table> {

    const user = await this.usersRepository.findById(user_id)

    if (!user) {
      throw new AppError('user not found', 401);
    }

    const restaurant = await this.restaurantsRepository.findById(user.restaurant_id)

    if (!restaurant) {
      throw new AppError('restaurant not found', 401);
    }

    const table = await this.tablesRepository.findByRestaurantIdAndNumber(restaurant.id, number)

    if (!table) {
      throw new AppError('Category does not exist.', 401)
    }

    await this.tablesRepository.delete(
      table.id
    );

    return table;
  }
}