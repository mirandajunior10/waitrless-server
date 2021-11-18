import AppError from "../../../shared/errors/AppError";
import Restaurant from "../infra/typeorm/entities/Restaurant";
import IRestaurantsRepository from "../repositories/IRestaurantsRepository";
import RestaurantsRepository from "../infra/typeorm/repositories/RestaurantsRepository";
import { inject, injectable } from "tsyringe";


interface IRequest {
  name: string;
  document: string;

}
@injectable()
export default class CreateRestaurantService {

  constructor(
    @inject('RestaurantsRepository')
    private restaurantsRepository: IRestaurantsRepository,
  ) {}

  public async execute({ name, document:cnpj }: IRequest): Promise<Restaurant> {

    const checkRestaurantExists = await this.restaurantsRepository.findByCNPJ(cnpj)
    if (checkRestaurantExists) {
      throw new AppError('Restaurant already exists.', 401)
    }

    const restaurant = await this.restaurantsRepository.create({
      name,
      cnpj
    });

    return restaurant


  }
}