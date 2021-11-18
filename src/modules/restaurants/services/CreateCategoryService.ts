import AppError from "../../../shared/errors/AppError";
import IRestaurantsRepository from "../repositories/IRestaurantsRepository";
import IUsersRepository from "../../users/repositories/IUsersRepository";
import { inject, injectable } from "tsyringe";
import ICategoriesRepository from "../repositories/ICategoriesRepository";
import Category from "../infra/typeorm/entities/Category";

interface IRequest {
  description: string;
  user_id: string;
}

@injectable()
export default class CreateRestaurantMenuService {

  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository,

    @inject('RestaurantsRepository')
    private restaurantsRepository: IRestaurantsRepository,
  ) { }

  public async execute({ description, user_id }: IRequest): Promise<Category> {

    const user = await this.usersRepository.findById(user_id)

    if (!user) {
      throw new AppError('user not found', 401);
    }

    const restaurant = await this.restaurantsRepository.findById(user.restaurant_id)

    if (!restaurant) {
      throw new AppError('restaurant not found', 401);
    }

    const checkCategoryExists = await this.categoriesRepository.findByDescription(description)

    if (checkCategoryExists.length > 0) {
      throw new AppError('Category already exists.', 401)
    }

    const category = await this.categoriesRepository.create({
      description,
      restaurant_id: restaurant.id,
    });

    return category;
  }
}