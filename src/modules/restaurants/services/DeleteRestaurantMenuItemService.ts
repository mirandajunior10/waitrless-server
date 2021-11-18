import AppError from "../../../shared/errors/AppError";
import IMenuItemsRepository from "../repositories/IMenuItemsRepository";
import IRestaurantsRepository from "../repositories/IRestaurantsRepository";
import MenuItem from "../infra/typeorm/entities/MenuItem";
import IUsersRepository from "../../users/repositories/IUsersRepository";
import { inject, injectable } from "tsyringe";


interface IRequest {
  id: string;
  user_id: string;
}
@injectable()
export default class DeleteRestaurantMenuService {

  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('MenuItemsRepository')
    private menuItemsRepository: IMenuItemsRepository,

    @inject('RestaurantsRepository')
    private restaurantsRepository: IRestaurantsRepository,
  ) { }

  public async execute({ id, user_id }: IRequest): Promise<MenuItem> {

    const user = await this.usersRepository.findById(user_id)

    if (!user) {
      throw new AppError('user not found', 401);
    }

    const restaurant = await this.restaurantsRepository.findById(user.restaurant_id)

    if (!restaurant) {
      throw new AppError('restaurant not found', 401);
    }

    const menuItem = await this.menuItemsRepository.findById(id)

    if (!menuItem) {
      throw new AppError('Menu Item does not exist.', 404)
    }
    await this.menuItemsRepository.delete(id)

    return menuItem;
  }
}