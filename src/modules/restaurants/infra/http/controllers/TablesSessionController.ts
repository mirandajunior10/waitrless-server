import { Request, Response } from 'express';
import { container } from 'tsyringe';
import OpenTableService from '../../../services/OpenTableService';

export default class TablesSessionController {
  private openTable: OpenTableService;

  public async create(req: Request, res: Response): Promise<Response> {
    const { restaurant_id, number } = req.params;
    const { cpf, name } = req.body;

    this.openTable = container.resolve(OpenTableService)

    const table = await this.openTable.execute({ cpf, number, name, restaurant_id });
    return res.json(table)


  }
}