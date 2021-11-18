import AppError from "../../../shared/errors/AppError";
import IMenuItemsRepository from "../repositories/IMenuItemsRepository";
import IRestaurantsRepository from "../repositories/IRestaurantsRepository";
import MenuItem from "../infra/typeorm/entities/MenuItem";
import IUsersRepository from "../../users/repositories/IUsersRepository";
import { inject, injectable } from "tsyringe";
import ICategoriesRepository from "../repositories/ICategoriesRepository";


interface IRequest {
  id: string;
  name: string;
  description: string;
  user_id: string;
  category_id: string;
  quantity: number;
  value: number;
  isHighlight: boolean;
}
@injectable()
export default class UpdateRestaurantMenuService {

  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('MenuItemsRepository')
    private menuItemsRepository: IMenuItemsRepository,

    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository,

    @inject('RestaurantsRepository')
    private restaurantsRepository: IRestaurantsRepository,
  ) { }

  public async execute({ id, name, description, user_id, category_id, value, quantity, isHighlight }: IRequest): Promise<MenuItem> {

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

    const category = await this.categoriesRepository.findById(category_id)

    if (category) {
      menuItem.category_id = category.id
    }

    menuItem.name = name;
    menuItem.description = description;
    menuItem.quantity = quantity;
    menuItem.value = value;
    menuItem.isHighlight = isHighlight;

    await this.menuItemsRepository.save(menuItem);

    return menuItem;
  }
}