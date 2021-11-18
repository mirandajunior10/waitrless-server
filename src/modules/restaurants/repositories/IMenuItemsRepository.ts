import ICreateMenuItemDTO from "../dtos/ICreateMenuItemDTO";
import MenuItem from "../infra/typeorm/entities/MenuItem";

export default interface IMenuItemsRepository {
  findById(id: string): Promise<MenuItem | undefined>;
  findByRestaurant(restaurant_id: string): Promise<MenuItem[]>;
  findByName(description: string): Promise<MenuItem[]>;
  findByCategoryId(category_id: string): Promise<MenuItem[]>
  create(menuItem: ICreateMenuItemDTO): Promise<MenuItem>;
  save(menuItem: MenuItem): Promise<MenuItem>;
  delete(id: string): Promise<void>;
}