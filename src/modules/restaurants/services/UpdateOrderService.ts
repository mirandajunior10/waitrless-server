import { inject, injectable } from "tsyringe";
import AppError from "../../../shared/errors/AppError";

import IRestaurantsRepository from "../repositories/IRestaurantsRepository";

import IFirestoreOrdersRepository from "../repositories/IFirestoreOrdersRepository";
import IUsersRepository from "../../users/repositories/IUsersRepository";
import { OrderStatusEnum } from "../../../typings";

interface IRequest {
  user_id: string;
  order_id: string;
  status: OrderStatusEnum;
}

@injectable()
export default class UpdateOrderStatusService {

  constructor(
    @inject('RestaurantsRepository')
    private restaurantsRepository: IRestaurantsRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('FirestoreOrdersRepository')
    private firestoreOrdersRepository: IFirestoreOrdersRepository,
  ) { }

  public async execute({ user_id, order_id, status }: IRequest): Promise<any> {
    const user = await this.usersRepository.findById(user_id)

    if (!user) {
      throw new AppError('user not found', 401);
    }

    const restaurant = await this.restaurantsRepository.findById(user.restaurant_id)

    if (!restaurant) {
      throw new AppError('restaurant not found', 401);
    }
    const response = await this.firestoreOrdersRepository.updateOrderStatus({ restaurant_id: user.restaurant_id, order_id, status })

    return response;

  }
}