import AppError from "../../../shared/errors/AppError";
import Table from "../infra/typeorm/entities/Table";
import ITablesRepository from "../repositories/ITablesRepository";
import IRestaurantsRepository from "../repositories/IRestaurantsRepository";
import IUsersRepository from "../../users/repositories/IUsersRepository";
import { inject, injectable } from "tsyringe";


interface IRequest {
  number: number;
  user_id: string;
}
@injectable()
export default class CreateTableService {

  constructor(
    @inject('RestaurantsRepository')
    private restaurantsRepository: IRestaurantsRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('TablesRepository')
    private tablesRepository: ITablesRepository,
  ) {}

  public async execute({ number, user_id }: IRequest): Promise<Table> {

    const user = await this.usersRepository.findById(user_id)

    if (!user) {
      throw new AppError('user not found', 401);
    }

    const restaurant = await this.restaurantsRepository.findById(user.restaurant_id)


    if (!restaurant) {
      throw new AppError('restaurant not found', 401);
    }

    const checkTableExists = await this.tablesRepository.findByRestaurantIdAndNumber(restaurant.id, number)

    if (checkTableExists) {
      throw new AppError('table already exists.', 401)
    }

    const table = await this.tablesRepository.create({
      number,
      restaurant_id: restaurant.id,
    });

    return table;
  }
}