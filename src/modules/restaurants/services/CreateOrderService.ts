import { inject, injectable } from "tsyringe";
import AppError from "../../../shared/errors/AppError";

import ITablesRepository from "../repositories/ITablesRepository";
import IRestaurantsRepository from "../repositories/IRestaurantsRepository";

import IFirestoreOrdersRepository from "../repositories/IFirestoreOrdersRepository";

interface IRequest {
  number: string;
  restaurant_id: string;
  document_orderer: string;
  table_id: string;
  name?: string;
  observations: string;
  quantity: number;
  itemId: string;

}

@injectable()
export default class CreateOrderService {

  constructor(
    @inject('RestaurantsRepository')
    private restaurantsRepository: IRestaurantsRepository,

    @inject('FirestoreOrdersRepository')
    private firestoreOrdersRepository: IFirestoreOrdersRepository,

    @inject('TablesRepository')
    private tablesRepository: ITablesRepository,
  ) { }

  public async execute({ itemId, number, restaurant_id, document_orderer, table_id, name, observations, quantity }: IRequest): Promise<any> {
    const restaurant = await this.restaurantsRepository.findById(restaurant_id)

    if (!restaurant) {
      throw new AppError("Restaurant does not exist.", 400)
    }

    const table = await this.tablesRepository.findByRestaurantIdAndNumber(restaurant_id, Number(number))

    if (!table) {
      throw new AppError("Table does not exist.", 400)
    }
    if(!name){
      name = document_orderer
    }
    const response = await this.firestoreOrdersRepository.createOrder({ observations, quantity, itemId, restaurant_id, document_orderer, name, table_id })

    return response;

  }
}