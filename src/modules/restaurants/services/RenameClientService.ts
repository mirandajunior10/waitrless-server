import { inject, injectable } from "tsyringe";
import AppError from "../../../shared/errors/AppError";
import IFirestoreTablesRepository from "../repositories/IFirestoreTablesRepository";
import IRestaurantsRepository from "../repositories/IRestaurantsRepository";



interface IRequest {
  name: string;
  restaurant_id: string;
  firestore_table_id: string;
  cpf: string
}
@injectable()
export default class RenameClientService {
  constructor(
    @inject('RestaurantsRepository')
    private restaurantsRepository: IRestaurantsRepository,

    @inject('FirestoreTablesRepository')
    private firestoreTablesRepository: IFirestoreTablesRepository,

  ) { }

  public async execute({name, restaurant_id, firestore_table_id, cpf }: IRequest): Promise<any> {

    const restaurant = await this.restaurantsRepository.findById(restaurant_id);
    if (!restaurant) {
      throw new AppError('Restaurant not found', 401)
    }

    const client = await this.firestoreTablesRepository.renameClient({name, restaurant_id, firestore_table_id, cpf })

    return client

  }
}