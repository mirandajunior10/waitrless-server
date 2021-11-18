import ICreateTableDTO from "../dtos/ICreateTableDTO";
import Table from "../infra/typeorm/entities/Table";

export default interface ITablesRepository {
  findById(id: string): Promise<Table | undefined>;
  findByCNPJ(cnpj: string): Promise<Table[]>;
  findByRestaurantId(restaurant_id: string): Promise<Table[]>;
  findByCNPJAndNumber(cnpj: string, number: number): Promise<Table | undefined>;
  findByRestaurantIdAndNumber(restaurant_id: string, number: number): Promise<Table | undefined>;
  create(table: ICreateTableDTO): Promise<Table>;
  save(table: Table): Promise<Table>;
  delete(id: string): Promise<void>;
}