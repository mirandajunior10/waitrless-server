import AppError from "../../../shared/errors/AppError";
import IRestaurantsRepository from "../repositories/IRestaurantsRepository";
import IUsersRepository from "../../users/repositories/IUsersRepository";
import { inject, injectable } from "tsyringe";
import ICategoriesRepository from "../repositories/ICategoriesRepository";
import Category from "../infra/typeorm/entities/Category";
import IMenuItemsRepository from "../repositories/IMenuItemsRepository";

interface IRequest {
  id: string;
  user_id: string;
}

@injectable()
export default class DeleteCategoryService {

  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository,

    @inject('RestaurantsRepository')
    private restaurantsRepository: IRestaurantsRepository,

    @inject('MenuItemsRepository')
    private menuItemsRepository: IMenuItemsRepository,
  ) { }

  public async execute({ id, user_id }: IRequest): Promise<Category> {

    const user = await this.usersRepository.findById(user_id)

    if (!user) {
      throw new AppError('user not found', 401);
    }

    const restaurant = await this.restaurantsRepository.findById(user.restaurant_id)

    if (!restaurant) {
      throw new AppError('restaurant not found', 401);
    }

    const category = await this.categoriesRepository.findById(id)

    if (!category) {
      throw new AppError('Category does not exist.', 401)
    }

    const relatedMenuItems = await this.menuItemsRepository.findByCategoryId(category.id)

    if (relatedMenuItems.length > 0) {
      throw new AppError('Category has related menu items.', 401)
    }

    await this.categoriesRepository.delete(
      id
    );

    return category;
  }
}