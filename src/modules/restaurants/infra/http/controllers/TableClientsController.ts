import { Request, Response } from 'express';
import { container } from 'tsyringe';
import RenameClientService from '../../../services/RenameClientService';


export default class TableClientsController {
  private renameClient: RenameClientService;

  public async update(req: Request, res: Response): Promise<Response> {
    const { name, restaurant_id, firestore_table_id, cpf } = req.body


    this.renameClient = container.resolve(RenameClientService)
    const client = await this.renameClient.execute({ name, restaurant_id, firestore_table_id, cpf })

    return res.json(client);


  }
}