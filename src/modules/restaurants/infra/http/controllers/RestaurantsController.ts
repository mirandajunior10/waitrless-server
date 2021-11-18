import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { getRepository } from 'typeorm';
import CreateUserService from '../../../../users/services/CreateUserService';
import CreateRestaurantService from '../../../services/CreateRestaurantService';
import Restaurant from '../../typeorm/entities/Restaurant';
import RestaurantsRepository from '../../typeorm/repositories/RestaurantsRepository'

export default class RestaurantsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { name, document, password, email } = req.body;

    const createRestaurant = container.resolve(CreateRestaurantService)

    const restaurant = await createRestaurant.execute({ name, document })

    const createUser = container.resolve(CreateUserService);

    const user = await createUser.execute({ email, password, restaurant_id: restaurant.id });

    return res.json({ restaurant, user });
  }

  public async show(_req: Request, res: Response): Promise<Response> {

    const restaurantsRepository = getRepository(Restaurant);

    const restaurants = await restaurantsRepository.find()

    return res.json(restaurants)
  }

  public async index(req: Request, res: Response): Promise<Response> {

    const { id } = req.params

    const restaurantsRepository = new RestaurantsRepository();

    const restaurant = await restaurantsRepository.findById(id)

    return res.json(restaurant)
  }

}