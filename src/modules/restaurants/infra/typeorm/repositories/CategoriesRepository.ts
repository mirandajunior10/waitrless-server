import { getRepository, Repository } from "typeorm";
import ICreateCategoryDTO from "../../../dtos/ICreateCategoryDTO";
import ICategoriesRepository from "../../../repositories/ICategoriesRepository";
import Category from "../entities/Category";


export default class CategoriesRepository implements ICategoriesRepository {

  private ormRepository: Repository<Category>;

  constructor() {
    this.ormRepository = getRepository(Category);
  }

  public async findById(id: string): Promise<Category | undefined> {
    const findCategory = await this.ormRepository.findOneOrFail(id);

    return findCategory;
  }

  public async findByRestaurant(restaurant_id: string): Promise<Category[]> {
    const findCategory = await this.ormRepository.find({
      where: { restaurant_id },
    });

    return findCategory;
  }

  public async findByDescription(description: string): Promise<Category[]> {
    const findCategory = await this.ormRepository.find({
      where: { description },
    });

    return findCategory;
  }

  public async create(restaurantData: ICreateCategoryDTO): Promise<Category> {
    const restaurant = this.ormRepository.create(restaurantData);
    await this.ormRepository.save(restaurant);
    return restaurant;
  }

  public async save(restaurant: Category): Promise<Category> {
    return this.ormRepository.save(restaurant);
  }

  public async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id)
  }

}