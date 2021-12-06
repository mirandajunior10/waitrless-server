import AppError from "../../../shared/errors/AppError";

import ITablesRepository from "../repositories/ITablesRepository";
import IFirestoreTablesRepository from "../repositories/IFirestoreTablesRepository";
import IRestaurantsRepository from "../repositories/IRestaurantsRepository";

import { inject, injectable } from "tsyringe";

interface IRequest {
  number: string;
  restaurant_id: string;
  cpf: string
  name: string
}

@injectable()
export default class OpenTableService {

  constructor(
    @inject('RestaurantsRepository')
    private restaurantsRepository: IRestaurantsRepository,

    @inject('FirestoreTablesRepository')
    private firestoreTablesRepository: IFirestoreTablesRepository,

    @inject('TablesRepository')
    private tablesRepository: ITablesRepository,
  ) { }

  public async execute({ number, restaurant_id, cpf, name }: IRequest): Promise<any> {
    const restaurant = await this.restaurantsRepository.findById(restaurant_id)

    if (!restaurant) {
      throw new AppError("Restaurant does not exist.", 400)
    }

    const table = await this.tablesRepository.findByRestaurantIdAndNumber(restaurant_id, Number(number))

    if (!table) {
      throw new AppError("Table does not exist.", 400)
    }
    const response = await this.firestoreTablesRepository.registerClientOnTable({ cpf, name, restaurant_id, number: Number(number), table_id: table.id })
    return response;

  }
}