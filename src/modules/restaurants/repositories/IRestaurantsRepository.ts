import ICreateRestaurantDTO from "../dtos/ICreateRestaurantDTO";
import Restaurant from "../infra/typeorm/entities/Restaurant";

export default interface IRestaurantsRepository {
  findById(id: string): Promise<Restaurant | undefined>;
  findByCNPJ(cnpj: string): Promise<Restaurant | undefined>;
  create(restaurant: ICreateRestaurantDTO): Promise<Restaurant>;
  save(restaurant: Restaurant): Promise<Restaurant>;

}