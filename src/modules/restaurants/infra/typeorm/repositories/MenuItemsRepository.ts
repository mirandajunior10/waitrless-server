import { getRepository, Repository } from "typeorm";


import ICreateMenuItemDTO from "../../../dtos/ICreateMenuItemDTO";
import IMenuItemsRepository from "../../../repositories/IMenuItemsRepository";
import MenuItem from "../entities/MenuItem";


class MenuItemsRepository implements IMenuItemsRepository {
  private ormRepository: Repository<MenuItem>;

  constructor() {
    this.ormRepository = getRepository(MenuItem);
  }



  public async findById(id: string): Promise<MenuItem | undefined> {
    const findMenuItem = await this.ormRepository.findOneOrFail(id);

    return findMenuItem;
  }

  public async findByRestaurant(restaurant_id: string): Promise<MenuItem[]> {
    const findMenuItem = await this.ormRepository.find({
      where: { restaurant_id },
    });

    return findMenuItem;
  }

  public async findByName(name: string): Promise<MenuItem[]> {
    const findMenuItem = await this.ormRepository.find({
      where: { name },
    });

    return findMenuItem;
  }

  public async findByCategoryId(category_id: string): Promise<MenuItem[]> {
    const findMenuItem = await this.ormRepository.find({
      where: { category_id },
    });

    return findMenuItem;
  }

  public async create(restaurantData: ICreateMenuItemDTO): Promise<MenuItem> {
    const restaurant = this.ormRepository.create(restaurantData);
    await this.ormRepository.save(restaurant);
    return restaurant;
  }

  public async save(restaurant: MenuItem): Promise<MenuItem> {
    return this.ormRepository.save(restaurant);
  }

  public async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id)
  }
}

export default MenuItemsRepository;
