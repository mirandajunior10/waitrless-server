import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateTableService from '../../../services/CreateTableService';
import DeleteTableService from '../../../services/DeleteTableService';
import UpdateTableService from '../../../services/UpdateTableService';
import TablesRepository from '../../typeorm/repositories/TablesRepository'

export default class TablesController {
  private createTable: CreateTableService;
  private deleteTable: DeleteTableService;
  private updateTable: UpdateTableService;

  public async create(req: Request, res: Response): Promise<Response> {
    const { number } = req.body;
    const { id: user_id } = req.user

    this.createTable = container.resolve(CreateTableService)

    const table = await this.createTable.execute({ number, user_id })

    return res.json(table)


  }

  public async show(req: Request, res: Response): Promise<Response> {

    const { restaurant_id } = req.params;

    const tablesRepository = new TablesRepository();

    const tables = await tablesRepository.findByRestaurantId(restaurant_id)

    return res.json(tables)


  }

  public async index(req: Request, res: Response): Promise<Response> {

    const { restaurant_id, number } = req.params;

    const tablesRepository = new TablesRepository();

    const table = await tablesRepository.findByRestaurantIdAndNumber(restaurant_id, Number(number));

    return res.json(table)


  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { number } = req.params;
    const { id: user_id } = req.user

    this.deleteTable = container.resolve(DeleteTableService)

    const table = await this.deleteTable.execute({ number: Number(number), user_id })

    return res.json(table)
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { number } = req.params;
    const { table_id } = req.body;
    const { id: user_id } = req.user

    this.updateTable = container.resolve(UpdateTableService)

    const table = await this.updateTable.execute({ number: Number(number), user_id, table_id })

    return res.json(table)
  }

}