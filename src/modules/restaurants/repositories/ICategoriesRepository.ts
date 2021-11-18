import ICreateCategoryDTO from "../dtos/ICreateCategoryDTO";
import Category from "../infra/typeorm/entities/Category";

export default interface ICategoriesRepository {
  findById(id: string): Promise<Category | undefined>;
  findByRestaurant(restaurant_id: string): Promise<Category[]>;
  findByDescription(description: string): Promise<Category[]>;
  create(category: ICreateCategoryDTO): Promise<Category>;
  save(category: Category): Promise<Category>;
  delete(id: string): Promise<void>
}