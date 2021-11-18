import { getRepository, Repository } from "typeorm";
import { firestore } from 'firebase-admin';


import ICreateRestaurantDTO from "../../../dtos/ICreateRestaurantDTO";
import IRestaurantsRepository from "../../../repositories/IRestaurantsRepository";
import Restaurant from "../entities/Restaurant";


class RestaurantsRepository implements IRestaurantsRepository {
  private ormRepository: Repository<Restaurant>;

  constructor() {
    this.ormRepository = getRepository(Restaurant);
  }

  public async findById(id: string): Promise<Restaurant | undefined> {
    const findRestaurant = await this.ormRepository.findOneOrFail(id);

    return findRestaurant;
  }

  public async findByCNPJ(cnpj: string): Promise<Restaurant | undefined> {
    const findRestaurant = await this.ormRepository.findOne({
      where: { cnpj },
    });

    return findRestaurant;
  }
  public async create(restaurantData: ICreateRestaurantDTO): Promise<Restaurant> {
    const restaurant = this.ormRepository.create(restaurantData);
    await this.ormRepository.save(restaurant);

    const firestoreRestaurant = {
      name: restaurant.name,
      cnpj: restaurant.cnpj,
      created_at: restaurant.created_at,
      updated_at: restaurant.updated_at,
      daysOpened: []
    }
    const firestoreDB = firestore()
    await firestoreDB.collection('restaurants').doc(restaurant.id).create(firestoreRestaurant)

    return restaurant;
  }

  public async save(restaurant: Restaurant): Promise<Restaurant> {
    return this.ormRepository.save(restaurant);
  }
}

export default RestaurantsRepository;
