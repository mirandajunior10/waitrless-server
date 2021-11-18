import { inject, injectable } from "tsyringe";
import AppError from "../../../shared/errors/AppError";

import IRestaurantsRepository from "../repositories/IRestaurantsRepository";

import IFirestoreOrdersRepository from "../repositories/IFirestoreOrdersRepository";
import IUsersRepository from "../../users/repositories/IUsersRepository";

interface IRequest {
  user_id: string;
}

@injectable()
export default class RetrieveOrdersService {

  constructor(
    @inject('RestaurantsRepository')
    private restaurantsRepository: IRestaurantsRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('FirestoreOrdersRepository')
    private firestoreOrdersRepository: IFirestoreOrdersRepository,
  ) { }

  public async execute({ user_id }: IRequest): Promise<any> {
    const user = await this.usersRepository.findById(user_id)

    if (!user) {
      throw new AppError('user not found', 401);
    }

    const restaurant = await this.restaurantsRepository.findById(user.restaurant_id)

    if (!restaurant) {
      throw new AppError('restaurant not found', 401);
    }
    const response = await this.firestoreOrdersRepository.retrieveOrders(user.restaurant_id)

    return response;

  }
}