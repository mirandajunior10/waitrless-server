import AppError from "../../../shared/errors/AppError";
import IMenuItemsRepository from "../repositories/IMenuItemsRepository";
import IRestaurantsRepository from "../repositories/IRestaurantsRepository";
import MenuItem from "../infra/typeorm/entities/MenuItem";
import IUsersRepository from "../../users/repositories/IUsersRepository";
import { inject, injectable } from "tsyringe";
import IStorageProvider from "../../../shared/container/providers/StorageProvider/models/IStorageProvider";


interface IRequest {
  name: string;
  description: string;
  user_id: string;
  category_id: string;
  quantity: number;
  value: number;
  pictureFilename: string | undefined;
}
@injectable()
export default class CreateRestaurantMenuService {

  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('MenuItemsRepository')
    private menuItemsRepository: IMenuItemsRepository,

    @inject('RestaurantsRepository')
    private restaurantsRepository: IRestaurantsRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({ name, description, user_id, category_id, value, quantity, pictureFilename = undefined }: IRequest): Promise<MenuItem> {

    const user = await this.usersRepository.findById(user_id)

    if (!user) {
      throw new AppError('user not found', 401);
    }

    const restaurant = await this.restaurantsRepository.findById(user.restaurant_id)

    if (!restaurant) {
      throw new AppError('restaurant not found', 401);
    }

    const checkMenuItemExists = await this.menuItemsRepository.findByName(name)

    if (checkMenuItemExists.length > 0) {
      throw new AppError('Menu Item already exists.', 401)
    }
    let picture = undefined;
    if (pictureFilename) {
      picture = await this.storageProvider.saveFile(pictureFilename)
    }
    const menuItem = await this.menuItemsRepository.create({
      name,
      category_id,
      description,
      restaurant_id: restaurant.id,
      quantity,
      value,
      picture
    });

    return menuItem;
  }
}