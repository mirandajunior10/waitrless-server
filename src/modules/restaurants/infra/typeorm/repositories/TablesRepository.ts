import { getRepository, Repository } from "typeorm";
import { firestore } from 'firebase-admin'

import ICreateTableDTO from "../../../dtos/ICreateTableDTO";
import ITablesRepository from "../../../repositories/ITablesRepository";
import Table from "../entities/Table";


class TablesRepository implements ITablesRepository {
  private ormRepository: Repository<Table>;

  constructor() {
    this.ormRepository = getRepository(Table);
  }

  public async findById(id: string): Promise<Table | undefined> {
    const findTable = await this.ormRepository.findOneOrFail(id);

    return findTable;
  }

  public async findByCNPJ(cnpj: string): Promise<Table[]> {
    const findTables = await this.ormRepository.find({
      where: { cnpj },
    });

    return findTables;
  }
  public async findByRestaurantId(restaurant_id: string): Promise<Table[]> {
    const findTables = await this.ormRepository.find({
      where: { restaurant_id },
    });

    return findTables;
  }

  public async findByCNPJAndNumber(cnpj: string, number: number): Promise<Table | undefined> {
    const findTable = await this.ormRepository.findOne({
      where: { cnpj, number },
    });

    return findTable;
  }
  public async findByRestaurantIdAndNumber(restaurant_id: string, number: number): Promise<Table | undefined> {
    const findTable = await this.ormRepository.findOne({
      where: { restaurant_id, number },
    });

    return findTable;
  }

  public async create(tableData: ICreateTableDTO): Promise<Table> {
    const table = this.ormRepository.create(tableData);
    await this.ormRepository.save(table);
    return table;
  }

  public async save(restaurant: Table): Promise<Table> {
    return this.ormRepository.save(restaurant);
  }
  public async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id)
  }
}

export default TablesRepository;
