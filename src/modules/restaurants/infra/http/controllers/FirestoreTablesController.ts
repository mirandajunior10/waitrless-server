import { Request, Response } from 'express';
import { container } from 'tsyringe';
import FetchOpenTablesService from '../../../services/FetchOpenTablesService';


export default class FirestoreTablesController {
  private openTables: FetchOpenTablesService;

  public async show(req: Request, res: Response): Promise<Response> {

    const { id: user_id } = req.user

    this.openTables = container.resolve(FetchOpenTablesService)


    const tables = await this.openTables.execute(user_id)

    return res.json(tables)
  }

}